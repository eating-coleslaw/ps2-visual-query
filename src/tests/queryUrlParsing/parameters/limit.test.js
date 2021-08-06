import parse from "../../../planetside/queryUrlParsing/parameters/limit";

const MIN = 0;
const MAX = 10000;

test("Negative number", () => expect(parse(-1)).toBe(MIN));

test("Greater than 10,000 max", () => expect(parse(20000)).toBe(MAX));

test("Equal to 10,000 max", () => expect(parse(10000)).toBe(MAX));

test("Valid number", () => expect(parse(500)).toBe(500));

test("String with valid number", () => expect(parse("300")).toBe(300));

test("String with negative number", () => expect(parse("-5")).toBe(0));

test("String with number greater than 10,000 max", () =>
  expect(parse("10500")).toBe(10000));

test("Empty string", () => expect(parse("")).toBe(0));

test("Alphanumeric string", () => expect(parse("planetside")).toBe(0));
