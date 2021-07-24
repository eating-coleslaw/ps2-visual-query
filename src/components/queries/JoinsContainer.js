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
  onJoinDataChange,
  onAddNewJoin,
  onDeleteJoin,
}) {
  const classes = useStyles();

  function handleAddNewJoin() {
    const newJoin = QueryJoin();

    onAddNewJoin(newJoin);
  }
  
  function handleDataChange(updatedJoin) {
    onJoinDataChange(updatedJoin);
  }

  function handleDeleteJoin(id) {
    onDeleteJoin(id);
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
              onChange={handleDataChange}
              onDelete={handleDeleteJoin}
            />
          );
        })}
      </Grid>

      <Grid item xs={12}>
        <Button
          color="primary"
          startIcon={<AddIcon fontSize="small" />}
          size="small"
          onClick={handleAddNewJoin}
          className={classes.textButton}
        >
          New Join
        </Button>
      </Grid>
    </React.Fragment>
  );
}
