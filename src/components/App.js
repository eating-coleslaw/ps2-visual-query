import React, { useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, Grid, Paper, Button } from "@material-ui/core";
import "../styles/App.css";
import ServiceKeyForm from "./queries/ServiceKeyForm";
import { pink, amber } from "@material-ui/core/colors";
import CollectionSelector from "./queries/CollectionSelector";
import QueryConfig from "../planetside/QueryConfig";

const CensusQuery = require("dbgcensus").Query;
const dbgcensus = require("dbgcensus");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    "margin-top": theme.spacing(3),
  },
  gridContainer: {
    padding: theme.spacing(2),
  },
  gridItem: {
    "padding-bottom": theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  header1: {
    margin: `0 0 ${theme.spacing(1)}px 0`,
  },
}));

function App() {
  // const [queryClass, setQueryClass] = useState(new QueryConfig("character"));

  const [serviceKey, setServiceKey] = useState("example");
  const [namespace, setNamespace] = useState("ps2:v2");
  const [collection, setCollection] = useState("character");

  const [query, setQuery] = useState({
    serviceKey: "example",
    namespace: "ps2:v2",
    collection: "character",
    language: null,
    conditions: [],
    limit: null,
    start: null,
    show: [],
    hide: [],
    resolves: [],
    joins: [],
    trees: [],
    lang: null,
  });

  // const [queryUrl, setQueryUrl] = useState(query.convertToCensusQuery().toUrl());
  const [queryUrl, setQueryUrl] = useState("");

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

  // const [serviceKey, setServiceKey] = useState("example");

  function onServiceKeyChange(key) {
    const value = key;

    const updatedValue = {
      serviceKey: value,
    };

    // setQuery((prevQuery) => ({ ...prevQuery, serviceKey: value }));
    setQuery({ ...query, ...{ serviceKey: value } });
    // query.serviceKey = key;

    setServiceKey(key);

    dbgcensus.SetGlobalServiceKey(value);

    // setServiceKey(value);

    // console.log(value);

    console.log(query);
  }

  function onCollectionChange(value) {
    const newValue = (value === "None" || !value) ? null : value;
    
    setQuery({ ...query, ...{ collection: newValue } });
    // query.collection = value;

    console.log(query);

    setCollection(value);
  }

  function onGetQuery() {
    // let censusQuery = query.convertToCensusQuery();
  }

  useEffect(() => {
    // console.log(query);

    function convertToCensusQuery() {
      let censusQuery = new CensusQuery(
        query.collection,
        query.namespace,
        query.serviceKey
      );

      if (!!query.language) {
        censusQuery.setLanguage(censusQuery.language.toLowerCase());
      }

      if (query.limit !== null) {
        censusQuery.setLimit(censusQuery.limit);
      }

      if (query.start !== null) {
        censusQuery.setStart(censusQuery.start);
      }

      if (query.show.length > 0) {
        censusQuery.showFields(censusQuery.show);
      }

      if (query.hide.length > 0) {
        censusQuery.hideFields(censusQuery.hide);
      }

      return censusQuery;
    }

    // console.log('Encoded: ', encodeURI(query.convertToCensusQuery()));

    const url = convertToCensusQuery().toUrl();

    console.log(url);

    setQueryUrl(url);

    // console.log(queryUrl);
  }, [collection, query, namespace]);
  // }, [ collection, query.serviceKey, namespace, query.language, query.limit, query.start, query.show, query.hide, ]);

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container>
          <Grid container item xs={12} sm={6} className={classes.gridContainer}>
            <Grid item xs={12} className={classes.gridItem}>
              <Paper className={classes.paper}>
                <h1 className={classes.header1}>Set Service Key</h1>
                <ServiceKeyForm onServiceKeyChange={onServiceKeyChange} />
              </Paper>
            </Grid>

            <Grid item xs={12} className={classes.gridItem}>
              <Paper className={classes.paper}>
                <h1 className={classes.header1}>Query Creator</h1>
                <CollectionSelector onCollectionChange={onCollectionChange} />
                <Button color="primary" onClick={onGetQuery} value="Get Query">
                  Get Query
                </Button>
              </Paper>
            </Grid>
          </Grid>

          <Grid container item xs={12} sm={6} className={classes.gridContainer}>
            <Grid item xs={12} className={classes.gridItem}>
              <Paper className={classes.paper}>
                <h1 className={classes.header1}>Query String</h1>
                <div>{queryUrl}</div>
              </Paper>
            </Grid>

            <Grid item xs={12} className={classes.gridItem}>
              <Paper className={classes.paper}>
                <h1 className={classes.header1}>Query Results</h1>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
