import React, { useEffect, useState } from "react";
import QueryEnums from "../../planetside/QueryEnums";
import {
  InputLabel,
  FormControl,
  Select,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

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

export default function ConditionArgumentForm({
  conditionData,
  onDataChange,
  onDelete,
}) {
  const classes = useStyles();

  const [field, setField] = useState(conditionData.field);
  const [value, setValue] = useState(conditionData.value);

  const [operators, setOperators] = useState([]);
  useEffect(() => {
    setOperators(QueryEnums.Operators);
  }, []);

  const operatorItems = operators.map((o) => (
    <option key={o.name} value={o.value} title={o.title}>
      {o.display}
    </option>
  ));

  function isValidInput(value) {
    return value !== "";
  }

  function handleOperatorChange(event) {
    const value = event.target.value;
    const operator = operators.find((o) => o.value === value);
    onDataChange(conditionData.id, "operator", operator);
  }

  function onSubmitField(event) {
    event.preventDefault();
    onDataChange(conditionData.id, "field", field);
  }

  function onSubmitValue(event) {
    event.preventDefault();
    onDataChange(conditionData.id, "value", value);
  }

  function handleDeleteCondition() {
    onDelete(conditionData.id);
  }

  return (
    <React.Fragment>
      <Grid item xs={12} md={4}>
        <form noValidate autoComplete="off" onSubmit={onSubmitField}>
          <TextField
            id="condition-field"
            label="Field"
            margin="dense"
            variant="outlined"
            name="condition-field"
            size="small"
            onChange={(e) => setField(e.target.value)}
            value={field}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    variant="outlined"
                    color="primary"
                    disabled={
                      !isValidInput(field) || field === conditionData.field
                    }
                    aria-label="Update the condition's field"
                    className={classes.button}
                  >
                    <SaveIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Grid>
      <Grid item xs={3} md={3} className={classes.operatorGrid}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="operator-select">Operator</InputLabel>
          <Select
            native
            margin="dense"
            label="Operator"
            value={conditionData.operator.value}
            onChange={handleOperatorChange}
            inputProps={{
              name: "operator",
              id: "operator-select",
            }}
          >
            {operatorItems}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={8} md={4}>
        <form noValidate autoComplete="off" onSubmit={onSubmitValue}>
          <TextField
            id="condition-value"
            label="Value"
            margin="dense"
            variant="outlined"
            name="condition-value"
            size="small"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    variant="outlined"
                    color="primary"
                    disabled={
                      !isValidInput(value) || value === conditionData.value
                    }
                    aria-label="Update the condition's filter value"
                    className={classes.button}
                  >
                    <SaveIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Grid>
      <Grid item xs={1} md={1}>
        <IconButton
          aria-label="Delete this query condition"
          title="Delete this query condition"
          onClick={handleDeleteCondition}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Grid>
    </React.Fragment>
  );
}
