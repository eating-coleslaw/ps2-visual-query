import QueryJoin from "../../QueryJoin";
import QueryEnums from "../../QueryEnums";
import { filterValidFields, isValidField } from "../fieldValidation";
import parseTerms from "./conditions";

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

export default function parse(valueString) {
  let parentJoins = [];

  let parentSplitIndices = [0];

  let parenthesesDepth = 0;
  let prevSplitIndex = -1;
  let currentSiblingSplitIndices = [];

  let allParenthesesPairs = [];
  let currentParenthesesPairs = [];

  let currentSiblingIndex = 0;

  for (let i = 0; i < valueString.length; i++) {
    let char = valueString.charAt(i);

    if (char === "(") {
      currentParenthesesPairs[parenthesesDepth] = {
        open: i,
        close: null,
      };

      parenthesesDepth++;
    } else if (char === ")") {
      parenthesesDepth--;
      currentParenthesesPairs[parenthesesDepth].close = i;

      if (parenthesesDepth === 0) {
        allParenthesesPairs[currentSiblingIndex] = currentParenthesesPairs;

        currentParenthesesPairs = [];
      }
    } else if (char === ",") {
      currentSiblingSplitIndices.push(i);

      if (parenthesesDepth === 0) {
        const parentJoin = valueString.slice(prevSplitIndex + 1, i);
        parentJoins[currentSiblingIndex] = parentJoin;

        currentSiblingIndex++;
        parentSplitIndices[currentSiblingIndex] = i;

        prevSplitIndex = i;
      }
    } else {
      continue;
    }
  }

  if (parentJoins.length === 0) {
    parentJoins.push(valueString);
  } else {
    const finalSibling = valueString.slice(prevSplitIndex + 1);
    parentJoins.push(finalSibling);
  }

  const siblingJoinModels = [];

  parentJoins.forEach((joinString) => {
    const index = parentJoins.indexOf(joinString);

    let parenthesesPairs;
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

    const baseJoinModel = parseSimpleJoinString(baseJoinString);

    if (baseJoinModel !== null) {
      if (subJoinString !== "") {
        const subJoinModels = parse(subJoinString);

        if (!!subJoinModels) {
          baseJoinModel.joins = subJoinModels;
        }
      }

      siblingJoinModels.push(baseJoinModel);
    }
  });

  return siblingJoinModels;
}

function parseSimpleJoinString(baseJoinString, parentJoinId = null) {
  let joinModel = QueryJoin(parentJoinId);

  const splitKeys = baseJoinString.split("^");

  const seenKeys = [];

  splitKeys.forEach((keyString) => {
    const keyValuePair = keyString.split(":");
    const [key, value] = keyValuePair;

    if (
      !JOIN_KEYS.includes(key) &&
      splitKeys.indexOf(keyString) === 0 &&
      QueryEnums.Collections.includes(key)
    ) {
      joinModel.collection = key;
      seenKeys.push("type");
      return;
    }

    switch (key) {
      case "type":
        if (!seenKeys.includes(key) && QueryEnums.Collections.includes(value)) {
          joinModel.collection = value;
          seenKeys.push("type");
        }
        break;

      case "on":
        if (!seenKeys.includes(key) && isValidField(value)) {
          joinModel.onField = value;
          seenKeys.push(key);
        }
        break;

      case "to":
        if (!seenKeys.includes(key) && isValidField(value)) {
          joinModel.toField = value;
          seenKeys.push(key);
        }
        break;

      case "list":
        if (
          !seenKeys.includes(key) &&
          ["0", "1", "false", "true"].includes(value)
        ) {
          joinModel.isList = value === "1" || value === "true";
          seenKeys.push(key);
        }
        break;

      // TODO: append extra 'show' lists instead of ignoring them
      case "show":
        if (!seenKeys.includes(key) && !seenKeys.includes("hide")) {
          const values = value.split("'");

          let fields = filterValidFields(values);

          if (fields.length > 0) {
            joinModel.filterType = key;
            joinModel.filterFields = fields;

            seenKeys.push(key);
          }
        }
        break;

      // append extra 'hide' lists instead of ignoring them
      case "hide":
        if (!seenKeys.includes(key) && !seenKeys.includes("show")) {
          const values = value.split("'");

          let fields = filterValidFields(values);

          if (fields.length > 0) {
            joinModel.filterType = key;
            joinModel.filterFields = fields;

            seenKeys.push(key);
          }
        }
        break;

      case "inject_at":
        if (!seenKeys.includes(key) && !!value) {
          joinModel.injectAt = value;
          seenKeys.push(key);
        }
        break;

      case "terms":
        const newTerms = parseTerms(value, "'", true);
        if (newTerms !== null) {
          joinModel.terms = joinModel.terms.concat(newTerms);
        }
        break;

      case "outer":
        if (
          !seenKeys.includes(key) &&
          ["0", "1", "false", "true"].includes(value)
        ) {
          joinModel.isOuterJoin = value === "1" || value === "true";
          seenKeys.push(key);
        }
        break;

      default:
        return;
    }
  });

  if (!joinModel.collection) {
    return null;
  }

  return joinModel;
}
