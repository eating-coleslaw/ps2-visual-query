import parse from "../../../planetside/queryUrlParsing/parameters/resolves";

test("Empty string", () => expect(parse("")).toBe(null));

test("Single collection", () => {
  const input = "character";
  expect(parse(input)).toEqual([ "character" ]);
});

test("Multiple collections", () => {
  const input = "character,item,characters_item";
  expect(parse(input)).toEqual([ "character", "item", "characters_item" ]);
});

test("Multiple collections: excludes empty string", () => {
  const input = "character,,item";
  expect(parse(input)).toEqual([ "character", "item" ]);
});

test("Multiple collections: excludes duplicate collections", () => {
  const input = "character,item,character";
  expect(parse(input)).toEqual([ "character", "item" ]);
});
