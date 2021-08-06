import QueryEnums from "../../QueryEnums";

export default function parse(valueString) {
  if (!valueString) {
    return null;
  }

  const values = valueString.split(",");

  if (values.length === 0) {
    return null;
  }

  let resolves = [];

  values.forEach((value) => {
    if (QueryEnums.Collections.includes(value) && !resolves.includes(value)) {
      resolves.push(value);
    }
  });

  if (resolves.length === 0) {
    return null;
  }

  return resolves;
}
