import QueryOperator from "./QueryOperator";
import { v4 as uuidv4 } from "uuid";

const QueryCondition = (defaultOperatorName = "equals") => {
  return {
    id: uuidv4(),
    field: "",
    value: "",
    operator: QueryOperator(defaultOperatorName),
    isValid: (field, operator, value) => !!field && !!operator && !!value,
    toString: (field, operator, value) => `${field}${operator?.value}${value}`,
  };
};

export default QueryCondition;
