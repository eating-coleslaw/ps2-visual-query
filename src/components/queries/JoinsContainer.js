import React from "react";
import { Grid, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import JoinForm from "./JoinForm";
import QueryJoin from "../../planetside/QueryJoin";

const useStyles = makeStyles((theme) => ({
  gridRow: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  textButton: {
    marginTop: -4,
    marginBottom: theme.spacing(1),
  },
}));

export default function JoinsContainer({
  joinsData,
  onAddJoin,
  onDeleteJoin,
  onInfoChange,
  onAddArrayItem,
  onRemoveArrayItem,
  onChangeArrayItemWithId,
  onRemoveArrayItemWithId,
}) {
  const classes = useStyles();

  function handleAddJoin() {
    const newJoin = QueryJoin();
    onAddJoin(newJoin);
  }

  function handleDeleteJoin(id) {
    onDeleteJoin(id);
  }

  function handleChangeInfo(targetId, propertyName, value, ancestry) {
    onInfoChange(targetId, propertyName, value, ancestry);
  }

  function handleAddArrayItem(targetId, arrayName, item, ancestry) {
    onAddArrayItem(targetId, arrayName, item, ancestry);
  }

  function handleRemoveArrayItem(targetId, arrayName, item, ancestry) {
    onRemoveArrayItem(targetId, arrayName, item, ancestry);
  }

  function handleChangeArrayItemWithId(
    targetId,
    arrayName,
    itemId,
    propertyName,
    value,
    ancestry
  ) {
    onChangeArrayItemWithId(
      targetId,
      arrayName,
      itemId,
      propertyName,
      value,
      ancestry
    );
  }

  function handleRemoveArrayItemWithId(targetId, arrayName, itemId, ancestry) {
    onRemoveArrayItemWithId(targetId, arrayName, itemId, ancestry);
  }

  return (
    <React.Fragment>
      <Grid
        item
        container
        xs={12}
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        className={classes.gridRow}
      >
        {joinsData.map((join) => {
          return (
            <JoinForm
              key={join.id}
              joinData={join}
              depth={0}
              onDelete={handleDeleteJoin}
              onInfoChange={handleChangeInfo}
              onAddArrayItem={handleAddArrayItem}
              onRemoveArrayItem={handleRemoveArrayItem}
              onChangeArrayItemWithId={handleChangeArrayItemWithId}
              onRemoveArrayItemWithId={handleRemoveArrayItemWithId}
            />
          );
        })}
      </Grid>

      <Grid item xs={12}>
        <Button
          color="primary"
          startIcon={<AddIcon fontSize="small" />}
          size="small"
          onClick={handleAddJoin}
          className={classes.textButton}
        >
          New Join
        </Button>
      </Grid>
    </React.Fragment>
  );
}
