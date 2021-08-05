import QueryOperator from "./QueryOperator";
import { v4 as uuidv4 } from "uuid";

const QueryCondition = (defaultOperatorName = "equals") => {
  return {
    id: uuidv4(),
    field: "",
    value: "",
    operator: QueryOperator(defaultOperatorName),
  };
};

export default QueryCondition;
