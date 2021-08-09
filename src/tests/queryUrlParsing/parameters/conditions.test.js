import parse from "../../../planetside/queryUrlParsing/parameters/conditions";
import QueryOperator from "../../../planetside/QueryOperator";

describe("Invalid parameters", () => {
  test("Returns null with empty valueString parameter", () =>
    expect(parse("")).toBe(null));

  test("Returns null with empty delimiter", () => {
    const input = "name=Chirtle";
    expect(parse(input, "")).toBe(null);
  });
});

describe("Single condition", () => {
  describe("Include RegEx operators", () => {
    test("equals is included", () => {
      const input = "name=Chirtle";

      const result = parse(input);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("equals"),
        })
      );
    });

    test("notEquals is included", () => {
      const input = "name=!Chirtle";

      const result = parse(input);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("notEquals"),
        })
      );
    });

    test("isLessThan is included", () => {
      const input = "name=<Chirtle";

      const result = parse(input);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("isLessThan"),
        })
      );
    });

    test("isLessThanOrEquals is included", () => {
      const input = "name=[Chirtle";

      const result = parse(input);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("isLessThanOrEquals"),
        })
      );
    });

    test("isGreaterThan is included", () => {
      const input = "name=>Chirtle";

      const result = parse(input);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("isGreaterThan"),
        })
      );
    });

    test("isGreaterThanOrEquals is included", () => {
      const input = "name=]Chirtle";

      const result = parse(input);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("isGreaterThanOrEquals"),
        })
      );
    });

    test("startsWith is included", () => {
      const input = "name=^Chirtle";

      const result = parse(input);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("startsWith"),
        })
      );
    });

    test("contains is included", () => {
      const input = "name=*Chirtle";

      const result = parse(input);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("contains"),
        })
      );
    });
  });

  describe("Exclude RegEx operators", () => {
    test("equals is included", () => {
      const input = "name=Chirtle";

      const result = parse(input, "&", true);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("equals"),
        })
      );
    });

    test("notEquals is included", () => {
      const input = "name=!Chirtle";

      const result = parse(input, "&", true);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("notEquals"),
        })
      );
    });

    test("isLessThan is included", () => {
      const input = "name=<Chirtle";

      const result = parse(input, "&", true);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("isLessThan"),
        })
      );
    });

    test("isLessThanOrEquals is included", () => {
      const input = "name=[Chirtle";

      const result = parse(input, "&", true);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("isLessThanOrEquals"),
        })
      );
    });

    test("isGreaterThan is included", () => {
      const input = "name=>Chirtle";

      const result = parse(input, "&", true);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("isGreaterThan"),
        })
      );
    });

    test("isGreaterThanOrEquals is included", () => {
      const input = "name=]Chirtle";

      const result = parse(input, "&", true);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("isGreaterThanOrEquals"),
        })
      );
    });

    test("startsWith is excluded", () => {
      const input = "name=^Chirtle";

      expect(parse(input, "&", true)).toBe(null);
    });

    test("contains is excluded", () => {
      const input = "name=*Chirtle";

      expect(parse(input, "&", true)).toBe(null);
    });
  });
});

describe("Multiple conditions", () => {
  describe("& delimiter", () => {
    test("Works and includes RegEx conditions", () => {
      const input = "name=*Chirtle&battle_rank=>30&world_id=13&title=^Recruit";

      const result = parse(input);

      expect(result).toHaveLength(4);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("contains"),
        })
      );
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "battle_rank",
          value: "30",
          operator: QueryOperator("isGreaterThan"),
        })
      );
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "world_id",
          value: "13",
          operator: QueryOperator("equals"),
        })
      );
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "title",
          value: "Recruit",
          operator: QueryOperator("startsWith"),
        })
      );
    });

    test("Excludes condition with no value", () => {
      const input = "name=Chirtle&battle_rank=>";

      const result = parse(input);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("equals"),
        })
      );
    });

    test("Excludes RegEx operators correctly", () => {
      const input = "name=*Chirtle&battle_rank=]10&world_id=13&title=^Recruit";

      const result = parse(input, "&", true);

      expect(result).toHaveLength(2);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "battle_rank",
          value: "10",
          operator: QueryOperator("isGreaterThanOrEquals"),
        })
      );
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "world_id",
          value: "13",
          operator: QueryOperator("equals"),
        })
      );
    });

    test("Exclude conditions with invalid field", () => {
      const input = "name=Chirtle&Invalid!Field=25";

      const result = parse(input);

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("equals"),
        })
      );
    });
  });

  describe("' delimiter", () => {
    test("Works for valid conditions", () => {
      const input = "name=Chirtle'battle_rank=>30";

      const result = parse(input, "'");

      expect(result).toHaveLength(2);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("equals"),
        })
      );
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "battle_rank",
          value: "30",
          operator: QueryOperator("isGreaterThan"),
        })
      );
    });

    test("Excludes condition with no value", () => {
      const input = "name=Chirtle'battle_rank=>";

      const result = parse(input, "'");

      expect(result).toHaveLength(1);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "name",
          value: "Chirtle",
          operator: QueryOperator("equals"),
        })
      );
    });

    test("Excludes RegEx operators correctly", () => {
      const input = "name=*Chirtle'battle_rank=]30'world_id=13'title=^Recruit";

      const result = parse(input, "'", true);

      expect(result).toHaveLength(2);
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "battle_rank",
          value: "30",
          operator: QueryOperator("isGreaterThanOrEquals"),
        })
      );
      expect(result).toContainEqual(
        expect.objectContaining({
          field: "world_id",
          value: "13",
          operator: QueryOperator("equals"),
        })
      );
    });
  });
});
