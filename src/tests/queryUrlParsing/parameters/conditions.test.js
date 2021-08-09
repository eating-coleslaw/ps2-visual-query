import parse from "../../../planetside/queryUrlParsing/parameters/conditions";
import QueryCondition from "../../../planetside/QueryCondition";
import QueryOperator from "../../../planetside/QueryOperator";

test("Empty valueString parameter", () => expect(parse("")).toBe(null));

test("Single condition: equals", () => {
  const input = "name=Chirtle";

  expect(parse(input)).toHaveLength(1);
  expect(parse(input)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("equals"),
  }));
});

test("Single condition: notEquals", () => {
  const input = "name=!Chirtle";

  expect(parse(input)).toHaveLength(1);
  expect(parse(input)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("notEquals"),
  }));
});

test("Single condition: isLessThan", () => {
  const input = "name=<Chirtle";

  expect(parse(input)).toHaveLength(1);
  expect(parse(input)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("isLessThan"),
  }));
});

test("Single condition: isLessThanOrEquals", () => {
  const input = "name=[Chirtle";

  expect(parse(input)).toHaveLength(1);
  expect(parse(input)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("isLessThanOrEquals"),
  }));
});

test("Single condition: isGreaterThan", () => {
  const input = "name=>Chirtle";

  expect(parse(input)).toHaveLength(1);
  expect(parse(input)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("isGreaterThan"),
  }));
});

test("Single condition: isGreaterThanOrEquals", () => {
  const input = "name=]Chirtle";

  expect(parse(input)).toHaveLength(1);
  expect(parse(input)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("isGreaterThanOrEquals"),
  }));
});

test("Single condition: startsWith", () => {
  const input = "name=^Chirtle";

  expect(parse(input)).toHaveLength(1);
  expect(parse(input)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("startsWith"),
  }));
});

test("Single condition: contains", () => {
  const input = "name=*Chirtle";

  expect(parse(input)).toHaveLength(1);
  expect(parse(input)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("contains"),
  }));
});


test("Single condition - exclude RegEx: equals", () => {
  const input = "name=Chirtle";

  expect(parse(input, "&", true)).toHaveLength(1);
  expect(parse(input, "&", true)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("equals"),
  }));
});

test("Single condition - exclude RegEx: notEquals", () => {
  const input = "name=!Chirtle";

  expect(parse(input, "&", true)).toHaveLength(1);
  expect(parse(input, "&", true)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("notEquals"),
  }));
});

test("Single condition - exclude RegEx: isLessThan", () => {
  const input = "name=<Chirtle";

  expect(parse(input, "&", true)).toHaveLength(1);
  expect(parse(input, "&", true)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("isLessThan"),
  }));
});

test("Single condition - exclude RegEx: isLessThanOrEquals", () => {
  const input = "name=[Chirtle";

  expect(parse(input, "&", true)).toHaveLength(1);
  expect(parse(input, "&", true)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("isLessThanOrEquals"),
  }));
});

test("Single condition - exclude RegEx: isGreaterThan", () => {
  const input = "name=>Chirtle";

  expect(parse(input, "&", true)).toHaveLength(1);
  expect(parse(input, "&", true)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("isGreaterThan"),
  }));
});

test("Single condition - exclude RegEx: isGreaterThanOrEquals", () => {
  const input = "name=]Chirtle";

  expect(parse(input, "&", true)).toHaveLength(1);
  expect(parse(input, "&", true)).toContainEqual(expect.objectContaining({
    field: "name",
    value: "Chirtle",
    operator: QueryOperator("isGreaterThanOrEquals"),
  }));
});

test("Single condition - exclude RegEx: startsWith", () => {
  const input = "name=^Chirtle";

  expect(parse(input, "&", true)).toBe(null);
});

test("Single condition - exclude RegEx: contains", () => {
  const input = "name=*Chirtle";

  expect(parse(input, "&", true)).toBe(null);
});