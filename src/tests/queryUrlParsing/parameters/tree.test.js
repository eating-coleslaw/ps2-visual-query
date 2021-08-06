import parse from "../../../planetside/queryUrlParsing/parameters/tree";
import QueryTree from "../../../planetside/QueryTree";

test("Empty string", () => expect(parse("")).toBe(null));

test("Delimiter-only", () => expect(parse("^")).toBe(null));

test("Implied field value", () => {
  const input = "map_region";
  const expected = QueryTree("map_region", "", "", false);

  expect(parse(input)).toEqual(expected);
});

test("Implied field value with explicit field value", () => {
  const input = "map_region^field:outfit_id";
  const expected = QueryTree("map_region", "", "", false);

  expect(parse(input)).toEqual(expected);
});

test("Implied field is a tree key", () => {
  const input = "prefix";
  expect(parse(input)).toBe(null);
});

test("Duplicate key: field", () => {
  const input = "field:map_region^field:outfit_id";
  const expected = QueryTree("map_region", "", "", false);

  expect(parse(input)).toEqual(expected);
});

test("Duplicate key: list", () => {
  const input = "field:map_region^list:1^list:0";
  const expected = QueryTree("map_region", "", "", true);

  expect(parse(input)).toEqual(expected);
});

test("Duplicate key: prefix", () => {
  const input = "field:map_region^prefix:first_value^prefix:second_value";
  const expected = QueryTree("map_region", "first_value", "", false);

  expect(parse(input)).toEqual(expected);
});

test("Duplicate key: start", () => {
  const input = "field:map_region^start:region_id^start:outfit_id";
  const expected = QueryTree("map_region", "", "region_id", false);

  expect(parse(input)).toEqual(expected);
});

test("Duplicate key: field - first value is invalid", () => {
  const input = "field:Map!Region^field:outfit_id";
  const expected = QueryTree("outfit_id", "", "", false);

  expect(parse(input)).toEqual(expected);
});

test("Duplicate key: list- first value is invalid", () => {
  const input = "field:map_region^list:20^list:1";
  const expected = QueryTree("map_region", "", "", true);

  expect(parse(input)).toEqual(expected);
});

test("Duplicate key: prefix- first value is invalid", () => {
  const input = "field:map_region^prefix:^prefix:second_value";
  const expected = QueryTree("map_region", "second_value", "", false);

  expect(parse(input)).toEqual(expected);
});

test("Duplicate key: start- first value is invalid", () => {
  const input = "field:map_region^start:Invalid!Field^start:outfit_id";
  const expected = QueryTree("map_region", "", "outfit_id", false);

  expect(parse(input)).toEqual(expected);
});

test("Empty value: prefix", () => {
  const input = "map_region^prefix";
  const expected = QueryTree("map_region", "", "", false);

  expect(parse(input)).toEqual(expected);
});

test("Empty value: prefix - trailing colon", () => {
  const input = "map_region^prefix:";
  const expected = QueryTree("map_region", "", "", false);

  expect(parse(input)).toEqual(expected);
});

test("Valid prefix value", () => {
  const input = "field:facility_type^prefix:type";
  const expected = QueryTree("facility_type", "type", "", false);

  expect(parse(input)).toEqual(expected);
});

test("Valid start value", () => {
  const input = "field:map_region^start:facility_type";
  const expected = QueryTree("map_region", "", "facility_type", false);

  expect(parse(input)).toEqual(expected);
});

test("valid list value", () => {
  const input = "field:map_region^list:1";
  const expected = QueryTree("map_region", "", "", true);

  expect(parse(input)).toEqual(expected);
});

test("All fields valid", () => {
  const input = "field:map_region^list:1^start:facility_type^prefix:type";
  const expected = QueryTree("map_region", "type", "facility_type", true);

  expect(parse(input)).toEqual(expected);
});

test("No field or start value", () => {
  const input = "prefix:type^list:1";

  expect(parse(input)).toEqual(null);
});
