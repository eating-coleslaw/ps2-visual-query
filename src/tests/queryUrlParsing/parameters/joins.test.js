import parse from "../../../planetside/queryUrlParsing/parameters/joins";
import QueryJoin from "../../../planetside/QueryJoin";
import QueryOperator from "../../../planetside/QueryOperator";

describe("Simple join string - parseSimpleJoinString()", () => {
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

            expect(result).toEqual(null);
          });

          test("Non-collection value", () => {
            const input = "type:";
            const result = parse(input);

            expect(result).toEqual(null);
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

            expect(result).toEqual(null);
          });

          test("Non-collection value", () => {
            const input = "birthday_presents^inject_at:presents";
            const result = parse(input);

            expect(result).toEqual(null);
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

describe("Sibling joins with no children", () => {
  describe("Multiple valid joins", () => {
    const input = "character,item,characters_item";
    const result = parse(input);

    test("Has correct length", () => expect(result).toHaveLength(3));

    test("Has correct joins", () => {
      expect(result[0]).toEqual(
        expect.objectContaining({
          parentId: null,
          collection: "character",
        })
      );

      expect(result[1]).toEqual(
        expect.objectContaining({
          parentId: null,
          collection: "item",
        })
      );

      expect(result[2]).toEqual(
        expect.objectContaining({
          parentId: null,
          collection: "characters_item",
        })
      );
    });
  });

  describe("Mixed valid & invalid joins", () => {
    const input = "character,birthday_presents,characters_item";
    const result = parse(input);

    test("Has correct length", () => expect(result).toHaveLength(2));

    test("Has correct joins", () => {
      expect(result[0]).toEqual(
        expect.objectContaining({
          parentId: null,
          collection: "character",
        })
      );

      expect(result[1]).toEqual(
        expect.objectContaining({
          parentId: null,
          collection: "characters_item",
        })
      );
    });
  });

  describe("Multiple valid joins with various keys", () => {
    const input =
      "character^terms:name.first=Chirtle^hide:times'certs'daily_ribbon,item^on:item_id^to:weapon_id,characters_item^list:1^outer:0";
    const result = parse(input);

    test("Has correct length", () => expect(result).toHaveLength(3));

    describe("First join", () => {
      const join = result[0];

      test("Has correct collection & ID", () => {
        expect(join).toEqual(
          expect.objectContaining({
            parentId: null,
            collection: "character",
          })
        );
      });

      test("Key values are correct", () => {
        expect(join.filterType).toBe("hide");
        expect(join.filterFields).toEqual(["times", "certs", "daily_ribbon"]);

        expect(join.terms).toHaveLength(1);
        expect(join.terms[0]).toEqual(
          expect.objectContaining({
            field: "name.first",
            value: "Chirtle",
            operator: QueryOperator("equals"),
          })
        );
      });
    });

    describe("Second join", () => {
      const join = result[1];

      test("Has correct collection & ID", () => {
        expect(join).toEqual(
          expect.objectContaining({
            parentId: null,
            collection: "item",
          })
        );
      });

      test("Key values are correct", () => {
        expect(join.onField).toBe("item_id");
        expect(join.toField).toBe("weapon_id");
      });
    });

    describe("Third join", () => {
      const join = result[2];

      test("Has correct collection & ID", () => {
        expect(join).toEqual(
          expect.objectContaining({
            parentId: null,
            collection: "characters_item",
          })
        );
      });

      test("Key values are correct", () => {
        expect(join.isList).toBe(true);
        expect(join.isOuterJoin).toBe(false);
      });
    });
  });
});

describe("Parent join with single child: a(b)", () => {
  describe("Parent join has no keys", () => {
    describe("Child had no keys", () => {
      const input = "characters_item(item)";
      const result = parse(input);

      const parentJoin = result[0];

      test("Parent join set correctly", () => {
        expect(parentJoin).toEqual(
          expect.objectContaining({
            parentId: null,
            collection: "characters_item",
          })
        );

        expect(parentJoin.joins).toHaveLength(1);
        expect(parentJoin.joins[0]).toEqual(
          expect.objectContaining({
            parentId: parentJoin.id,
            collection: "item",
          })
        );
      });
    });

    describe("Child has key values", () => {
      const input =
        "characters_item(type:item^terms:item_type_id=26^list:1^hide:item_id'item_type_id)";
      const result = parse(input);

      const parentJoin = result[0];

      test("Parent join set correctly", () => {
        expect(parentJoin).toEqual(
          expect.objectContaining({
            parentId: null,
            collection: "characters_item",
          })
        );

        expect(parentJoin.joins).toHaveLength(1);
        expect(parentJoin.joins[0]).toEqual(
          expect.objectContaining({
            parentId: parentJoin.id,
            collection: "item",
            isList: true,
            filterType: "hide",
            filterFields: ["item_id", "item_type_id"],
          })
        );

        expect(parentJoin.joins[0].terms).toHaveLength(1);
        expect(parentJoin.joins[0].terms[0]).toEqual(
          expect.objectContaining({
            field: "item_type_id",
            value: "26",
            operator: QueryOperator("equals"),
          })
        );
      });
    });
  });

  describe("Parent join has key values", () => {
    describe("Child had no keys", () => {
      const input = "characters_item^on:character_id^to:character_id(item)";
      const result = parse(input);

      const parentJoin = result[0];

      test("Parent join set correctly", () => {
        expect(parentJoin).toEqual(
          expect.objectContaining({
            parentId: null,
            collection: "characters_item",
            onField: "character_id",
            toField: "character_id",
          })
        );

        expect(parentJoin.joins).toHaveLength(1);
        expect(parentJoin.joins[0]).toEqual(
          expect.objectContaining({
            parentId: parentJoin.id,
            collection: "item",
          })
        );
      });
    });

    describe("Child has key values", () => {
      const input =
        "characters_item^on:character_id^to:character_id(type:item^terms:item_type_id=26^list:1^hide:item_id'item_type_id)";
      const result = parse(input);

      const parentJoin = result[0];

      test("Parent join set correctly", () => {
        expect(parentJoin).toEqual(
          expect.objectContaining({
            collection: "characters_item",
            onField: "character_id",
            toField: "character_id",
          })
        );

        expect(parentJoin.joins).toHaveLength(1);
        expect(parentJoin.joins[0]).toEqual(
          expect.objectContaining({
            parentId: parentJoin.id,
            collection: "item",
            isList: true,
            filterType: "hide",
            filterFields: ["item_id", "item_type_id"],
          })
        );

        expect(parentJoin.joins[0].terms).toHaveLength(1);
        expect(parentJoin.joins[0].terms[0]).toEqual(
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

describe("Parent join with sibling children: a(b,c)", () => {
  const input = "characters_item(item,item_to_weapon)";
  const result = parse(input);

  const parentJoin = result[0];

  test("Parent join is correct", () => {
    expect(parentJoin).toEqual(
      expect.objectContaining({
        parentId: null,
        collection: "characters_item",
      })
    );
    expect(parentJoin.joins).toHaveLength(2);
  });

  describe("Children joins are correct", () => {
    test("First child", () => {
      expect(parentJoin.joins[0]).toEqual(
        expect.objectContaining({
          parentId: parentJoin.id,
          collection: "item",
        })
      );
    });

    test("Second child", () => {
      expect(parentJoin.joins[1]).toEqual(
        expect.objectContaining({
          parentId: parentJoin.id,
          collection: "item_to_weapon",
        })
      );
    });
  });
});

describe("Sibling joins each with sibling children: a(b,c),d(e,f,g)", () => {
  const input =
    "characters_item(item,item_to_weapon),characters_directive(directive,directive_tree,directive_tier)";
  const result = parse(input);

  describe("First parent & children", () => {
    const parentJoin = result[0];

    test("Parent join is correct", () => {
      expect(parentJoin).toEqual(
        expect.objectContaining({
          parentId: null,
          collection: "characters_item",
        })
      );

      expect(parentJoin.joins).toHaveLength(2);
    });

    describe("Children joins are correct", () => {
      test("First child", () => {
        expect(parentJoin.joins[0]).toEqual(
          expect.objectContaining({
            parentId: parentJoin.id,
            collection: "item",
          })
        );
      });

      test("Second child", () => {
        expect(parentJoin.joins[1]).toEqual(
          expect.objectContaining({
            parentId: parentJoin.id,
            collection: "item_to_weapon",
          })
        );
      });
    });
  });

  describe("Second parent & children", () => {
    const parentJoin = result[1];

    test("Parent join is correct", () => {
      expect(parentJoin).toEqual(
        expect.objectContaining({
          parentId: null,
          collection: "characters_directive",
        })
      );

      expect(parentJoin.joins).toHaveLength(3);
    });

    describe("Children joins are correct", () => {
      test("First child", () => {
        expect(parentJoin.joins[0]).toEqual(
          expect.objectContaining({
            parentId: parentJoin.id,
            collection: "directive",
          })
        );
      });

      test("Second child", () => {
        expect(parentJoin.joins[1]).toEqual(
          expect.objectContaining({
            parentId: parentJoin.id,
            collection: "directive_tree",
          })
        );
      });

      test("Third child", () => {
        expect(parentJoin.joins[2]).toEqual(
          expect.objectContaining({
            parentId: parentJoin.id,
            collection: "directive_tier",
          })
        );
      });
    });
  });
});

describe("Parent join with multi-nested children: a(b(c(d,e)))", () => {
  const input =
    "item_to_weapon(weapon(weapon_to_fire_group(fire_group_to_fire_mode,projectile)))";
  const result = parse(input);

  const parentJoin = result[0];
  test("Parent join is correct", () => {
    expect(parentJoin).toEqual(
      expect.objectContaining({
        parentId: null,
        collection: "item_to_weapon",
      })
    );

    expect(parentJoin.joins).toHaveLength(1);
  });

  const depth1Join = parentJoin.joins[0];
  test("Depth 1 child", () => {
    expect(depth1Join).toEqual(
      expect.objectContaining({
        parentId: result[0].id,
        collection: "weapon",
      })
    );

    expect(depth1Join.joins).toHaveLength(1);
  });

  const depth2Join = depth1Join.joins[0];
  test("Depth 2 child", () => {
    expect(depth2Join).toEqual(
      expect.objectContaining({
        parentId: depth1Join.id,
        collection: "weapon_to_fire_group",
      })
    );
  });

  describe("Depth 3 children", () => {
    test("First child", () => {
      const join = depth2Join.joins[0];

      expect(join).toEqual(
        expect.objectContaining({
          parentId: depth2Join.id,
          collection: "fire_group_to_fire_mode",
        })
      );
    });

    test("Second child", () => {
      const join = depth2Join.joins[1];

      expect(join).toEqual(
        expect.objectContaining({
          parentId: depth2Join.id,
          collection: "projectile",
        })
      );
    });
  });
});

describe("Ignore invalid sibling & nested joins", () => {
  test("Root sibling is invalid: a,,c", () => {
    const input = "item,,character";
    const result = parse(input);

    expect(result).toHaveLength(2);

    expect(result[0]).toEqual(
      expect.objectContaining({
        parentId: null,
        collection: "item",
      })
    );

    expect(result[1]).toEqual(
      expect.objectContaining({
        parentId: null,
        collection: "character",
      })
    );
  });

  test("Child sibling is invalid: a(b,,d)", () => {
    const input = "item(character,,characters_item)";
    const result = parse(input);

    const parentJoin = result[0];

    expect(result).toHaveLength(1);

    expect(parentJoin).toEqual(
      expect.objectContaining({
        parentId: null,
        collection: "item",
      })
    );

    expect(parentJoin.joins).toHaveLength(2);

    expect(parentJoin.joins[0]).toEqual(
      expect.objectContaining({
        parentId: parentJoin.id,
        collection: "character",
      })
    );

    expect(parentJoin.joins[1]).toEqual(
      expect.objectContaining({
        parentId: parentJoin.id,
        collection: "characters_item",
      })
    );
  });

  test("No valid children: a()", () => {
    const input = "item()";
    const result = parse(input);

    expect(result[0]).toEqual(
      expect.objectContaining({
        parentId: null,
        collection: "item",
        joins: [],
      })
    );
  });
});

test("Ignore joins if missing closing parentheses: a(b", () => {
  const input = "item(item_category_id";
  const result = parse(input);

  expect(result).toBe(null);
});

test("Ignore joins if missing closing parentheses: a(b(c)", () => {
  const input = "item(item_category_id(weapon)";
  const result = parse(input);

  expect(result).toBe(null);
});
