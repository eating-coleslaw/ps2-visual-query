import QueryOperator from "./QueryOperator";
import { v4 as uuidv4 } from "uuid";

const QueryCondition = (
  defaultOperatorName = "equals",
  field = "",
  value = ""
) => {
  return {
    id: uuidv4(),
    field: field,
    value: value,
    operator: QueryOperator(defaultOperatorName),
  };
};

export default QueryCondition;
