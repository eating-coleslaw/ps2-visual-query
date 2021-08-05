import QueryConfig from '../QueryConfig';
import QueryCondition from '../QueryCondition';
import QueryJoin from '../QueryJoin';
import QueryTree from '../QueryTree';
import QueryEnums from '../QueryEnums';
import joinStringDelimiterData from './joinStringDelimiterData';
import joinSiblingDelimiterData from './joinSiblingDelimiterData';


const HOST = "http://census.daybreakgames.com";
const NAMESPACE = "ps2:v2";

const FIELD_REGEX = /^[A-z0-9]+(\.[A-z0-9]+)?$/;

const COMMANDS = [
  "hide",
  "show",
  "resolve",
  "limit",
  "lang",
  "join",
  "tree",
  /* Unsuported */
  // "case",
  // "distinct",
  // "exactMatchFirst",
  // "has",
  // "includeNull",
  // "limitPerDB",
  // "retry",
  // "sort",
  // "start",
  // "timing",
];

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

const SEARCH_MODIFIERS = [
  "<",
  "[", // <=
  ">",
  "]", // >=
  "^", // Starts With
  "*", // Contains
  "!", // NOT
];

export function test() {
  console.log("=============== Test 1 ===============");
  const testUrl = "https://census.daybreakgames.com/s:example/get/ps2:v2/character/?name.first=Chirtle&name.first_lower=*chir&c:hide=times,certs,daily_ribbon&c:resolve=outfit_member&c:join=characters_item^list:true^outer:false^hide:character_id^terms:item_type_id=26^inject_at:Items(item^list:true^outer:false^hide:item_id^inject_at:Details(item_type^list:true^outer:false^inject_at:Type)characters_weapon_stat_by_faction^list:true^outer:true^inject_at:Stats)&c:lang=en&c:tree=field:Items^isList:false^start:item_id&c:limit=10";
  
  const queryModel = parseQueryUrl(testUrl);
  
  console.log("Test 1:", queryModel);
  
  console.log("=============== Join Test ===============");
  const joinTestUrl = "http://census.daybreakgames.com/get/ps2/character?name.first_lower=auroram&c:show=name.first,character_id&c:join=characters_item^list:true^outer:true^show:item_id^inject_at:items(item^list:false^outer:false^show:item_id'name.en^inject_at:item_data,item_to_weapon^outer:false^terms:weapon_id=!0^on:item_id^to:item_id^inject_at:weapon),outfit_member_extended^outer:false^inject_at:outfit_membership(outfit^outer:false),characters_achievement^list:true^outer:false^inject_at:Achievements(achievement^outer:false^inject_at:Details)";

  const joinTestQueryModel = parseQueryUrl(joinTestUrl);

  console.log("Join Test:", joinTestQueryModel);
}


