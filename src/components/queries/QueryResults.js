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
  textView: {
    maxHeight: "600px",
    overflow: "auto",
    lineHeight: "1.1",
    marginTop: theme.spacing(1),
  },
  linearProgres: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

export default function QueryResults({ data, isLoading }) {
  const classes = useStyles();

  if (isLoading) {
    return (
      <Paper className={classes.paper}>
        <h1>Query Results</h1>
        <LinearProgress className={classes.linearProgres}/>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <h1 className={classes.header1}>Query Results</h1>
      {!!data ? (
        <div className={classes.textView}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
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