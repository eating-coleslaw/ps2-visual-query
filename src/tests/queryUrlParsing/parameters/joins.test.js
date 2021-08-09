import parse from "../../../planetside/queryUrlParsing/parameters/joins";
import QueryJoin from "../../../planetside/QueryJoin";

describe("Simple join", () => {  
  describe("Explicit join collection works as expected", () => {
    const input = "type:item"; //^list:1^outer:1^on:item_id^to:item_id";
    const result = parse(input);
    
    test("Has correct number of joins", () => expect(result).toHaveLength(1));
    test("collection is correct", () => expect(result[0].collection).toBe("item"));
    // test("isOuterJoin is correct", () => expect(result[0].isOuterJoin).toBe(true));
    // test("isList is correct", () => expect(result[0].isList).toBe(true));
    // test("onField is correct", () => expect(result[0].onField).toBe("item_id"));
    // test("toField is correct", () => expect(result[0].toField).toBe("item_id"));
  });
  
  describe("Implicit join collection works as expected", () => {
    const input = "item"; //^list:1^outer:1^on:item_id^to:item_id";
    const result = parse(input);
    
    test("Has correct number of joins", () => expect(result).toHaveLength(1));
    test("collection is correct", () => expect(result[0].collection).toBe("item"));
    // test("isOuterJoin is correct", () => expect(result[0].isOuterJoin).toBe(true));
    // test("isList is correct", () => expect(result[0].isList).toBe(true));
    // test("onField is correct", () => expect(result[0].onField).toBe("item_id"));
    // test("toField is correct", () => expect(result[0].toField).toBe("item_id"));
  });

  describe("Implicit collection followed by explicit uses implicit value", () => {
    const input = "item^type:characters_item";
    const result = parse(input);

    test("Has correct number of joins", () => expect(result).toHaveLength(1));
    test("collection is correct", () => expect(result[0].collection).toBe("item"));
  });
  
  describe("Basic join keys set correctly", () => {
    describe("'on'", () =>{
      test("Valid value set correctly", () => {
        const input = "item^on:item_id";
        const result = parse(input);
        
        expect(result[0].onField).toBe("item_id");
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
    
    describe("'to'", () =>{
      test("Valid value set correctly", () => {
        const input = "item^to:item_id";
        const result = parse(input);
        
        expect(result[0].toField).toBe("item_id");
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
    
    describe("'list'", () =>{
      
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

    describe("'outer'", () =>{
      
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

    describe("'show' / 'hide' fields", () => {
      describe("'show'", () => {

        describe("Multiple valid fields", () => {
          const input = "item^show:item_id'item_category_id'item_type";
          const result = parse(input);
          
          test("filterType is correct", () => expect(result[0].filterType).toBe("show"));
          test("filterFields set correctly", () => {
            const fields = result[0].filterFields;
            expect(fields).toEqual([ "item_id", "item_category_id", "item_type"]);
          });

          test("Exclude invalid fields", () => {
            const input = "item^show:item_id'Invalid!Field'item_type";
            const result = parse(input);

            expect(result[0].filterFields).toEqual([ "item_id", "item_type"]);
          });

          test("Exclude empty fields", () => {
            const input = "item^show:item_id''item_type";
            const result = parse(input);

            expect(result[0].filterFields).toEqual([ "item_id", "item_type"]);
          });
        });

        describe("Duplicate key handling", () => {
          test("Ignore second 'show' if first has valid values", () => {
            const input = "item^show:item_id^show:item_type";
            const result = parse(input);

            expect(result[0].filterFields).toEqual(["item_id"]);
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
          
          test("filterType is correct", () => expect(result[0].filterType).toBe("hide"));
          test("filterFields set correctly", () => {
            const fields = result[0].filterFields;
            expect(fields).toEqual([ "item_id", "item_category_id", "item_type"]);
          });

          test("Exclude invalid fields", () => {
            const input = "item^hide:item_id'Invalid!Field'item_type";
            const result = parse(input);

            expect(result[0].filterFields).toEqual([ "item_id", "item_type"]);
          });

          test("Exclude empty fields", () => {
            const input = "item^hide:item_id''item_type";
            const result = parse(input);

            expect(result[0].filterFields).toEqual([ "item_id", "item_type"]);
          });
        });

        describe("Duplicate key handling", () => {
          test("Ignore second 'hide' if first has valid values", () => {
            const input = "item^hide:item_id^hide:item_type";
            const result = parse(input);

            expect(result[0].filterFields).toEqual(["item_id"]);
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
