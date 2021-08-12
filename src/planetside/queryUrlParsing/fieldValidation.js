const FIELD_REGEX = /^([a-z0-9]+(_?[a-z0-9]+)*)+(\.([a-z0-9]+_?[a-z0-9]+)+)*$/;

export function isValidField(field) {
 return FIELD_REGEX.test(field);
}

export function filterValidFields(initFields) {
  let fields = [];

  initFields.forEach((value) => {
    if (isValidField(value) && !fields.includes(value)) {
      fields.push(value);
    };
  });

  return fields;
}
