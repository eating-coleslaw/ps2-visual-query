import parse from "../../../planetside/queryUrlParsing/parameters/resolves";

test("Empty string", () => expect(parse("")).toBe(null));

test("Single collection", () => {
  const input = "character";
  expect(parse(input)).toHaveLength(1);
  expect(parse(input)).toContain("character");
});

test("Single collection: excludes non-existent collection", () =>
  expect(parse("birthday_presents")).toBe(null));

test("Multiple collections", () => {
  const input = "character,item,characters_item";
  expect(parse(input)).toHaveLength(3);
  expect(parse(input)).toContain("character");
  expect(parse(input)).toContain("item");
  expect(parse(input)).toContain("characters_item");
});

test("Multiple collections: excludes non-existent collection", () => {
  const input = "character,birthday_presents,item";
  expect(parse(input)).toHaveLength(2);
  expect(parse(input)).toContain("character");
  expect(parse(input)).toContain("item");
  expect(parse(input)).not.toContain("birthday_presents");
});

test("Multiple collections: excludes duplicate collections", () => {
  const input = "character,character";
  expect(parse(input)).toHaveLength(1);
  expect(parse(input)).toContain("character");
});

test("Multiple collections: exclude all non-existent", () => {
  const input = "birthday_presents,movies";
  expect(parse(input)).toEqual(null);
});
