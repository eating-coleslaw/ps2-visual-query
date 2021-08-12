import QueryConfig from "../QueryConfig";
import QueryEnums from "../QueryEnums";
import parseConditions from "./parameters/conditions";
import parseFilterField from "./parameters/fieldFilter";
import parseJoins from "./parameters/joins";
import parseLanguage from "./parameters/language";
import parseLimit from "./parameters/limit";
import parseResolves from "./parameters/resolves";
import parseTree from "./parameters/tree";

const NAMESPACE = "ps2:v2";

const COMMANDS = ["hide", "show", "resolve", "limit", "lang", "join", "tree"];

const UNSUPPORTED_COMMANDS = [
  "case",
  "distinct",
  "exactMatchFirst",
  "has",
  "includeNull",
  "limitPerDB",
  "retry",
  "sort",
  "start",
  "timing",
];

export default function parseQueryUrl(url) {
  if (!url) {
    throw new Error("Query URL is required");
  }

  const unescapedUrl = unescape(url);

  const splitAtQueryPieces = unescapedUrl.split("?");
  const preQueryString = splitAtQueryPieces[0];

  const collection = extractCollection(preQueryString);

  let queryModel = QueryConfig(collection, NAMESPACE);

  // No query parameters provided
  if (splitAtQueryPieces.length === 0) {
    return queryModel;
  }

  const queryParameters = getQueryParametersArray(splitAtQueryPieces[1]);

  let seenCommands = [];

  queryParameters.forEach((parameter) => {
    const commandValuePair = parseQueryParameterString(parameter);

    if (commandValuePair === null && queryParameters.indexOf(parameter) === 0) {
      const conditions = parseConditions(parameter, "&", false);

      if (conditions !== null) {
        queryModel.conditions = conditions;
      }

      return;
    }

    const command = commandValuePair[0];
    const valueString = commandValuePair[1];

    if (
      seenCommands.includes(command) &&
      !["show", "hide", "resolve", "join"].includes(command)
    ) {
      return;
    } else if (command === "show" && seenCommands.includes("hide")) {
      return;
    } else if (command === "hide" && seenCommands.includes("show")) {
      return;
    }

    const success = parseQueryParameter(queryModel, command, valueString);

    if (success) {
      seenCommands.push(command);
    }
  });

  return queryModel;
}

function extractCollection(preQueryString) {
  const pieces = preQueryString.split("/");
  const lastIndex = pieces.length - 1;

  const lastPiece = pieces[lastIndex];

  let collection = "";

  // If the collection is specified like .../ps2:v2/<collection>?...
  if (lastPiece !== "") {
    collection = lastPiece.toLowerCase();
    // If the collection is specified like .../ps2:v2/<collection>/?...
  } else if (lastIndex > 0) {
    collection = pieces[lastIndex - 1];
  }

  if (collection === "") {
    throw new Error("Collection value not specified in the URL");
  }

  if (QueryEnums.Collections.includes(collection)) {
    return collection;
  } else {
    throw new Error(
      `Collection value '${collection}' specified in the query URL is not a valid collection.`
    );
  }
}

function getQueryParametersArray(queryString) {
  if (queryString.charAt(0) === "c" && queryString.charAt(1) === ":") {
    queryString = `&${queryString}`;
  }

  let splitAtMod = queryString.split("&c:");

  if (splitAtMod.length <= 1) {
    return null;
  } else if (splitAtMod[1] === "") {
    return null;
  } else {
    return splitAtMod;
  }
}

function parseQueryParameterString(parameter) {
  let commandValueSplit = [];

  if (parameter.startsWith("join=")) {
    commandValueSplit = ["join", parameter.slice(5)];
  } else {
    commandValueSplit = parameter.split("=");
  }

  const [command, value] = commandValueSplit;

  if (commandValueSplit.length !== 2) {
    return null;
  }

  if (!COMMANDS.includes(command)) {
    if (UNSUPPORTED_COMMANDS.includes(command)) {
      return null;
    } else {
      return null;
    }
  }

  if (value === "") {
    return null;
  }

  return commandValueSplit;
}

function parseQueryParameter(queryModel, command, value) {
  let success = false;
  let result;

  switch (command) {
    case "hide":
      result = parseFilterField(command, value);
      if (result !== null) {
        queryModel.filterType = result.filterType;
        queryModel.filterFields = [
          ...queryModel.filterFields,
          ...result.filterFields,
        ];

        success = true;
      }
      break;

    case "show":
      result = parseFilterField(command, value);
      if (result !== null) {
        queryModel.filterType = result.filterType;
        queryModel.filterFields = [
          ...queryModel.filterFields,
          ...result.filterFields,
        ];

        success = true;
      }
      break;

    case "resolve":
      result = parseResolves(value);
      if (result !== null) {
        queryModel.resolves = [...queryModel.resolves, ...result];

        success = true;
      }
      break;

    case "limit":
      queryModel.limit = parseLimit(value);
      success = true;
      break;

    case "lang":
      result = parseLanguage(value);
      if (result !== null) {
        queryModel.language = value;

        success = true;
      }
      break;

    case "tree":
      result = parseTree(value);
      if (result !== null) {
        queryModel.tree = value;

        success = true;
      }
      break;

    case "join":
      result = parseJoins(value);
      if (result !== null) {
        queryModel.joins = [...queryModel.joins, ...result];

        success = true;
      }
      break;

    default:
      return;
  }

  return success;
}
