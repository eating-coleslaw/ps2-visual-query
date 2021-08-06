import parse from "../../../planetside/queryUrlParsing/parameters/fieldFilter";

test("Invalid Command", () =>
  expect(parse("fields", "name,field2")).toBe(null));

test("show: empty fields string", () => expect(parse("show", "")).toBe(null));

test("hide: empty fields string", () => expect(parse("hide", "")).toBe(null));

test("show: invalid fields", () =>
  expect(parse("show", "Invalid!Field")).toBe(null));

test("hide: invalid fields", () =>
  expect(parse("hide", "Invalid!Field")).toBe(null));

test("show: empty fields", () => expect(parse("show", ",")).toBe(null));

test("hide: empty fields", () => expect(parse("hide", ",")).toBe(null));

test("show: single field", () => {
  const expected = {
    filterType: "show",
    filterFields: ["name"],
  };

  expect(parse("show", "name")).toEqual(expected);
});

test("hide: single field", () => {
  const expected = {
    filterType: "hide",
    filterFields: ["name"],
  };

  expect(parse("hide", "name")).toEqual(expected);
});

test("show: multiple fields", () => {
  const expected = {
    filterType: "show",
    filterFields: ["name", "character_id", "world_id"],
  };

  expect(parse("show", "name,character_id,world_id")).toEqual(expected);
});

test("hide: multiple fields", () => {
  const expected = {
    filterType: "hide",
    filterFields: ["name", "character_id", "world_id"],
  };

  expect(parse("hide", "name,character_id,world_id")).toEqual(expected);
});
