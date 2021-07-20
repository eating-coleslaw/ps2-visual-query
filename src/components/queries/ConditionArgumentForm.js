import React, { useState } from 'react';

export default function ConditionArgumentForm({ conditionData, onFieldChange, onOperandChange, onValueChange }) {
  const [fieldInput, setFieldInput] = useState(conditionData?.field);
  const [operandInput, setOperandInput] = useState(conditionData?.operand);
  const [valueInput, setValueInput] = useState(conditionData?.value);


  return(
    <React.Fragment>

    </React.Fragment>
  );
}