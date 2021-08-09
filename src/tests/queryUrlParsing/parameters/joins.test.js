import parse from "../../../planetside/queryUrlParsing/parameters/joins";
import QueryJoin from "../../../planetside/QueryJoin";

test("Simple join works as expected - explicit join collection", () => {
  const input = "item^list:1^outer:1^on:item_id^to:item_id";

  const result = parse(input);

  expect(result).toHaveLength(1);
  expect(result).toContainEqual(
    expect.objectContaining({
      collection: "item",
      isOuterJoin: true,
      isList: true,
      onField: "item_id",
      toField: "item_id",
    })
  );
});
