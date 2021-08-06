import { filterValidFields } from "../../../planetside/queryUrlParsing/fieldValidation";

test("Empty array", () => expect(filterValidFields([])).toHaveLength(0));

test("Excludes duplicates", () => {
  const duplicates = [ "name", "name", "name"]; 
  expect(filterValidFields(duplicates)).toContain("name");
  expect(filterValidFields(duplicates)).toHaveLength(1);
});

test("Excludes invalid fields", () => {
  const fields = ["valid_field", "Invalid!Field", "valid_field_2"];
  expect(filterValidFields(fields)).toHaveLength(2);
  expect(filterValidFields(fields)).toContain("valid_field");
  expect(filterValidFields(fields)).toContain("valid_field_2");
  expect(filterValidFields(fields)).not.toContain("Invalid!Field");
});