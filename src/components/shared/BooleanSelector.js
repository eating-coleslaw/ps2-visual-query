import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";

export default function BooleanSelector({
  value,
  label,
  trueLabel = "Yes",
  falseLabel = "No",
  onChange,
  className = null,
}) {
  return (
    <FormControl variant="outlined" style={{ minWidth: 120 }}>
      <InputLabel htmlFor="boolean-select">{label}</InputLabel>
      <Select
        native
        margin="dense"
        label={label}
        className={className}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputProps={{
          name: "boolean-select",
          id: "boolean-select",
        }}
      >
        <option aria-label={trueLabel} value={true}>
          {trueLabel}
        </option>
        <option aria-label={falseLabel} value={false}>
          {falseLabel}
        </option>
      </Select>
    </FormControl>
  );
}
