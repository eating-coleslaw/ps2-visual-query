import React, { useState } from "react";
import {
  Paper,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import ForwardIcon from "@material-ui/icons/Forward";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import CollectionSelector from "./CollectionSelector";
import FieldsEntryForm from "./FieldsEntryForm";
import ConditionArgumentForm from "./ConditionArgumentForm";
import BinarySelector from "../BinarySelector";
import BooleanSelector from "../shared/BooleanSelector";
import Collapsible from "../shared/Collapsible";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    borderStyle: "solid",
    borderColor: "#919cb930",
    // border: "1px solid #919cb930",
    width: "100%",
  },
  gridRow: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  textButton: {
    marginTop: -4,
    marginBottom: theme.spacing(1),
  },
  footer: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
}));

export default function JoinForm({ joinData, depth, onChange, onDelete }) {
  const classes = useStyles();
  const maxDepth = 4;

  const [joinChanges, setJoinChanges] = useState(joinData);

  function handleFormSubmit(event) {
    event.preventDefault();
    handleSaveChanges();
  }

  function handleSaveChanges() {
    //event) {
    // event.preventDefault();
    onChange(joinChanges);
  }

  function handleDeleteJoin() {
    onDelete(joinData.id);
  }

  function handleSimplePropertyChange(propertyName, value) {
    setJoinChanges({
      ...joinData,
      ...joinChanges,
      ...{ [propertyName]: value },
    });
  }

  function handleSubJoinDataChange(updatedJoin) {
    const updatedJoins = joinChanges.joins.map((join) => {
      if (join.id === updatedJoin.id) {
        return updatedJoin;
      }

      return join;
    });

    handleSimplePropertyChange("joins", updatedJoins);

    handleSaveChanges();
  }

  function handleCollectionChange(value) {
    if (!!value) {
      handleSimplePropertyChange("collection", value);
    }
  }

  function handleOnFieldChange(event) {
    const value = event.target.value;
    handleSimplePropertyChange("onField", value);
  }

  function handleToFieldChange(event) {
    const value = event.target.value;
    handleSimplePropertyChange("toField", value);
  }

  function handleAddSubJoin() {
    if (depth === maxDepth) {
      throw new Error("Can't add new sub-join. Max join depth already reached");
    }

    const newJoin = {
      id: uuidv4(),
      parentId: joinData.id,
      collection: "",
      injectAt: "",
      isOuterJoin: false,
      isList: false, //0 if joined data is not a list, 1 if it is a list. Defaults to 0- not a list.
      onField: "",
      toField: "",
      filterType: "show",
      filterFields: [],
      terms: [], // aka Conditions
      joins: [],
    };

    const updatedJoins = [...joinChanges.joins, newJoin];

    handleSimplePropertyChange("joins", updatedJoins);

    handleSaveChanges();
  }

  function handleDeleteSubJoin(id) {
    const updatedJoins = joinChanges.joins.filter((join) => {
      return join.id !== id;
    });

    setJoinChanges({ ...joinChanges, ...{ joins: updatedJoins } });

    handleSaveChanges();
  }

  function handleAddNewTerm() {
    const newTerm = {
      id: uuidv4(),
      field: "",
      value: "",
      operator: {
        display: "=",
        name: "equals",
        title: "Equals",
        value: "=",
      },
    };

    const updatedTerms = [...joinChanges.terms, newTerm];

    handleSimplePropertyChange("terms", updatedTerms);
  }

  function handleTermDataChange(id, propertyName, propertyValue) {
    const updatedTerms = joinChanges.terms.map((term) => {
      if (term.id === id) {
        term[propertyName] = propertyValue;
      }

      return term;
    });

    handleSimplePropertyChange("terms", updatedTerms);
  }

  function onDeleteTerm(id) {
    const updatedTerms = joinChanges.terms.filter((term) => {
      return term.id !== id;
    });

    handleSimplePropertyChange("terms", updatedTerms);

    handleSaveChanges();
  }

  function onAddSimpleArrayValue(arrayPropertyName, value) {
    const array = [...joinChanges[arrayPropertyName]];

    if (value !== "" && !array.includes(value)) {
      let updatedFields = array;
      updatedFields.push(value);

      handleSimplePropertyChange(arrayPropertyName, updatedFields);
    }
  }

  function onRemoveSimpleArrayValue(arrayPropertyName, value) {
    const array = [...joinChanges[arrayPropertyName]];

    const index = array.indexOf(value);

    if (index !== -1) {
      let updatedFields = array;
      updatedFields.splice(index, 1);
      handleSimplePropertyChange(arrayPropertyName, updatedFields);
    }

    handleSaveChanges();
  }

  const rootStyle = {
    borderWidth: depth === 0 ? 1 : "0 0 0 1px",
    marginLeft: depth * 4,
  };

  const showAddSubJoin = depth < maxDepth;
  const disableAddSubJoin = depth === maxDepth || !joinChanges.collection;

  return (
    <Paper className={classes.paper} style={{ ...rootStyle }}>
      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.gridRow}
      >
        <Grid item xs={12} sm={8}>
          <CollectionSelector
            collection={joinChanges.collection}
            onChange={handleCollectionChange}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            id="inject-at"
            label="Inject At"
            margin="dense"
            variant="outlined"
            name="inject-at"
            onChange={(event) =>
              handleSimplePropertyChange("injectAt", event.target.value)
            }
            value={joinChanges.injectAt}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.gridRow}
      >
        <Grid item xs={5}>
          <TextField
            id="join-on-field"
            label="On Field"
            margin="dense"
            variant="outlined"
            name="join-on-field"
            onChange={handleOnFieldChange}
            value={joinChanges.onField}
          />
        </Grid>

        <Grid item xs={2} style={{ textAlign: "center" }}>
          <ForwardIcon style={{ marginTop: 8 }} />
        </Grid>

        <Grid item xs={5}>
          <TextField
            id="join-to-field"
            label="To Field"
            margin="dense"
            variant="outlined"
            name="join-to-field"
            onChange={handleToFieldChange}
            value={joinChanges.toField}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.gridRow}
      >
        <Grid item xs={6} sm={3}>
          <BooleanSelector
            label="Join Type"
            value={joinChanges.isOuterJoin}
            trueLabel="Outer"
            falseLabel="Inner"
            onChange={(value) =>
              handleSimplePropertyChange("isOuterJoin", value)
            }
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <BooleanSelector
            label="Is List"
            value={joinChanges.isList}
            onChange={(value) => handleSimplePropertyChange("isList", value)}
          />
        </Grid>
      </Grid>

      <Collapsible
        id="join-conditions"
        headerLevel={3}
        headerText="Join Conditions"
        defaultExtended={true}
      >
        {joinChanges.terms.length > 0 && (
          <Grid
            item
            container
            xs={12}
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
            className={classes.gridRow}
          >
            {joinChanges.terms.map((condition) => {
              return (
                <ConditionArgumentForm
                  key={condition.id}
                  conditionData={condition}
                  onDataChange={handleTermDataChange}
                  onDelete={onDeleteTerm}
                />
              );
            })}
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            color="primary"
            startIcon={<AddIcon fontSize="small" />}
            size="small"
            onClick={handleAddNewTerm}
            className={classes.textButton}
          >
            New Condition
          </Button>
        </Grid>
      </Collapsible>

      <Collapsible
        id="field-filters"
        headerLevel={3}
        headerText="Filter Displayed Fields"
        defaultExtended={true}
      >
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          className={classes.gridRow}
        >
          <Grid item xs={12} sm={6} md={3} className={classes.inlineSelectItem}>
            <BinarySelector
              label="Filter Type"
              onChange={(value) =>
                handleSimplePropertyChange("filterType", value)
              }
              optionA="Show"
              optionB="Hide"
              value={joinChanges.filterType}
              className={classes.filterSelect}
            />
          </Grid>
          <FieldsEntryForm
            label="Add Field"
            fields={joinChanges.filterFields}
            onAddField={(value) => onAddSimpleArrayValue("filterFields", value)}
            onRemoveField={(value) =>
              onRemoveSimpleArrayValue("filterFields", value)
            }
          />
        </Grid>
      </Collapsible>

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="flex-start"
        className={classes.footer}
      >
        <Grid
          item
          container
          xs={6}
          alignItems="center"
          justifyContent="flex-start"
        >
          {showAddSubJoin && (
            <Grid item>
              <Button
                disabled={disableAddSubJoin}
                color="primary"
                startIcon={<AddIcon fontSize="small" />}
                size="small"
                onClick={handleAddSubJoin}
              >
                Sub Join
              </Button>
            </Grid>
          )}
        </Grid>

        <Grid
          item
          container
          xs={6}
          spacing={2}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid item>
            <Button
              color="default"
              startIcon={<DeleteIcon fontSize="small" />}
              size="small"
              onClick={handleDeleteJoin}
            >
              Delete
            </Button>
          </Grid>

          <Grid item>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<SaveIcon fontSize="small" />}
              size="small"
              onClick={handleSaveChanges}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {joinChanges.joins.length > 0 && (
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          className={classes.gridRow}
        >
          {joinChanges.joins.map((join) => {
            return (
              <JoinForm
                key={join.id}
                depth={depth + 1}
                joinData={join}
                // onAddNewJoin={handleAddSubJoin}
                onChange={handleSubJoinDataChange}
                onDelete={handleDeleteSubJoin}
              />
            );
          })}
        </Grid>
      )}
    </Paper>
  );
}
