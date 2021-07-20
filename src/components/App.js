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
import QueryConfig from "../planetside/QueryConfig";
import ReactJson from "react-json-view";

import CollectionSelector from "./queries/CollectionSelector";
import LimitSlider from './queries/LimitSlider';
import LanguageSelector from "./queries/LanguageSelector";

import FieldsEntryForm from './queries/FieldsEntryForm';

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
  splitQueryField: {
    width: 250,
  },
}));

function App() {
  const [query, setQuery] = useState({
    serviceKey: "example",
    namespace: "ps2:v2",
    collection: "character",
    language: null,
    conditions: [],
    condition: {
      field: "name.first",
      operand: "=",
      value: "Chirtle",
    },
    limit: 10, //null,
    start: null,
    show: [],
    hide: [],
    resolves: [],
    joins: [],
    trees: [],
    lang: null,
  });

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

  function onServiceKeyChange(key) {
    setQuery({ ...query, ...{ serviceKey: key } });
    dbgcensus.SetGlobalServiceKey(key);
  }

  function onCollectionChange(value) {
    const newValue = value === "None" || !value ? null : value;
    setQuery({ ...query, ...{ collection: newValue } });
  }

  function onLimitChange(value) {
    setQuery({ ...query, ...{ limit: value } });
  }

  function onLanguageChange(value) {
    setQuery({ ...query, ...{ language: value.toLowerCase() }});
  }

  function onAddSimpleArrayValue(arrayPropertyName, value) {
    const array = query[arrayPropertyName];
    
    if (value !== '' && !array.includes(value)) {
      let updatedFields = array;
      updatedFields.push(value);
      setQuery({ ...query, ...{ [arrayPropertyName]: updatedFields }});
    }
  }

  function onRemoveSimpleArrayValue(arrayPropertyName, value) {
    const array = query[arrayPropertyName];
    
    const index = array.indexOf(value);

    if (index !== -1) {
      let updatedFields = array;
      updatedFields.splice(index, 1);
      setQuery({ ...query, ...{ [arrayPropertyName]: updatedFields }});
    }
  }

  function onAddShowField(value) {
    if (value !== '' && !query.show.includes(value)) {
      let updatedFields = query.show;
      updatedFields.push(value);
      setQuery({ ...query, ...{ show: updatedFields }});
    }
  }

  function onRemoveShowField(value) {
    const index = query.show.indexOf(value);

    if (index !== -1) {
      let updatedFields = query.show;
      updatedFields.splice(index, 1);
      setQuery({ ...query, ...{ show: updatedFields }});
    }
  }

  function onAddHideField(value) {
    if (value !== '' && !query.hide.includes(value)) {
      let updatedFields = query.hide;
      updatedFields.push(value);
      setQuery({ ...query, ...{ hide: updatedFields }});
    }
  }

  function onRemoveHideField(value) {
    const index = query.hide.indexOf(value);

    if (index !== -1) {
      let updatedFields = query.hide;
      updatedFields.splice(index, 1);
      setQuery({ ...query, ...{ hide: updatedFields }});
    }
  }

  function onGetQuery() {
    // let censusQuery = query.convertToCensusQuery();
  }

  const [queryUrl, setQueryUrl] = useState("");
  const [dbgQuery, setDbgQuery] = useState(
    new CensusQuery(query.collection, query.namespace, query.serviceKey)
  );
  useEffect(() => {
    function convertToCensusQuery() {
      let censusQuery = new CensusQuery(
        query.collection,
        query.namespace,
        query.serviceKey
      );

      if (!!query.language) {
        censusQuery.setLanguage(query.language.toLowerCase());
      }

      if (query.limit !== null) {
        censusQuery.setLimit(query.limit);
      }

      if (query.start !== null) {
        censusQuery.setStart(query.start);
      }

      if (query.show.length > 0) {
        censusQuery.showFields(query.show);
      }

      if (query.hide.length > 0) {
        censusQuery.hideFields(query.hide);
      }

      if (query.resolves.length > 0) {
        console.log(query.resolves);
        // query.resolves.forEach((resolve) => censusQuery.resolve(resolve));
        censusQuery.resolve(query.resolves);
      }

      return censusQuery;
    }
    try {
      const censusQuery = convertToCensusQuery();

      // console.log(censusQuery);

      setDbgQuery(censusQuery);

      // const url = censusQuery.toUrl();
      // console.log(query);

      const url = convertToCensusQuery().toUrl();
      setQueryUrl(url);
    } catch (error) {
      console.log("Error getting query URL: ", error);
    }
  }, [query]);

  const [queryResult, setQueryResult] = useState("");
  async function onSubmitQuery() {
    if (!!dbgQuery) {
      try {
        const response = await fetch(dbgQuery.toUrl());
        const responseJson = await response.json();

        // console.log(responseJson);

        // console.log(JSON.stringify(responseJson, null, 2));

        setQueryResult(responseJson);
      } catch (error) {
        console.log("Error getting data from query: ", error);
      }

      // dbgQuery.get((error, data) => {
      //   if (error) {
      //     console.log('Error getting data from query: ', error);
      //   }

      //   const jsonData = JSON.parse(JSON.stringify(data));

      //   console.log(jsonData);

      //   setQueryResult(data);
      // });
    }
  }

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container alignItems="flex-start">
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
                <Grid container spacing={3} alignItems="flex-start">

                  <Grid item sm={12} md={6} className={classes.splitQueryField}>
                    <CollectionSelector onCollectionChange={onCollectionChange} />
                  </Grid>

                  <Grid item sm={12} md={6} className={classes.splitQueryField}>
                    <LimitSlider value={query.limit} onChange={onLimitChange} label="Limit" />
                  </Grid>
                </Grid>

                <Grid item sm={6} md={3} style={{ width: 120 }}>
                  <LanguageSelector value={query.language} onChange={onLanguageChange} />
                </Grid>

                <Grid item container xs={12}>
                  {/* <FieldsEntryForm label="Show Fields" fields={query.show} onAddField={onAddShowField} onRemoveField={onRemoveShowField} /> */}
                  <FieldsEntryForm label="Show Fields" fields={query.show} onAddField={(value) => onAddSimpleArrayValue("show", value)} onRemoveField={(value) => onRemoveSimpleArrayValue("show", value)} />
                </Grid>
                
                <Grid item container xs={12} justifyContent="flex-start" alignItems="center">
                  {/* <FieldsEntryForm label="Hide Fields" fields={query.hide} onAddField={onAddHideField} onRemoveField={onRemoveHideField} /> */}
                  <FieldsEntryForm label="Hide Fields" fields={query.hide} onAddField={(value) => onAddSimpleArrayValue("hide", value)} onRemoveField={(value) => onRemoveSimpleArrayValue("hide", value)} />
                </Grid>

                <Grid item container xs={12} justifyContent="flex-start" alignItems="center">
                  {/* <FieldsEntryForm label="Hide Fields" fields={query.hide} onAddField={onAddHideField} onRemoveField={onRemoveHideField} /> */}
                  <FieldsEntryForm label="Resolves" fields={query.resolves} onAddField={(value) => onAddSimpleArrayValue("resolves", value)} onRemoveField={(value) => onRemoveSimpleArrayValue("resolves", value)} />
                </Grid>

                <Button
                  color="primary"
                  onClick={onSubmitQuery}
                  value="Get Query"
                >
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
                {!!queryResult ? (
                  <ReactJson
                    src={queryResult}
                    enableDelete={true}
                    iconStyle="circle"
                    displayObjectSize={false}
                    displayDataTypes={false}
                  />
                ) : null}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
