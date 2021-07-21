import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, Grid } from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AssignmentIcon from '@material-ui/icons/Assignment';

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
  container: {
    marginTop: theme.spacing(1),
  },
  gridItem: {
    marginRight: theme.spacing(2),
  },
  button: {
    width: 140,
    // marginTop: theme.spacing(2),
  },
  buttonWide: {
    // marginTop: theme.spacing(2),
    whiteSpace: 'nowrap',
  },
}));

export default function QueryUrlContainer({ queryUrl, isLoading, onRunQuery }) {
  const classes = useStyles();

  function copyToClipboardExact() {
    navigator.clipboard.writeText(queryUrl);
  }
  
  function copyToClipboardAnonymous() {
    const anonymousUrl = anonymizeQueryUrl(queryUrl);
    navigator.clipboard.writeText(anonymousUrl);
  }
  
  function anonymizeQueryUrl(url) {
    const regex = new RegExp('(/s:)[A-z0-9]+/');
    return queryUrl.replace(regex, '/s:example/');
  }

  return (
    <Paper className={classes.paper}>
      <h1>Query String</h1>
      <div className={classes.urlBox}>{queryUrl}</div>
      <Grid container justifyContent="flex-start" alignItems="center" spacing={1} className={classes.container}>

        <Grid item className={classes.gridItem}>
          <Button
            color="primary"
            variant="contained"
            onClick={onRunQuery}
            value="Run Query"
            className={classes.button}
            startIcon={<PlayArrowIcon />}
            title="Run the query"
          >
            {isLoading ? "Loading..." : "Run Query" }
          </Button>
        </Grid>

        <Grid item className={classes.gridItem}>
          <Button
              color="primary"
              variant="outlined"
              onClick={copyToClipboardExact}
              value="Copy Exact"
              className={classes.button}
              title="Copy the query url to the clipboard"
              startIcon={<AssignmentIcon />}
            >
              Copy Exact
            </Button>
        </Grid>
        
        <Grid item className={classes.gridItem}>
          <Button
              color="primary"
              variant="outlined"
              onClick={copyToClipboardAnonymous}
              value="Copy Anonymous"
              className={classes.buttonWide}
              title="Copy the query url to the clipboard and replace your service ID with 'example'"
              startIcon={<AssignmentIcon />}
            >
              Copy Anon.
            </Button>
        </Grid>

      </Grid>
    </Paper>
  );
}
