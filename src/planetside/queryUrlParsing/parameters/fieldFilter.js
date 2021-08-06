import { filterValidFields } from "../fieldValidation";

const VALID_COMMANDS = ["show", "hide"];

export default function parse(command, valueString) {
  if (!VALID_COMMANDS.includes(command)) {
    return null;
  }

  if (!valueString) {
    return null;
  }

  const values = valueString.split(",");

  if (values.length === 0) {
    return null;
  }

  let fields = filterValidFields(values);

  if (fields.length === 0) {
    return null;
  }

  return {
    filterType: command,
    filterFields: fields,
  };
}
