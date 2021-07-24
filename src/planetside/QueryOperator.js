import QueryEnums from "./QueryEnums";

const QueryOperator = (operatorName = "equals") => {
  const operator = QueryEnums.Operators.find((op) => op.name === operatorName);

  if (!operator) {
    return new Error(`Operator named '${operatorName} not found`);
  }

  const name = operatorName;
  const display = operator.display;
  const title = operator.title;
  const value = operator.value;

  return {
    name,
    display,
    title,
    value,
  };
};

export default QueryOperator;
