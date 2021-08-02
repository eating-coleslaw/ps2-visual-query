import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, Grid, Link } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AssignmentIcon from "@material-ui/icons/Assignment";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { v1 as uuidv1 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  header1: {
    margin: 0,
    fontSize: "1.4em",
    fontWeight: 500,
  },
  paper: {
    padding: theme.spacing(2),
  },
  urlBox: {
    marginTop: theme.spacing(1),
    backgroundColor: "#1F2330",
    color: "#fff",
    fontFamily: "monospace",
    padding: theme.spacing(1),
    borderRadius: 4,
    wordWrap: "anywhere",
    overflow: "auto",
  },
  container: {
    marginTop: theme.spacing(1),
  },
  gridItem: {
    marginRight: theme.spacing(2),
  },
  button: {},
  runButton: {
    width: 120,
  },
  runButtonIcon: {
    marginLeft: -8,
  },
  buttonWide: {
    whiteSpace: "nowrap",
  },
  syntax: {
    fontSize: "1rem",
  },
  questionMark: {
    color: "#F8C275",
  },
  ampersand: {
    color: "#F8C275",
  },
  queryDelimiter: {
    color: "#F8C275",
  },
  equals: {
    color: "#E752A1",
  },
  equalsModifier: {
    color: "#E752A1",
  },
  colon: {
    color: "#E752A1",
  },
  parentheses: {
    color: "#50DFFE",
  },
  comma: {
    color: "#97EE91",
  },
}));

export default function QueryUrlContainer({ queryUrl, isLoading, onRunQuery }) {
  const classes = useStyles();

  function copyToClipboardExact() {
    navigator.clipboard.writeText(unescape(queryUrl));
  }

  function copyToClipboardAnonymous() {
    const anonymousUrl = anonymizeQueryUrl(queryUrl);
    navigator.clipboard.writeText(unescape(anonymousUrl));
  }

  function anonymizeQueryUrl(url) {
    const regex = new RegExp("(/s:)[A-z0-9]+/");
    return queryUrl.replace(regex, "/s:example/");
  }

  const operatorCharacters = ["[", "]", "*", "!", "<", ">", "^"];

  let queryUrlPieces = [];
  
  const unescapedUrl = unescape(queryUrl);

  let splitAtQueryArray = unescapedUrl.split("?");

  const preQueryString = splitAtQueryArray[0];

  queryUrlPieces.push(<span key={preQueryString}>{preQueryString}</span>);
  
  if (splitAtQueryArray.length > 1) {
    queryUrlPieces.push(<span key="?" className={ classes.syntax + " " + classes.questionMark }>?</span>);

    let queryString = splitAtQueryArray[1];

    let splitAtMod = queryString.split("c:");

    splitAtMod.forEach((modItem) => {
      if (splitAtMod.indexOf(modItem) !== 0 && !!modItem) {
        queryUrlPieces.push(<span key={uuidv1()} className={ classes.queryDelimiter }>c:</span>);
      }      
      
      let splitAtAmpersand = modItem.split("&");

      splitAtAmpersand.forEach((amperItem) => {
        if (splitAtAmpersand.indexOf(amperItem) !== 0) {
          queryUrlPieces.push(<span key={uuidv1()} className={ classes.syntax + " " + classes.ampersand }>&</span>);
        }

        let splitAtEquals = amperItem.split("=");

        splitAtEquals.forEach((equalsItem) => {
          if (splitAtEquals.indexOf(equalsItem) !== 0) {
            queryUrlPieces.push(<span key={uuidv1()} className={ classes.syntax + " " + classes.equals }>=</span>);
          }

          const firstChar = equalsItem.charAt(0);
          if (operatorCharacters.includes(firstChar)) {
            queryUrlPieces.push(<span key={uuidv1()} className={ classes.syntax + " " + classes.equalsModifier }>{firstChar}</span>);
            equalsItem = equalsItem.substring(1);
          }
          
          let splitAtColon = equalsItem.split(":");
          
          splitAtColon.forEach((colonItem) => {
            if (splitAtColon.indexOf(colonItem) !== 0) {
              queryUrlPieces.push(<span key={uuidv1()} className={ classes.syntax + " " + classes.colon }>:</span>)
            }

            let splitAtOpenParen = colonItem.split("(");

            splitAtOpenParen.forEach((openParenItem) => {
              if (splitAtOpenParen.indexOf(openParenItem) !== 0) {
                queryUrlPieces.push(<span key={uuidv1()} className={ classes.syntax + " " + classes.parentheses }>(</span>)
              }

              let splitAtCloseParen = openParenItem.split(")");

              splitAtCloseParen.forEach((closeParenItem) => {
                if (splitAtCloseParen.indexOf(closeParenItem) !== 0) {
                  queryUrlPieces.push(<span key={uuidv1()} className={ classes.syntax + " " + classes.parentheses }>)</span>)
                }

                let splitAtUpperComman = closeParenItem.split("^");

                splitAtUpperComman.forEach((upperCommaItem) => {
                  if (splitAtUpperComman.indexOf(upperCommaItem) !== 0) {
                    queryUrlPieces.push(<span key={uuidv1()}  className={ classes.syntax + " " + classes.comma }>^</span>)
                  }
  
                  let splitAtComma = upperCommaItem.split(",");

                  splitAtComma.forEach((commaItem) => {
                    if (splitAtComma.indexOf(commaItem) !== 0) {
                      queryUrlPieces.push(<span key={uuidv1()} className={ classes.syntax + " " + classes.comma }>,</span>)
                    }
    
                    if (!!commaItem) {
                      queryUrlPieces.push(<span key={uuidv1()}>{commaItem}</span>);
                    }
                  });
                });
              });
            });
          });
        });
      });
    });
  }
  
  return (
    <Paper className={classes.paper}>
      <h1 className={classes.header1}>Query URL</h1>
      <div className={classes.urlBox}>
        {queryUrlPieces}
      </div>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        className={classes.container}
      >
        <Grid item className={classes.gridItem}>
          <Button
            color="primary"
            variant="contained"
            onClick={onRunQuery}
            value="Run"
            className={classes.runButton}
            startIcon={
              isLoading ? null : (
                <PlayArrowIcon className={classes.runButtonIcon} />
              )
            }
            title="Run the query"
          >
            {isLoading ? "Loading..." : "Run"}
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
