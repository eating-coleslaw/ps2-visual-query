import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress, Paper, Grid, Button } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";

const useStyles = makeStyles((theme) => ({
  headerButtonContainer: {
    textAlign: "right",
  },
  header1: {
    margin: 0,
    fontSize: "1.4em",
    fontWeight: 500,
  },
  paper: {
    padding: theme.spacing(2),
  },
  jsonView: {
    maxHeight: "600px",
    overflow: "auto",
    lineHeight: "1.1",
    marginTop: theme.spacing(1),
  },
  textView: {
    maxHeight: "600px",
    overflow: "auto",
    lineHeight: "1.1",
    marginTop: theme.spacing(1),
  },
  linearProgres: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function QueryResults({ data, isLoading }) {
  const classes = useStyles();

  function copyDataToClipboard() {
    if (!!data) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    }
  }

  if (isLoading) {
    return (
      <Paper className={classes.paper}>
        <h1>Query Results</h1>
        <LinearProgress className={classes.linearProgres} />
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={8}>
          <h1 className={classes.header1}>Query Results</h1>
        </Grid>
        <Grid item xs={4} className={classes.headerButtonContainer}>
          {!!data && (
            <Button
              color="primary"
              onClick={copyDataToClipboard}
              value="Copy"
              title="Copy the query results to the clipboard"
              startIcon={<AssignmentIcon />}
            >
              Copy
            </Button>
          )}
        </Grid>
      </Grid>
      {!!data ? (
        <div className={classes.textView}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : null}
    </Paper>
  );
}
