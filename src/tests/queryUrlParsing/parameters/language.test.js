import parse from "../../../planetside/queryUrlParsing/parameters/language";

test("Invalid language (Russion)", () => expect(parse("ru")).toBe(null));

test("Empty string", () => expect(parse("")).toBe(null));

test("First letter captialized (English)", () =>
  expect(parse("En")).toBe(null));

test("All capitalized (English)", () => expect(parse("EN")).toBe(null));

test("English", () => expect(parse("en")).toBe("en"));

test("German", () => expect(parse("de")).toBe("de"));

test("Spanish", () => expect(parse("es")).toBe("es"));

test("French", () => expect(parse("fr")).toBe("fr"));

test("Italian", () => expect(parse("it")).toBe("it"));
