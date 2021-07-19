class QueryOperand {
  operator = null;
  value = null;

  equals(value) {
    this.operator = "Equals";
    this.value = value;
  }

  notEquals(value) {
    this.operator = "NotEquals";
    this.value = value;
  }

  isLessThan(value) {
    this.operator = "IsLessThan";
    this.value = value;
  }

  isLessThanOrEquals(value) {
    this.operator = "IsLessThanOrEquals";
    this.value = value;
  }

  isGreaterThan(value) {
    this.operator = "IsGreaterThan";
    this.value = value;
  }

  isGreaterThanOrEquals(value) {
    this.operator = "IsGreaterThanOrEquals";
    this.value = value;
  }

  startsWith(value) {
    this.operator = "StartsWith";
    this.value = value;
  }

  contains(value) {
    this.operator = "Contains";
    this.value = value;
  }

  toString() {
    let operator = "=";

    switch (this.operator) {
      case "NotEquals":
        operator += "!";
        break;

      case "IsLessThan":
        operator += "<";
        break;

      case "IsLessThanOrEquals":
        operator += "[";
        break;

      case "IsGreaterThan":
        operator += ">";
        break;

      case "IsGreaterThanOrEqual":
        operator += "]";
        break;

      case "StartsWith":
        operator += "^";
        break;

      case "Contains":
        operator += "*";
        break;

      default:
        break;
    }

    const str = `${operator}${this.value}`;

    return str;
  }
}

export default QueryOperand;