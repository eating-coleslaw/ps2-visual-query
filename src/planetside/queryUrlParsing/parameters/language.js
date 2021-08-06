const LANGUAGES = ["de", "en", "es", "fr", "it"];

export default function parse(valueString) {
  if (LANGUAGES.includes(valueString)) {
    return valueString;
  }

  return null;
}