export default function parseQueryUrl(url) {
  if (!url) {
    return new Error("Query URL is required");
    // return null;
  }
  
  const unescapedUrl = unescape(url);

  const splitAtQueryPieces = unescapedUrl.split("?");
  const preQueryString = splitAtQueryPieces[0];

  // console.log("preQueryString:", preQueryString);

  const collection = extractCollection(preQueryString);

  let queryModel = QueryConfig(collection, NAMESPACE);

  // No query parameters provided
  if (splitAtQueryPieces.length === 0) {
    return queryModel;
  }

  const queryParameters = getQueryParametersArray(splitAtQueryPieces[1]);

  // console.log("Query Parameters String:", queryParameters);

  let seenCommands = [];

  queryParameters.forEach((parameter) => {
    const commandValuePair = parseQueryParameterString(parameter);

    // console.log("commandValuePair:", commandValuePair, "from:", parameter);

    // TODO: check if the parameter is the search conditions
    if (commandValuePair === null) {
      return;
    }

    const command = commandValuePair[0];
    const valueString = commandValuePair[1];

    if (seenCommands.includes(command)) {
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
    throw new Error(`Collection value '${collection}' specified in the query URL is not a valid collection.`);
  }
}

function getQueryParametersArray(queryString) {
  // prepend an ampersand if 
  if (queryString.charAt(0) === "c" && queryString.charAt(1) === ":") {
    queryString = `&${queryString}`;
  }
  
  // return queryString.split("&c:");
  
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
  
  // console.log("commandValueSplit:", commandValueSplit);

  if (commandValueSplit.length !== 2) {
    console.warn("Failed to parse query parameter:", parameter);
    return null;
  }

  const command = commandValueSplit[0];
  if (!COMMANDS.includes(command)) {
    if (UNSUPPORTED_COMMANDS.includes(command)) {
      console.warn(`Query command ${command} is not supported yet`);
      return null;
    } else {
      console.warn(`${command} is not a valid query command`);
      return null;
    }
  }

  const value = commandValueSplit[1];
  if (value === "") {
    console.warn(`No value specified for ${command} command`);
    return null;
  }

  return commandValueSplit;
}

function parseQueryParameter(queryModel, command, value) {
  // console.log("Parsing query parameter:", command,"=>", value);
  
  let success = false;

  switch (command) {
    case "hide":
      success = parseShowHideParameter(queryModel, command, value);
      break;

    case "show":
      success = parseShowHideParameter(queryModel, command, value);
      break;

    case "resolve":
      success = parseResolveParameter(queryModel, value);
      break;

    case "limit":
      success = parseLimitParameter(queryModel, value);
      break;

    case "lang":
      success = parseLangParameter(queryModel, value);
      break;

    case "tree":
      success = parseTreeParameter(queryModel, value);
      break;
    
    case "join":
      success = parseJoinParameter(queryModel, value);
      break;

    default:
      return;
  }

  return success;
}


function parseShowHideParameter(queryModel, command, valueString) {
  const values = valueString.split(",");

  if (values.length === 0) {
    return false;
  }

  let fields = filterValidFields(values);

  if (fields.length === 0) {
    return false;
  }

  queryModel.filterType = command;
  queryModel.filterFields = fields;

  return true;
}

function parseResolveParameter(queryModel, valueString) {
  const values = valueString.split(",");

  if (values.length === 0) {
    return false;
  }
  
  let resolves = [];

  values.forEach((value) => {
    if (QueryEnums.Collections.includes(value) && !resolves.includes(value)) {
      resolves.push(value);
    }
  });

  queryModel.resolves = resolves;

  return true;
}

function parseLimitParameter(queryModel, valueString) {
  const limit = +valueString;

  if (limit >= 0 && limit <= 10000) {
    queryModel.limit = limit;
    return true;
  }

  return false;
}

/* ===========
    LANGUAGES
============ */
const LANGUAGES = ["de", "en", "es", "fr", "it"];

function parseLangParameter(queryModel, valueString) {
  if (LANGUAGES.includes(valueString)) {
    queryModel.language = valueString;
    return true;
  }

  return false;
}

/* ========
    TREES
======== */

/*
   Organize a list of vehicles by type:
   http://census.daybreakgames.com/get/ps2:v2/vehicle?c:limit=500&c:tree=type_id^prefix:type_^list:1&c:lang=en

   Organize zones, map_regions, map_hexes by facility_type:
   http://census.daybreakgames.com/get/ps2:v2/zone/?zone_id=2&c:join=map_region^list:1^inject_at:regions^hide:zone_id(map_hex^list:1^inject_at:hex^hide:zone_id'map_region_id)&c:tree=start:regions^field:facility_type^list:1&c:lang=en

  tree=start:regions^field:facility_type^list:1
*/

const TREE_KEYS = [
  "field", 
  "list", // bit => boolean
  "prefix",
  "start",
];

function parseTreeParameter(queryModel, valueString) {
  const keyValuePairs = valueString.split("^");

  if (keyValuePairs.length === 0) {
    return false;
  }

  let tree = QueryTree();
  let seenKeys = [];

  keyValuePairs.forEach((pair) => {
    const splitPair = pair.split(":");

    if (splitPair.length <= 1) {
      return;
    }

    const key = splitPair[0];
    const value = splitPair[1];

    if (!TREE_KEYS.includes(key) || seenKeys.includes(key)) {
      return;
    }

    if (value === "") {
      return;
    }

    switch (key) {
      case "field":
        if (isValidField(value)) {
          tree.treeField = value;
        }
        break;

      case "list":
        if (+value === 0) {
          tree.isList = false; 
        } else if (+value === 1) {
          tree.isList = true;
        }
        break;
      
      case "prefix":
        tree.groupPrefix = value;
        break;
      
      case "start":
        if (isValidField(value)) {
          tree.startField = value;
        }
        break;
      
      default:
        return;
    }
  });

  if (tree.treeField === "" && tree.startField === "") {
    return false;
  }

  queryModel.tree = tree;
  
  return true;
}

function parseConditionsParameter(queryModel, valueString) {

  return true;
}


/* ========
    JOINS
======== */
/*
  Structure: 
  c:join=type:{other_type}^on:{this_type_field}^to:{other_type_field}^list:{0|1}^show:{field}'{field}^hide:{field}'{field}^inject_at:{inject_at_field_name}^terms:{x=1}

   Multiple joins can be used comma-delimited. c:join=join1,join2,join3
   A join can be nested by using parens, i.e. c:join=join1...(join1a...(join1b...))

   join=characters_item^list:true^outer:false^hide:character_id^terms:item_type_id=26^inject_at:Items(item^list:true^outer:false^hide:item_id^inject_at:Details(item_type^list:true^outer:false^inject_at:Type)characters_weapon_stat_by_faction^list:true^outer:true^inject_at:Stats)

  This query looks up items unlocked by a given character but discarding any items that are not linked to a weapon.

  join=characters_item^list:1^inject_at:items^show:item_id(item^show:name.en^inject_at:item_data,item_to_weapon^on:item_id^to:item_id^show:weapon_id^inject_at:weapon^outer:0^terms:weapon_id=!0)
  join=characters_item(item,item_to_weapon)

  join=characters_item^list:true^outer:true^show:item_id^inject_at:items(item^list:false^outer:false^show:item_id'name.en^inject_at:item_dataitem_to_weapon^outer:false^terms:weapon_id=!0^on:item_id^to:item_id^inject_at:weapon),outfit_member_extended^outer:false^inject_at:outfit_membership(outfit^outer:false)
  characters_item(item,item_to_weapon),outfit_member_extended(outfit)

  a(b,c(d)),e(f(g),h)
  a(b,c(d)),e(f(g),h),i

  __Unnested__
  0-1 of each:  ,   ()   ,()   (),   (,)
  2 commas:     ,,   ,,()   ,(),   (),,
  2 parens:     ()()   ,()()   (),()   ()(),
  2 of each:    ,,()()   (),,()   ()(),,   (,,)()   ()(,,)
                ,(,)()   ,(),()   ,()(,)   ,()(),
                (,),()   (,)(,)   (,)(),   (),(,)   (),(),
    
  (())    (,())   ((),)   (()),   ,(())   ,(()),
  ,(),
*/

const JOIN_KEYS = [
  "type", // optional
  "on",
  "to",
  "list", // bit => boolean
  "show",
  "hide",
  "inject_at",
  "terms",
  "outer", // bit => boolean
];

function parseJoinParameter(queryModel, valueString) {
  // console.log("Parsing join parameter:", valueString);
  
  let openParenthesesIndices = [];
  let closeParenthesesIndices = [];
  let commaIndices = [];

  let parentSplitIndices = [0];


  // allParenthesesPairs[i] corresponds to the subjoins for the join at parentJoins[i]

  let parentJoins = [];

  let parenthesesDepth = 0;
  let prevSplitIndex = -1;

  let allParenthesesPairs = [];
  let currentParenthesesPairs = [];

  for (let i = 0; i < valueString.length; i++) {
    let char = valueString.charAt(i);

    if (char === "(") {
      currentParenthesesPairs[parenthesesDepth] = {
        open: i,
        close: null,
      };
      
      parenthesesDepth++;
      openParenthesesIndices.push(i);
    } else if (char === ")") {
      parenthesesDepth--;
      currentParenthesesPairs[parenthesesDepth].close = i;
      
      closeParenthesesIndices.push(i);
      
      if (parenthesesDepth === 0) {
        allParenthesesPairs.push(currentParenthesesPairs);
        currentParenthesesPairs = [];
      }
    } else if (char === ",") {
      commaIndices.push(i);
      
      if (parenthesesDepth === 0) {
        parentSplitIndices.push(i);

        const parentJoin = valueString.slice(prevSplitIndex + 1, i);
        parentJoins.push(parentJoin);

        // parentSplitIndices[parentJoins.length] = i;

        prevSplitIndex = i;
      }
    } else {
      continue;
    }
  }

  if (parentJoins.length === 0) {
    parentJoins.push(valueString);
  }

  console.log(parentJoins);
  console.log("allParenthesesPairs:", allParenthesesPairs);

  parentJoins.forEach((joinString) => {
    const index = parentJoins.indexOf(joinString);

    let parenthesesPairs = undefined;
    if (index < allParenthesesPairs.length) {
      parenthesesPairs = allParenthesesPairs[index];
    }

    let baseJoinString = joinString;    
    let subJoinString = "";

    if (!!parenthesesPairs && !!parenthesesPairs[0]) {
      let offset = 0;
      if (index > 0) {
        offset = parentSplitIndices[index] + 1;
      }

      const outermostPair = parenthesesPairs[0];
      const baseJoinEnd = outermostPair.open - offset;
      const subJoinStart = outermostPair.open + 1 - offset;
      const subJoinEnd = outermostPair.close - offset;

      baseJoinString = joinString.slice(0, baseJoinEnd);

      subJoinString = joinString.slice(subJoinStart, subJoinEnd);
    }

    console.log("baseJoinString:", baseJoinString);
    console.log("subJoinString:", subJoinString);

  })

  return true;
}




function getJoinStringIndices(joinString) {
  let delimData = joinStringDelimiterData(0, joinString);
  
  
  let siblingSplitIndices = [0];
  
  let parentJoins = [];
  
  let openParenthesesIndices = [];
  let closeParenthesesIndices = [];
  let commaIndices = [];

  let parenthesesDepth = 0;
  let prevSplitIndex = -1;
  
  let allParenthesesPairs = [];
  let currentParenthesesPairs = [];
  
  let currentParent = null;
  let currentSibling = joinSiblingDelimiterData("");

  let currentiblingIndex = 0;
  delimData.siblingsData.push(currentSibling);

  for (let i = 0; i < joinString.length; i++) {
    let char = joinString.charAt(i);

    if (char === "(") {
      currentParenthesesPairs[parenthesesDepth] = {
        open: i,
        close: null,
      };
      
      parenthesesDepth++;
      openParenthesesIndices.push(i);
    } else if (char === ")") {
      parenthesesDepth--;
      currentParenthesesPairs[parenthesesDepth].close = i;
      
      closeParenthesesIndices.push(i);
      
      if (parenthesesDepth === 0) {
        allParenthesesPairs.push(currentParenthesesPairs);
        currentParenthesesPairs = [];
      }
    } else if (char === ",") {
      commaIndices.push(i);
      
      if (parenthesesDepth === 0) {
        siblingSplitIndices.push(i);

        const parentJoin = joinString.slice(prevSplitIndex + 1, i);
        parentJoins.push(parentJoin);

        // parentSplitIndices[parentJoins.length] = i;

        prevSplitIndex = i;
      }
    } else {
      continue;
    }
  }

  if (parentJoins.length === 0) {
    parentJoins.push(joinString);
  }

  console.log(parentJoins);
  console.log("allParenthesesPairs:", allParenthesesPairs);
}

function splitSiblingJoins(joinString) {

}



function filterValidFields(initFields) {
  let fields = [];

  initFields.forEach((value) => {
    if (isValidField(value) && !fields.includes(value)) {
      fields.push(value);
    };
  });

  return fields;
}

function isValidField(field) {
 return  FIELD_REGEX.test(field);
}