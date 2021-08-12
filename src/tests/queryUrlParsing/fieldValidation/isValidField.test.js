import { isValidField } from "../../../planetside/queryUrlParsing/fieldValidation";

test("Single-word field", () => expect(isValidField("name")).toBe(true));

test("Single-word field: trailing period", () =>
  expect(isValidField("name.")).toBe(false));

test("Single-word field: trailing underscore", () =>
  expect(isValidField("name_")).toBe(false));

test("Two-word field", () => expect(isValidField("prestige_level")).toBe(true));

test("Two-word field: trailing period", () =>
  expect(isValidField("prestige_level.")).toBe(false));

test("Two-word field: trailing underscore", () =>
  expect(isValidField("prestige_level_")).toBe(false));

test("Two-word field: double underscore", () =>
  expect(isValidField("prestige__level")).toBe(false));

test("Three-word field", () =>
  expect(isValidField("name_first_lower")).toBe(true));

test("Nested field", () => expect(isValidField("name.first")).toBe(true));

test("Nested field: trailing period", () =>
  expect(isValidField("name.first.")).toBe(false));

test("Nested field: trailing underscore", () =>
  expect(isValidField("name.first_")).toBe(false));

test("Nested field: double period", () =>
  expect(isValidField("name..first")).toBe(false));

test("Nested field: two-word parent", () =>
  expect(isValidField("battle_rank.level")).toBe(true));

test("Nested field: two-word child", () =>
  expect(isValidField("name.first_lower")).toBe(true));

  test("Nested field: three-word child", () =>
  expect(isValidField("name.first_lower_three")).toBe(true));

test("Nested field: two-word parent & child", () =>
  expect(isValidField("battle_rank.prestive_level")).toBe(true));

  test("Nested field: three-word parent & child", () =>
  expect(isValidField("one_two_three.one_two_three")).toBe(true));

test("Double-nested field", () =>
  expect(isValidField("name.first.lower")).toBe(true));

  test("Triple-nested field", () =>
  expect(isValidField("name.first.lower.four")).toBe(true));

test("Contains capital letter", () => expect(isValidField("Name")).toBe(false));

test("Two-word field: contains numbers", () =>
  expect(isValidField("1_2")).toBe(true));

// These special characters would be allowed if the regex character set is [A-z0-9],
// so make sure they don't pass
test("Contains carrot (^)", () => expect(isValidField("name^")).toBe(false));

test("Contains open bracket ([)", () =>
  expect(isValidField("name[")).toBe(false));

test("Contains close bracket (])", () =>
  expect(isValidField("name]")).toBe(false));

test("Contains tick (`)", () => expect(isValidField("name`")).toBe(false));
