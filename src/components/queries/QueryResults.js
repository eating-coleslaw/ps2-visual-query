import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress, Paper } from "@material-ui/core";
import ReactJson from "react-json-view";

const useStyles = makeStyles((theme) => ({
  header1: {
    margin: 0,
    fontSize: "1.4em",
    color: theme.palette.text.primary,
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
}));

export default function QueryResults({ data, isLoading }) {
  const classes = useStyles();

  if (isLoading) {
    return (
      <Paper className={classes.paper}>
        <h1>Query Results</h1>
        <LinearProgress />
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <h1>Query Results</h1>
      {!!data ? (
        <div style={{
            maxHeight: "600px",
            overflow: "auto",
            lineHeight: "1.1",
            marginTop: 8,
          }}><pre>{JSON.stringify(data, null, 2)}</pre></div>
        /*{/* <ReactJson
          src={data}
          enableDelete={true}
          iconStyle="circle"
          displayObjectSize={false}
          displayDataTypes={false}
          style={{
            maxHeight: "600px",
            overflow: "auto",
            lineHeight: "1.1",
            marginTop: 8,
          }}
        /> }*/
      ) : null}
    </Paper>
  );
}
