import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    margin: 0,
    fontSize: "1.4em",
    fontWeight: 500,
  },
  subHeader: {
    margin: 0,
    fontSize: "1.05em",
    fontWeight: 400,
    color: theme.palette.secondary.main,
    lineHeight: "1.1",
    marginTop: theme.spacing(0.5),
  },
}));

export default function QueryCreatorHeader({ queryName }) {
  const classes = useStyles();

  const title = !!queryName ? queryName : "Query Creator";

  return (
    <Grid item container xs={7} sm={7} md={7} justifyContent="flex-start">
      {queryName === "" && (
        <h1 className={classes.header} title="Query Creator">
          Query Creator
        </h1>
      )}

      {!!queryName && (
        <div>
          <h1 className={classes.header} title="Query Creator">
            Query Creator
          </h1>
          <h2 className={classes.subHeader} title={title}>
            {title}
          </h2>
        </div>
      )}
    </Grid>
  );
}
