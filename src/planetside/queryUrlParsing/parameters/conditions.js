import { isValidField } from '../fieldValidation';
import QueryEnums from '../../QueryEnums';
import QueryCondition from '../../QueryCondition';

const SEARCH_MODIFIERS = [
  "<",
  "[", // <=
  ">",
  "]", // >=
  "^", // Starts With
  "*", // Contains
  "!", // NOT
];

const REGEX_MODIFIERS = [
  "^", // Starts With 
  "*", // Contains
];

export default function parse(valueString, delimiter ="&", excludeRegex = false) {
  if (!valueString) {
      return null;
  }

  const conditions = [];
  
  const splitConditions = valueString.split(delimiter);

  splitConditions.forEach((conditionString) => {
    const keyValuePair = conditionString.split("=");
    const key = keyValuePair[0];
    let value = keyValuePair[1];
    
    if (!value) {
      return;
    }

    if (!isValidField(key)) {
      return;
    }

    let operatorName = "equals";

    const firstValueChar = value.charAt(0);
    if (SEARCH_MODIFIERS.includes(firstValueChar)) {
      if (excludeRegex && REGEX_MODIFIERS.includes(firstValueChar)) {
        return;
      }
      
      value = value.slice(1);

      const operatorValue = `=${firstValueChar}`;
      operatorName =  QueryEnums.Operators.find((op) => op.value === operatorValue)?.name;
    }

    const condition = QueryCondition(operatorName);
    condition.field = key;
    condition.value = value;
    
    conditions.push(condition);
  });

  if (conditions.length === 0) {
    return null;
  }

  return conditions;
}