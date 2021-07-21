import React, { useEffect, useState } from "react";
import QueryEnums from "../../planetside/QueryEnums";
import {
  InputLabel,
  FormControl,
  Select,
  TextField,
  Grid,
  IconButton,
  InputAdornment
} from "@material-ui/core";
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

export default function ConditionArgumentForm({
  conditionData,
  onFieldChange,
  onOperatorChange,
  onValueChange,
}) {
  const classes = useStyles();

  const [field, setField] = useState(conditionData.field);
  const [operatorValue, setOperatorValue] = useState(conditionData.operator.value);
  const [value, setValue] = useState(conditionData.value);

  // const [condition, setCondition] = useState({
  //   field: conditionData.field,
  //   operator: conditionData.operator.value,
  //   value: conditionData.value,
  // })

  const [operators, setOperators] = useState([]);
  useEffect(() => {
    setOperators(QueryEnums.Operators);
  }, []);

  const operatorItems = operators.map((o) => (
    <option key={o.name} value={o.value} title={o.title}>
      {o.display}
    </option>
  ));

  function handleFieldChange(event) {
    const value = event.target.value;
    onFieldChange(value);
  }

  function isValidInput(value) {
    return value !== "";
  }

  function handleOperatorChange(event) {
    const value = event.target.value;
    const operator = operators.find((o) => o.value === value);
    console.log(operator);
    onOperatorChange(operator);
  }

  function handleValueChange(event) {
    const value = event.target.value;
    onValueChange(value);
  }

  function handleSaveCondition() {
    
  }

  function onSubmitField(event) {
    event.preventDefault();
    onFieldChange(field);
  }

  function onSubmitValue(event) {
    event.preventDefault();
    onValueChange(value);
  }

  return (
    <React.Fragment>
      <Grid item xs={12} md={4}>
        {/* <TextField
          id="condition-field"
          label="Condition Field"
          margin="dense"
          variant="outlined"
          name="condition-field"
          onChange={handleFieldChange}
          value={conditionData.field}
        /> */}
        <form noValidate autoComplete="off" onSubmit={onSubmitField}>
          <TextField
            id="condition-field"
            label="Condition Field"
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
                    disabled={!isValidInput(field) || (field === conditionData.field)}
                    aria-label="Update the condition's field"
                    className={classes.button}
                  >
                    <SaveIcon fontSize="small"/>
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
        {/* <TextField
          id="condition-value"
          label="Condition value"
          margin="dense"
          variant="outlined"
          name="condition-value"
          onChange={handleValueChange}
          value={conditionData.value}
        /> */}
        <form noValidate autoComplete="off" onSubmit={onSubmitValue}>
          <TextField
            id="condition-value"
            label="Condition Value"
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
                    disabled={!isValidInput(value) || (value === conditionData.value)}
                    aria-label="Update the condition's filter value"
                    className={classes.button}
                  >
                    <SaveIcon fontSize="small"/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Grid>
      {/* <Grid item xs={1} md={1}>
        <IconButton aria-label="Save query condition" onClick={handleSaveCondition} color="primary" >
          <SaveIcon fontSize="small"/>
        </IconButton>
      </Grid> */}
    </React.Fragment>
  );
}
