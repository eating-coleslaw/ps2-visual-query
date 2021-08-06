import QueryTree from "../../QueryTree";
import { isValidField } from "../fieldValidation";

const TREE_KEYS = [
  "field",
  "list", // bit => boolean
  "prefix",
  "start",
];

export default function parse(valueString) {
  if (!valueString) {
    return null;
  }

  const keyValuePairs = valueString.split("^");

  let tree = QueryTree();
  let seenKeys = [];

  keyValuePairs.forEach((pair) => {
    const splitPair = pair.split(":");

    // handle implied field value
    if (splitPair.length === 1 && !seenKeys.includes("field")) {
      let impliedField = splitPair[0];

      if (!TREE_KEYS.includes(impliedField) && isValidField(impliedField)) {
        tree.treeField = impliedField;
        seenKeys.push("field");
      }
    }

    const [key, value] = splitPair;

    if (!TREE_KEYS.includes(key) || seenKeys.includes(key)) {
      return;
    }

    if (!value) {
      return;
    }

    switch (key) {
      case "field":
        if (isValidField(value)) {
          tree.treeField = value;
          seenKeys.push(key);
        }
        break;

      case "list":
        if (+value === 0) {
          tree.isList = false;
          seenKeys.push(key);
        } else if (+value === 1) {
          tree.isList = true;
          seenKeys.push(key);
        }
        break;

      case "prefix":
        tree.groupPrefix = value;
        seenKeys.push(key);
        break;

      case "start":
        if (isValidField(value)) {
          tree.startField = value;
          seenKeys.push(key);
        }
        break;

      default:
        return;
    }
  });

  if (tree.treeField === "" && tree.startField === "") {
    return null;
  }

  return tree;
}
