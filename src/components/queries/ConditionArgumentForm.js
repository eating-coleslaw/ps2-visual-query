import React, { useEffect, useState } from "react";
import QueryEnums from "../../planetside/QueryEnums";
import {
  InputLabel,
  FormControl,
  Select,
  Grid,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import TextFormWithSave from "../shared/TextFormWithSave";

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

  const [operators, setOperators] = useState([]);
  useEffect(() => {
    setOperators(QueryEnums.Operators);
  }, []);

  function handleOperatorChange(event) {
    const value = event.target.value;
    const operator = operators.find((o) => o.name === value);
    onDataChange(conditionData.id, "operator", operator);
  }

  function onSubmitField(newValue) {
    onDataChange(conditionData.id, "field", newValue);
  }

  function onSubmitValue(newValue) {
    onDataChange(conditionData.id, "value", newValue);
  }

  function handleDeleteCondition() {
    onDelete(conditionData.id);
  }

  return (
    <React.Fragment>
      <Grid item xs={12} md={4}>
        <TextFormWithSave
          label="Field"
          initValue={conditionData.field}
          onChange={onSubmitField}
          ariaLabel="Update the condition's field"
        />
      </Grid>

      <Grid item xs={3} md={3} className={classes.operatorGrid}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="operator-select">Operator</InputLabel>
          <Select
            native
            margin="dense"
            label="Operator"
            value={conditionData.operator.name}
            onChange={handleOperatorChange}
            inputProps={{
              name: "operator",
              id: "operator-select",
            }}
          >
            <option key="equals" value="equals" title="Equals">
              {"="}
            </option>
            <option key="notEquals" value="notEquals" title="Not Equals">
              {"≠"}
            </option>
            <option key="isLessThan" value="isLessThan" title="Is Less Than">
              {"<"}
            </option>
            <option
              key="isLessThanOrEquals"
              value="isLessThanOrEquals"
              title="Is Less Than Or Equals"
            >
              {"≤"}
            </option>
            <option
              key="isGreaterThan"
              value="isGreaterThan"
              title="Is Greater Than"
            >
              {">"}
            </option>
            <option
              key="isGreaterThanOrEquals"
              value="isGreaterThanOrEquals"
              title="Is Greater Than Or Equals"
            >
              {"≥"}
            </option>
            <option key="startsWith" value="startsWith">
              Starts With
            </option>
            <option key="contains" value="contains">
              Contains
            </option>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={8} md={4}>
        <TextFormWithSave
          label="Value"
          initValue={conditionData.value}
          onChange={onSubmitValue}
          ariaLabel="Update the condition's value"
        />
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
