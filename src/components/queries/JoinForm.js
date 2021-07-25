import React from "react";
import { Paper, Grid, Button } from "@material-ui/core";
import ForwardIcon from "@material-ui/icons/Forward";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import CollectionSelector from "./CollectionSelector";
import FieldsEntryForm from "./FieldsEntryForm";
import ConditionArgumentForm from "./ConditionArgumentForm";
import BinarySelector from "../BinarySelector";
import BooleanSelector from "../shared/BooleanSelector";
import Collapsible from "../shared/Collapsible";
import QueryJoin from "../../planetside/QueryJoin";
import QueryCondition from "../../planetside/QueryCondition";
import TextFormWithSave from "../shared/TextFormWithSave";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    borderStyle: "solid",
    borderColor: "#919cb930",
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
  inlineSelectItem: {
    marginTop: 4,
  },
}));

export default function JoinForm({
  joinData,
  depth,
  onDelete,
  onInfoChange,
  onAddArrayItem,
  onRemoveArrayItem,
  onChangeArrayItemWithId,
  onRemoveArrayItemWithId,
}) {
  const classes = useStyles();
  const maxDepth = 4;

  function handleDeleteJoin() {
    onDelete(joinData.id);
  }

  function handleChangeInfo(propertyName, value) {
    let ancestry = [joinData.id];
    onInfoChange(joinData.id, propertyName, value, ancestry);
  }

  function handleChildChangeInfo(targetId, propertyName, value, ancestry) {
    ancestry = [joinData.id, ...ancestry];
    onInfoChange(targetId, propertyName, value, ancestry);
  }

  function handleAddArrayItem(arrayName, item) {
    let ancestry = [joinData.id];
    onAddArrayItem(joinData.id, arrayName, item, ancestry);
  }

  function handleChildAddArrayItem(targetId, arrayName, item, ancestry) {
    ancestry = [joinData.id, ...ancestry];
    onAddArrayItem(targetId, arrayName, item, ancestry);
  }

  function handleRemoveArrayItem(arrayName, item) {
    let ancestry = [joinData.id];
    onRemoveArrayItem(joinData.id, arrayName, item, ancestry);
  }

  function handleChildRemoveArrayItem(targetId, arrayName, item, ancestry) {
    ancestry = [joinData.id, ...ancestry];
    onRemoveArrayItem(targetId, arrayName, item, ancestry);
  }

  function handleChangeArrayItemWithId(arrayName, itemId, propertyName, value) {
    let ancestry = [joinData.id];
    onChangeArrayItemWithId(
      joinData.id,
      arrayName,
      itemId,
      propertyName,
      value,
      ancestry
    );
  }

  function handleChildChangeArrayItemWithId(
    targetId,
    arrayName,
    itemId,
    propertyName,
    value,
    ancestry
  ) {
    ancestry = [joinData.id, ...ancestry];
    onChangeArrayItemWithId(
      targetId,
      arrayName,
      itemId,
      propertyName,
      value,
      ancestry
    );
  }

  function handleRemoveArrayItemWithId(arrayName, itemId) {
    let ancestry = [joinData.id];
    onRemoveArrayItemWithId(joinData.id, arrayName, itemId, ancestry);
  }

  function handleChildRemoveArrayItemWithId(
    targetId,
    arrayName,
    itemId,
    ancestry
  ) {
    ancestry = [joinData.id, ...ancestry];
    onRemoveArrayItemWithId(targetId, arrayName, itemId, ancestry);
  }

  function handleAddFilterField(value) {
    handleAddArrayItem("filterFields", value);
  }

  function handleRemoveFilterField(value) {
    handleRemoveArrayItem("filterFields", value);
  }

  function handleAddJoinTerm() {
    let newTerm = QueryCondition();
    handleAddArrayItem("terms", newTerm);
  }

  function handleRemoveJoinTerm(id) {
    handleRemoveArrayItemWithId("terms", id);
  }

  function handleAddSubJoin() {
    let newJoin = QueryJoin();
    handleAddArrayItem("joins", newJoin);
  }

  function handleRemoveSubJoin(id) {
    handleRemoveArrayItemWithId("joins", id);
  }

  const handleChangeCollection = (value) =>
    handleChangeInfo("collection", value);

  const handleChangeInjectAt = (value) => handleChangeInfo("injectAt", value);

  const handleChangeOnField = (value) => handleChangeInfo("onField", value);

  const handleChangeToField = (value) => handleChangeInfo("toField", value);

  const handleChangeJoinType = (value) =>
    handleChangeInfo("isOuterJoin", value);

  const handleChangeIsList = (value) => handleChangeInfo("isList", value);

  const handleChangeFilterType = (value) =>
    handleChangeInfo("filterType", value);

  const handleChangeTermInfo = (id, propertyName, value) =>
    handleChangeArrayItemWithId("terms", id, propertyName, value);

  const rootStyle = {
    borderWidth: depth === 0 ? 1 : "2px 0 0 1px",
    marginLeft: depth === 0 ? 0 : 8,
  };

  const showAddSubJoin = depth < maxDepth;
  const disableAddSubJoin = depth === maxDepth || !joinData.collection;

  return (
    <Paper className={classes.paper} style={{ ...rootStyle }}>
      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.gridRow}
        style={{ marginBottom: 0 }}
      >
        <Grid item xs={12} sm={8}>
          <CollectionSelector
            collection={joinData.collection}
            onChange={handleChangeCollection}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextFormWithSave
            label="Inject At"
            initValue={joinData.injectAt}
            onChange={handleChangeInjectAt}
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
          <TextFormWithSave
            label="On Field"
            initValue={joinData.onField}
            onChange={handleChangeOnField}
          />
        </Grid>

        <Grid item xs={2} style={{ textAlign: "center" }}>
          <ForwardIcon style={{ marginTop: 8 }} />
        </Grid>

        <Grid item xs={5}>
          <TextFormWithSave
            label="To Field"
            initValue={joinData.toField}
            onChange={handleChangeToField}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.gridRow}
      >
        <Grid item sm={6} md={4}>
          <BooleanSelector
            label="Join Type"
            value={joinData.isOuterJoin}
            trueLabel="Outer"
            falseLabel="Inner"
            onChange={handleChangeJoinType}
          />
        </Grid>

        <Grid item sm={6} md={4}>
          <BooleanSelector
            label="Is List"
            value={joinData.isList}
            onChange={handleChangeIsList}
          />
        </Grid>
      </Grid>

      <Collapsible
        id="join-conditions"
        headerLevel={3}
        headerText="Join Conditions"
        defaultExtended={true}
      >
        {joinData.terms.length > 0 && (
          <Grid
            item
            container
            xs={12}
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
            className={classes.gridRow}
          >
            {joinData.terms.map((condition) => {
              return (
                <ConditionArgumentForm
                  key={condition.id}
                  conditionData={condition}
                  onDataChange={handleChangeTermInfo}
                  onDelete={handleRemoveJoinTerm}
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
            onClick={handleAddJoinTerm}
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
              onChange={handleChangeFilterType}
              optionA="Show"
              optionB="Hide"
              value={joinData.filterType}
              className={classes.filterSelect}
            />
          </Grid>
          <FieldsEntryForm
            label="Add Field"
            fields={joinData.filterFields}
            onAddField={handleAddFilterField}
            onRemoveField={handleRemoveFilterField}
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
          style={{ textAlign: "right" }}
        >
          <Grid item md={6}>
            <Button
              color="default"
              startIcon={<DeleteIcon fontSize="small" />}
              size="small"
              onClick={handleDeleteJoin}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {joinData.joins.length > 0 && (
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          className={classes.gridRow}
        >
          {joinData.joins.map((join) => {
            return (
              <JoinForm
                key={join.id}
                joinData={join}
                depth={depth + 1}
                onDelete={handleRemoveSubJoin}
                onInfoChange={handleChildChangeInfo}
                onAddArrayItem={handleChildAddArrayItem}
                onRemoveArrayItem={handleChildRemoveArrayItem}
                onChangeArrayItemWithId={handleChildChangeArrayItemWithId}
                onRemoveArrayItemWithId={handleChildRemoveArrayItemWithId}
              />
            );
          })}
        </Grid>
      )}
    </Paper>
  );
}
