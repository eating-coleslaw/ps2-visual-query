import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, Grid, Link } from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AssignmentIcon from '@material-ui/icons/Assignment';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

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
    // marginTop: theme.spacing(2),
  },
  runButton: {
    width: 120,
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
      <h1 className={classes.header1}>Query String</h1>
      <div className={classes.urlBox}>{queryUrl}</div>
      <Grid container justifyContent="flex-start" alignItems="center" spacing={1} className={classes.container}>

        <Grid item className={classes.gridItem}>
          <Button
            color="primary"
            variant="contained"
            onClick={onRunQuery}
            value="Run"
            className={classes.runButton}
            startIcon={isLoading ? null : <PlayArrowIcon />}
            title="Run the query"
          >
            {isLoading ? "Loading..." : "Run" }
          </Button>
        </Grid>

        <Grid item className={classes.gridItem}>
          <Button
              color="primary"
              variant="outlined"
              onClick={copyToClipboardExact}
              value="Copy"
              className={classes.button}
              title="Copy the query url to the clipboard"
              startIcon={<AssignmentIcon />}
            >
              Copy
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
        
        <Grid item className={classes.gridItem}>
          <Link to={queryUrl} href={queryUrl} target="_blank" rel="noreferrer">
            <Button
                color="primary"
                variant="outlined"
                value="Open Query"
                className={classes.buttonWide}
                title="Open the query URL in a new tab"
                startIcon={<OpenInNewIcon />}
              >
                Open
              </Button>
          </Link>
        </Grid>

      </Grid>
    </Paper>
  );
}
