const MIN = 0;
const MAX = 10000;

export default function parse(valueString) {
  const limit = +valueString;

  if (limit < MIN) {
    return 0;
  }

  if (limit >= MAX) {
    return MAX;
  }

  if (isNaN(limit)) {
    return 0;
  }

  return limit;
}