import parse from "../../../planetside/queryUrlParsing/parameters/joins";
import QueryJoin from "../../../planetside/QueryJoin";
import QueryOperator from "../../../planetside/QueryOperator";

describe("Simple join string [parseSimpleJoinString()]", () => {
  describe("Basic join keys set correctly", () => {
    describe("'type' & implicit join collection", () => {
      describe("Explicit join collection works as expected", () => {
        test("Has correct number of joins", () => {
          const input = "type:item";
          const result = parse(input);

          expect(result).toHaveLength(1);
        });

        test("collection is correct", () => {
          const input = "type:item";
          const result = parse(input);

          expect(result[0].collection).toBe("item");
        });

        describe("Invalid explicit collection is ignored", () => {
          test("Empty value", () => {
            const input = "type:";
            const result = parse(input);

            expect(result).toEqual([]);
          });

          test("Non-collection value", () => {
            const input = "type:";
            const result = parse(input);

            expect(result).toEqual([]);
          });
        });

        describe("Duplicate handling works correctly", () => {
          test("Second value ignored if first is valid", () => {
            const input = "type:item^type:character";
            const result = parse(input);

            expect(result[0].collection).toBe("item");
          });

          test("Second value used if first is invalid", () => {
            const input = "type:birthday_presents^type:item";
            const result = parse(input);

            expect(result[0].collection).toBe("item");
          });
        });
      });

      describe("Implicit join collection works as expected", () => {
        test("Has correct number of joins", () => {
          const input = "item";
          const result = parse(input);

          expect(result).toHaveLength(1);
        });

        test("collection is correct", () => {
          const input = "item";
          const result = parse(input);

          expect(result[0].collection).toBe("item");
        });

        describe("Invalid implicit collection is ignored", () => {
          test("Empty value", () => {
            const input = "^inject_at:presents";
            const result = parse(input);

            expect(result).toEqual([]);
          });

          test("Non-collection value", () => {
            const input = "birthday_presents^inject_at:presents";
            const result = parse(input);

            expect(result).toEqual([]);
          });
        });
      });

      test("Implicit collection followed by explicit uses implicit value", () => {
        const input = "item^type:characters_item";
        const result = parse(input);

        expect(result[0].collection).toBe("item");
      });

      test("'type' value used if a non-type join key is the first key", () => {
        const input = "inject_at:items^type:item";
        const result = parse(input);

        expect(result[0].collection).toBe("item");
      });
    });

    describe("'on'", () => {
      test("Valid value set correctly", () => {
        const input = "item^on:item_id";
        const result = parse(input);

        expect(result[0].onField).toBe("item_id");
      });

      test("Invalid value ignored", () => {
        const input = "item^on:Invalid!Field";
        const result = parse(input);

        expect(result[0].onField).toBe("");
      });

      test("Duplicate key ignored if first value is valid", () => {
        const input = "item^on:item_id^on:item_category_id";
        const result = parse(input);

        expect(result[0].onField).toBe("item_id");
      });

      test("Duplicate key used if first value is invalid", () => {
        const input = "item^on:^on:item_category_id";
        const result = parse(input);

        expect(result[0].onField).toBe("item_category_id");
      });
    });

    describe("'to'", () => {
      test("Valid value set correctly", () => {
        const input = "item^to:item_id";
        const result = parse(input);

        expect(result[0].toField).toBe("item_id");
      });

      test("Invalid value ignored", () => {
        const input = "item^to:Invalid!Field";
        const result = parse(input);

        expect(result[0].toField).toBe("");
      });

      test("Duplicate key ignored if first value is valid", () => {
        const input = "item^to:item_id^to:item_category_id";
        const result = parse(input);

        expect(result[0].toField).toBe("item_id");
      });

      test("Duplicate key used if first value is invalid", () => {
        const input = "item^to:^to:item_category_id";
        const result = parse(input);

        expect(result[0].toField).toBe("item_category_id");
      });
    });

    describe("'list'", () => {
      describe("Boolean string value", () => {
        test("Value set correctly - 'true'", () => {
          const input = "item^list:true";
          const result = parse(input);

          expect(result[0].isList).toBe(true);
        });

        test("Value set correctly - 'false'", () => {
          const input = "item^list:false";
          const result = parse(input);

          expect(result[0].isList).toBe(false);
        });
      });

      describe("Bit string value", () => {
        test("Value set correctly - '1'", () => {
          const input = "item^list:1";
          const result = parse(input);

          expect(result[0].isList).toBe(true);
        });

        test("Value set correctly - '0'", () => {
          const input = "item^list:0";
          const result = parse(input);

          expect(result[0].isList).toBe(false);
        });
      });

      test("Invalid value ignored", () => {
        const input = "item^list:yes";
        const result = parse(input);

        expect(result[0].isList).toBe(false);
      });

      test("Duplicate key ignored if first value is valid", () => {
        const input = "item^list:1^list:0";
        const result = parse(input);

        expect(result[0].isList).toBe(true);
      });

      test("Duplicate key used if first value is invalid", () => {
        const input = "item^list:^list:1";
        const result = parse(input);

        expect(result[0].isList).toBe(true);
      });
    });

    describe("'outer'", () => {
      describe("Boolean string value", () => {
        test("Value set correctly - 'true'", () => {
          const input = "item^outer:true";
          const result = parse(input);

          expect(result[0].isOuterJoin).toBe(true);
        });

        test("Value set correctly - 'false'", () => {
          const input = "item^outer:false";
          const result = parse(input);

          expect(result[0].isOuterJoin).toBe(false);
        });
      });

      describe("Bit string value", () => {
        test("Value set correctly - '1'", () => {
          const input = "item^outer:1";
          const result = parse(input);

          expect(result[0].isOuterJoin).toBe(true);
        });

        test("Value set correctly - '0'", () => {
          const input = "item^outer:0";
          const result = parse(input);

          expect(result[0].isOuterJoin).toBe(false);
        });
      });

      test("Invalid value ignored", () => {
        const input = "item^outer:yes";
        const result = parse(input);

        expect(result[0].isOuterJoin).toBe(false);
      });

      test("Duplicate key ignored if first value is valid", () => {
        const input = "item^outer:1^outer:0";
        const result = parse(input);

        expect(result[0].isOuterJoin).toBe(true);
      });

      test("Duplicate key used if first value is invalid", () => {
        const input = "item^outer:^outer:1";
        const result = parse(input);

        expect(result[0].isOuterJoin).toBe(true);
      });
    });

    describe("'show'", () => {
      describe("Multiple valid fields", () => {
        const input = "item^show:item_id'item_category_id'item_type";
        const result = parse(input);

        test("filterType is correct", () =>
          expect(result[0].filterType).toBe("show"));
        test("filterFields set correctly", () => {
          const fields = result[0].filterFields;
          expect(fields).toEqual(["item_id", "item_category_id", "item_type"]);
        });

        test("Exclude invalid fields", () => {
          const input = "item^show:item_id'Invalid!Field'item_type";
          const result = parse(input);

          expect(result[0].filterFields).toEqual(["item_id", "item_type"]);
        });

        test("Exclude empty fields", () => {
          const input = "item^show:item_id''item_type";
          const result = parse(input);

          expect(result[0].filterFields).toEqual(["item_id", "item_type"]);
        });
      });

      describe("Duplicate key handling", () => {
        test("Concat values from multiple 'show' keys", () => {
          const input = "show:item_id^type:item^show:item_type";
          const result = parse(input);

          expect(result[0].filterFields).toEqual(["item_id", "item_type"]);
        });

        test("Ignore 'show' if preceded by 'hide' with valid values", () => {
          const input = "item^hide:item_id^show:item_type";
          const result = parse(input);

          expect(result[0].filterType).toBe("hide");
          expect(result[0].filterFields).toEqual(["item_id"]);
        });

        test("Use second 'show' if first doesn't have valid values", () => {
          const input = "item^show:^show:item_type";
          const result = parse(input);

          expect(result[0].filterFields).toEqual(["item_type"]);
        });

        test("Use 'show' if preceded by 'hide' without valid values", () => {
          const input = "item^hide:^show:item_type";
          const result = parse(input);

          expect(result[0].filterType).toBe("show");
          expect(result[0].filterFields).toEqual(["item_type"]);
        });
      });
    });

    describe("'hide'", () => {
      describe("Multiple valid fields", () => {
        const input = "item^hide:item_id'item_category_id'item_type";
        const result = parse(input);

        test("filterType is correct", () =>
          expect(result[0].filterType).toBe("hide"));
        test("filterFields set correctly", () => {
          const fields = result[0].filterFields;
          expect(fields).toEqual(["item_id", "item_category_id", "item_type"]);
        });

        test("Exclude invalid fields", () => {
          const input = "item^hide:item_id'Invalid!Field'item_type";
          const result = parse(input);

          expect(result[0].filterFields).toEqual(["item_id", "item_type"]);
        });

        test("Exclude empty fields", () => {
          const input = "item^hide:item_id''item_type";
          const result = parse(input);

          expect(result[0].filterFields).toEqual(["item_id", "item_type"]);
        });
      });

      describe("Duplicate key handling", () => {
        test("Concat values from multiple 'hide' keys", () => {
          const input = "hide:item_id^type:item^hide:item_type";
          const result = parse(input);

          expect(result[0].filterFields).toEqual(["item_id", "item_type"]);
        });

        test("Ignore 'hide' if preceded by 'show' with valid values", () => {
          const input = "item^show:item_id^hide:item_type";
          const result = parse(input);

          expect(result[0].filterType).toBe("show");
          expect(result[0].filterFields).toEqual(["item_id"]);
        });

        test("Use second 'hide' if first doesn't have valid values", () => {
          const input = "item^hide:^hide:item_type";
          const result = parse(input);

          expect(result[0].filterFields).toEqual(["item_type"]);
        });

        test("Use 'hide' if preceded by 'show' without valid values", () => {
          const input = "item^show:^hide:item_type";
          const result = parse(input);

          expect(result[0].filterType).toBe("hide");
          expect(result[0].filterFields).toEqual(["item_type"]);
        });
      });
    });

    describe("'inject_at'", () => {
      test("Valid value set correctly", () => {
        const input = "item^inject_at:Items";
        const result = parse(input);

        expect(result[0].injectAt).toBe("Items");
      });

      test("Invalid value ignored", () => {
        const input = "item^inject_at:";
        const result = parse(input);

        expect(result[0].injectAt).toBe("");
      });

      test("Duplicate key ignored if first value is valid", () => {
        const input = "item^inject_at:FirstItems^inject_at:SecondItems";
        const result = parse(input);

        expect(result[0].injectAt).toBe("FirstItems");
      });

      test("Duplicate key used if first value is invalid", () => {
        const input = "item^on:^inject_at:^inject_at:SecondItems";
        const result = parse(input);

        expect(result[0].injectAt).toBe("SecondItems");
      });
    });

    describe("'terms'", () => {
      test("Valid value set correctly", () => {
        const input = "character_name^terms:name.first=Chirtle";
        const result = parse(input);

        expect(result[0].terms).toHaveLength(1);
        expect(result[0].terms).toContainEqual(
          expect.objectContaining({
            field: "name.first",
            value: "Chirtle",
            operator: QueryOperator("equals"),
          })
        );
      });

      test("Empty value ignored", () => {
        const input = "item^terms:";
        const result = parse(input);

        expect(result[0].terms).toHaveLength(0);
      });

      test("Multiple valid terms", () => {
        const input = "item^terms:item_id=11'item_type_id=26";
        const result = parse(input);

        expect(result[0].terms).toHaveLength(2);
        expect(result[0].terms).toContainEqual(
          expect.objectContaining({
            field: "item_id",
            value: "11",
            operator: QueryOperator("equals"),
          })
        );
        expect(result[0].terms).toContainEqual(
          expect.objectContaining({
            field: "item_type_id",
            value: "26",
            operator: QueryOperator("equals"),
          })
        );
      });

      test("Mixed valid and invalid terms", () => {
        const input = "item^terms:item_id=11'invalid='item_type_id=26";
        const result = parse(input);

        expect(result[0].terms).toHaveLength(2);
        expect(result[0].terms).toContainEqual(
          expect.objectContaining({
            field: "item_id",
            value: "11",
            operator: QueryOperator("equals"),
          })
        );
        expect(result[0].terms).toContainEqual(
          expect.objectContaining({
            field: "item_type_id",
            value: "26",
            operator: QueryOperator("equals"),
          })
        );
      });

      test("Concatenate terms from multiple 'terms' keys", () => {
        const input = "terms:item_id=11^type:item^terms:item_type_id=26";
        const result = parse(input);

        expect(result[0].terms).toHaveLength(2);
        expect(result[0].terms).toContainEqual(
          expect.objectContaining({
            field: "item_id",
            value: "11",
            operator: QueryOperator("equals"),
          })
        );
        expect(result[0].terms).toContainEqual(
          expect.objectContaining({
            field: "item_type_id",
            value: "26",
            operator: QueryOperator("equals"),
          })
        );
      });
    });
  });
});

// test("Simple join works as expected - explicit join collection", () => {
//   const input = "item^list:1^outer:1^on:item_id^to:item_id";

//   const result = parse(input);

//   expect(result).toHaveLength(1);
//   expect(result).toContainEqual(
//     expect.objectContaining({
//       collection: "item",
//       isOuterJoin: true,
//       isList: true,
//       onField: "item_id",
//       toField: "item_id",
//     })
//   );
// });
