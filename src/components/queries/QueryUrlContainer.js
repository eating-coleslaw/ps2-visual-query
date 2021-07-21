import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  urlBox: {
    marginTop: theme.spacing(1),
    backgroundColor: "#303030",
    color: "#fff",
    fontFamily: "monospace",
    padding: theme.spacing(1),
    borderRadius: 4,
  },
}));

export default function QueryStringContainer({ queryUrl }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <h1>Query String</h1>
      <div className={classes.urlBox}>{queryUrl}</div>
    </Paper>
  );
}
