import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
}));

export default function QueryUrlContainer({ queryUrl, isLoading, onRunQuery }) {
  const classes = useStyles();
  const theme = useTheme();
  const secondaryColor = theme.palette.secondary.main;
  const primaryColor = theme.palette.primary.main;

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

  const unescapedUrl = unescape(queryUrl);

  let queryUrlPieces = [];

  // let splitAtQueryArray = unescapedUrl.split("?c:");

  let splitAtQueryArray = unescapedUrl.split("?");

  const preQueryString = splitAtQueryArray[0];

  queryUrlPieces.push(<span key={preQueryString}>{preQueryString}</span>);
  
  if (splitAtQueryArray.length > 1) {
    queryUrlPieces.push(<span key="?" style={{ color: secondaryColor }}>?</span>);

    let queryString = splitAtQueryArray[1];

    let splitAtMod = queryString.split("c:");

    let splitAtAmpersand = splitAtMod.map((piece) => {
      return piece.split("&");
    });
    
    // let splitAtEquals = splitAtAmpersand.map((piece) => {
    //   return piece.split("=");
    // });

    console.log(splitAtMod);
    console.log(splitAtAmpersand);
    // console.log(splitAtEquals);

    splitAtMod.forEach((modItem) => {
      if (splitAtMod.indexOf(modItem) !== 0 && !!modItem) {
        queryUrlPieces.push(<span key={uuidv1()} style={{ color: secondaryColor }}>c:</span>);
      }      
      
      let splitAtAmpersand = modItem.split("&");
      
      // modItem.forEach((amperItem) => {
      //   if (modItem.indexOf(amperItem) !== 0) {
      //     queryUrlPieces.push(<span style={{ color: syntaxColor }}>&</span>);
      //   }

      splitAtAmpersand.forEach((amperItem) => {
        if (splitAtAmpersand.indexOf(amperItem) !== 0) {
          queryUrlPieces.push(<span key={uuidv1()}  style={{ color: secondaryColor }}>&</span>);
        }

        let splitAtEquals = amperItem.split("=");

        splitAtEquals.forEach((equalsItem) => {
          if (splitAtEquals.indexOf(equalsItem) !== 0) {
            // queryUrlPieces.push(<span key={uuidv1()} style={{ color: "#97EE91", fontWeight: 500 }}>=</span>);
            queryUrlPieces.push(<span key={uuidv1()} style={{ color: "#E752A1", fontWeight: 500 }}>=</span>);
            // queryUrlPieces.push(<span style={{ color: "#E752A1", fontWeight: 500 }}>=</span>)
            // queryUrlPieces.push(<span style={{ color: "#E7ADFB", fontWeight: 500 }}>=</span>)
            // queryUrlPieces.push(<span style={{ color: secondaryColor, fontWeight: 500 }}>=</span>)
          }
          
          let splitAtColon = equalsItem.split(":");
          
          splitAtColon.forEach((colonItem) => {
            if (splitAtColon.indexOf(colonItem) !== 0) {
              // queryUrlPieces.push(<span key={uuidv1()} style={{ color: "#97EE91", fontWeight: 500 }}>:</span>)
              queryUrlPieces.push(<span key={uuidv1()} style={{ color: "#E752A1", fontWeight: 500 }}>:</span>)
              // queryUrlPieces.push(<span style={{ color: "#E752A1", fontWeight: 500 }}>:</span>)
              // queryUrlPieces.push(<span style={{ color: "#E7ADFB", fontWeight: 500 }}>:</span>)
              // queryUrlPieces.push(<span style={{ color: secondaryColor, fontWeight: 500 }}>:</span>)
            }

            let splitAtOpenParen = colonItem.split("(");

            splitAtOpenParen.forEach((openParenItem) => {
              if (splitAtOpenParen.indexOf(openParenItem) !== 0) {
                queryUrlPieces.push(<span key={uuidv1()} style={{ color: "#50DFFE", fontWeight: 500 }}>(</span>)
                // queryUrlPieces.push(<span style={{ color: "#E752A1", fontWeight: 500 }}>:</span>)
                // queryUrlPieces.push(<span style={{ color: "#E7ADFB", fontWeight: 500 }}>:</span>)
                // queryUrlPieces.push(<span style={{ color: secondaryColor, fontWeight: 500 }}>:</span>)
              }

              let splitAtCloseParen = openParenItem.split(")");

              splitAtCloseParen.forEach((closeParenItem) => {
                if (splitAtCloseParen.indexOf(closeParenItem) !== 0) {
                  queryUrlPieces.push(<span key={uuidv1()}   style={{ color: "#50DFFE", fontWeight: 500 }}>)</span>)
                  // queryUrlPieces.push(<span style={{ color: "#E752A1", fontWeight: 500 }}>:</span>)
                  // queryUrlPieces.push(<span style={{ color: "#E7ADFB", fontWeight: 500 }}>:</span>)
                  // queryUrlPieces.push(<span style={{ color: secondaryColor, fontWeight: 500 }}>:</span>)
                }

                let splitAtUpperComman = closeParenItem.split("^");

                splitAtUpperComman.forEach((upperCommaItem) => {
                  if (splitAtUpperComman.indexOf(upperCommaItem) !== 0) {
                    queryUrlPieces.push(<span key={uuidv1()}   style={{ color: "#97EE91", fontWeight: 500 }}>^</span>)
                    // queryUrlPieces.push(<span style={{ color: "#E752A1", fontWeight: 500 }}>:</span>)
                    // queryUrlPieces.push(<span style={{ color: "#E7ADFB", fontWeight: 500 }}>:</span>)
                    // queryUrlPieces.push(<span style={{ color: secondaryColor, fontWeight: 500 }}>:</span>)
                  }
  
                  if (!!upperCommaItem) {
                    queryUrlPieces.push(<span key={uuidv1()}>{upperCommaItem}</span>);
                  }
                });

                // if (!!closeParenItem) {
                //   queryUrlPieces.push(<span key={uuidv1()}>{closeParenItem}</span>);
                // }
              });
            });
          });
        });

        // queryUrlPieces.push(<span>{amperItem}</span>);
      });
    });
  }
 
  // if (splitAtQueryArray.length === 1) {
  //   splitAtQueryArray = unescapedUrl.split("?");
  //   queryUrlPieces.push()
  // }

  // const preQueryString = splitAtQueryArray[0];

  // queryUrlPieces = [ preQueryString ];



  // const queryString = splitAtQueryArray[1];

  // let splitQueryArray = [];
  // if (!!queryString){
  //   queryUrlPieces.push(<span style={{ color: theme.palette.secondary.main }}>?c:</span>);

  //   // splitQueryArray = queryString.split("&c:");
  //   splitQueryArray = queryString.split("&");
  // }

  // // const splitUrlArray = queryUrl.split("&c:");
  // // console.log(splitUrlArray);

  // const queryElementsArray = splitQueryArray.map((piece) => {
  //   if (splitQueryArray.indexOf(piece) > 0) {
  //     return (
  //         <React.Fragment>
  //           <span style={{ color: theme.palette.secondary.main }}>&</span><span>{piece}</span>
  //           {/* <span style={{ color: theme.palette.secondary.main }}>&c:</span><span>{piece}</span> */}
  //       </React.Fragment>
  //     );
  //   } else {
  //       return (
  //         <span>{piece}</span>
  //       );
  //     }
  // });
  
  // if (queryElementsArray.length > 0) {
  //   queryUrlPieces = [ ...queryUrlPieces, ...queryElementsArray ];
  // }

  
  console.log(unescape(queryUrl));

  return (
    <Paper className={classes.paper}>
      <h1 className={classes.header1}>Query URL</h1>
      <div className={classes.urlBox}>
        {queryUrlPieces}
        {/* {unescape(queryUrl)} */}
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
