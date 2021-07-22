import React from "react";
import {
  Container,
  Grid,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import JoinForm from "./JoinForm";
import { v4 as uuidv4 } from "uuid";

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
  depth,
}) {
  const classes = useStyles();

  function handleAddNewJoin() {
    const newJoin = {
      id: uuidv4(),
      parentId: null,
      collection: "",
      isList: false, //0 if joined data is not a list, 1 if it is a list. Defaults to 0- not a list.
      filterType: "show",
      filterFields: [],
      injectAt: "",
      terms: [], // aka Conditions
      isOuterJoin: false,
      joins: [],
      onField: "",
      toField: "",
    };

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
