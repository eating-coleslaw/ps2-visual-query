import React, { useState } from "react";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, Grid, Paper } from "@material-ui/core";
import "../styles/App.css";
import ServiceKeyForm from "./ServiceKeyForm";
import { pink, amber } from "@material-ui/core/colors";

const dbgcensus = require("dbgcensus");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  header1: {
    margin: `0 0 ${theme.spacing(1)}px 0`,
  },
}));

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: "light", //prefersDarkMode ? "dark" : "light",
          primary: pink,
          secondary: amber,
        },
        contrastThreshold: 5,
      }),
    [prefersDarkMode]
  );

  dbgcensus.SetGlobalNamespace("ps2:v2");

  const [serviceKey, setServiceKey] = useState("example");

  function onServiceKeyChange(key) {
    // const value = e.target.value;

    const value = key;

    dbgcensus.SetGlobalServiceKey(value);

    setServiceKey(value);

    console.log(value);
  }

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Grid container className={classes.grid}>
          <Grid item xs={12} sm={6} className={classes.grid}>
            <Paper className={classes.paper}>
              <h1 className={classes.header1}>Query Creator</h1>
              <ServiceKeyForm onServiceKeyChange={onServiceKeyChange} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} className={classes.grid}>
              <Paper className={classes.paper}>
                <h1 className={classes.header1}>Query String</h1>
              </Paper>
            </Grid>
            <Grid item xs={12} className={classes.grid}>
              <Paper className={classes.paper}>
                <h1 className={classes.header1}>Query Results</h1>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
