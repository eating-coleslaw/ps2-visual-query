import QueryOperand from "./QueryOperand";
import { v4 as uuidv4} from 'uuid';

class QueryCondition {
  field = null;
  operand = new QueryOperand();
  
  constructor() {
    this.id = uuidv4();
  }

  toString() {
    return `${this.field}${this.operand.toString()}`;
  }
}

export default QueryCondition;