import QueryOperator from "./QueryOperator";
import { v4 as uuidv4} from 'uuid';

const QueryCondition = (defaultOperatorName = "equals") => {
  const id = uuidv4();
  
  let field = "";
  let value = "";
  let operator = QueryOperator(defaultOperatorName);

  const getField = () => field;
  const getValue = () => value;
  const getOperator = () => operator;

  const setProperty = (propertyName, propertyValue) => {
    switch (propertyName) {
      case "field":
        field = propertyValue;
        break;
      case "value":
        value = propertyValue;
        break;
      case "operator":
        operator = propertyValue;
        break;
      default:
        break;
    }
  }
  
  const isValid = () => {
    return !!field && !!value && !!operator;
  } 

  const toString = () => `${field}${operator.value}${value}`;

  return {
    id,
    field,
    value,
    operator,
    isValid,
    toString,
    getField,
    getValue,
    getOperator,
    setProperty
  }
};

export default QueryCondition;