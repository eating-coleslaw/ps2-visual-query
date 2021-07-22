import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";

export default function BinarySelector({
  value,
  label,
  optionA,
  optionB,
  onChange,
  className = null,
}) {
  return (
    <FormControl variant="outlined" style={{ minWidth: 120 }}>
      <InputLabel htmlFor="binary-select">{label}</InputLabel>
      <Select
        native
        margin="dense"
        label={label}
        className={className}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputProps={{
          name: "binary-select",
          id: "binary-select",
        }}
      >
        <option aria-label={optionA} value={optionA.toLowerCase()}>
          {optionA}
        </option>
        <option aria-label={optionB} value={optionB.toLowerCase()}>
          {optionB}
        </option>
      </Select>
    </FormControl>
  );
}
