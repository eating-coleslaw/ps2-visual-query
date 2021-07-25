import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  fieldGridItem: {
    marginTop: theme.spacing(1),
    marginBottom: 4,
    marginLeft: theme.spacing(1),
  },
  operatorGrid: {
    marginTop: 4,
  },
  button: {
    margin: 0,
    padding: 0,
  },
}));

export default function TextFormWithSave({
  label,
  initValue,
  onChange,
  placeholder = "",
  variant = "outlined",
  ariaLabel = "",
}) {
  const classes = useStyles();

  const [value, setValue] = useState(initValue);

  function isValidInput(value) {
    return value !== "";
  }

  function onSubmit(event) {
    event.preventDefault();
    onChange(value);
  }

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <TextField
        id={`${label}-field`}
        label={label}
        margin="dense"
        variant={variant}
        name={`${label}-field`}
        size="small"
        onChange={(event) => setValue(event.target.value)}
        value={value}
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!isValidInput(value) || value === initValue}
                aria-label={ariaLabel}
                className={classes.button}
              >
                <SaveIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
