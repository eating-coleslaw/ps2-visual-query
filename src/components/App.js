import React, { useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Container,
  Grid,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import "../styles/App.css";
import ServiceKeyForm from "./queries/ServiceKeyForm";
import { pink, amber } from "@material-ui/core/colors";

import CollectionSelector from "./queries/CollectionSelector";
import LimitSlider from "./queries/LimitSlider";
import LanguageSelector from "./queries/LanguageSelector";

import FieldsEntryForm from "./queries/FieldsEntryForm";
import ConditionArgumentForm from "./queries/ConditionArgumentForm";
import QueryResults from "./queries/QueryResults";
import QueryUrlContainer from "./queries/QueryUrlContainer";

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
  gridContainerItem: {
    "padding-bottom": theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  gridRow: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  header1: {
    margin: 0,
    fontSize: "1.4em",
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  header2: {
    margin: 0,
    fontSize: "1.2em",
    color: theme.palette.text.primary,
    fontWeight: 500,
    width: "100%",
  },
  itemParagraph: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  splitQueryField: {
    width: 250,
  },
  filterSelect: {
    width: 120,
  },
  inlineSelectItem: {
    marginTop: 4,
  },
}));

export default function App() {
  const classes = useStyles();

  const [query, setQuery] = useState({
    serviceKey: "example",
    namespace: "ps2:v2",
    collection: "character",
    language: "All",
    conditions: [],
    condition: {
      field: "name.first",
      operator: {
        display: "=",
        name: "equals",
        title: "Equals",
        value: "=",
      },
      value: "",
    },
    limit: 10,
    start: null,
    filterType: "show",
    filterFields: [],
    resolves: [],
    joins: [],
    trees: [],
    lang: null,
    sort: [],
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
    setQuery({
      ...query,
      ...{
        collection: value,
        condition: {
          field: "",
          operator: query.condition.operator,
          value: "",
        },
      },
    });
  }

  function onLimitChange(value) {
    setQuery({ ...query, ...{ limit: value } });
  }

  function onLanguageChange(value) {
    setQuery({ ...query, ...{ language: value.toLowerCase() } });
  }

  function onFilterTypeChange(event) {
    const isChecked = event.target.checked;
    const value = isChecked ? "show" : "hide";

    console.log(value);
    console.log(query.filterFields);

    setQuery({ ...query, ...{ filterType: value } });
  }

  function onAddSimpleArrayValue(arrayPropertyName, value) {
    const array = query[arrayPropertyName];

    if (value !== "" && !array.includes(value)) {
      let updatedFields = array;
      updatedFields.push(value);
      setQuery({ ...query, ...{ [arrayPropertyName]: updatedFields } });
    }
  }

  function onRemoveSimpleArrayValue(arrayPropertyName, value) {
    const array = query[arrayPropertyName];

    const index = array.indexOf(value);

    if (index !== -1) {
      let updatedFields = array;
      updatedFields.splice(index, 1);
      setQuery({ ...query, ...{ [arrayPropertyName]: updatedFields } });
    }
  }

  function onConditionOperatorChange(operator) {
    setQuery({
      ...query,
      ...{
        condition: {
          field: query.condition.field,
          operator,
          value: query.condition.value,
        },
      },
    });
  }

  function onConditionFieldChange(field) {
    setQuery({
      ...query,
      ...{
        condition: {
          field,
          operator: query.condition.operator,
          value: query.condition.value,
        },
      },
    });
  }

  function onConditionValueChange(value) {
    setQuery({
      ...query,
      ...{
        condition: {
          field: query.condition.field,
          operator: query.condition.operator,
          value,
        },
      },
    });
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

      if (!!query.language && query.language !== "All") {
        censusQuery.setLanguage(query.language.toLowerCase());
      }

      if (query.limit !== null) {
        censusQuery.setLimit(query.limit);
      }

      if (query.start !== null) {
        censusQuery.setStart(query.start);
      }

      if (query.filterFields.length > 0) {
        censusQuery[`${query.filterType}Fields`](query.filterFields);
      }

      if (query.resolves.length > 0) {
        censusQuery.resolve(query.resolves);
      }

      if (query.sort.length > 0) {
        censusQuery.sort(query.sort);
      }

      if (
        query.condition.field !== "" &&
        !!query.condition.operator &&
        query.condition.value !== ""
      ) {
        censusQuery
          .where(query.condition.field)
          [query.condition.operator.name](query.condition.value);
      }

      return censusQuery;
    }
    try {
      const censusQuery = convertToCensusQuery();
      setDbgQuery(censusQuery);
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
        setQueryResult(responseJson);
      } catch (error) {
        console.log("Error getting data from query: ", error);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container alignItems="flex-start">
          <Grid container item xs={12} sm={6} className={classes.gridContainer}>
            <Grid item xs={12} className={classes.gridContainerItem}>
              <Paper className={classes.paper}>
                <h1 className={classes.header1}>Set Service ID</h1>
                <p className={classes.itemParagraph}>
                  Sign up for a service ID{" "}
                  <a
                    href="https://census.daybreakgames.com/#service-id"
                    aria-label="Service ID sign up page"
                    target="_blank"
                    rel="noreferrer"
                  >
                    here
                  </a>
                  . The 'example' service ID allows up to 10 requests per
                  minute.
                </p>
                <ServiceKeyForm onServiceKeyChange={onServiceKeyChange} />
              </Paper>
            </Grid>

            <Grid item xs={12} className={classes.gridContainerItem}>
              <Paper className={classes.paper}>
                <h1 className={classes.header1}>Query Creator</h1>
                <p className={classes.itemParagraph}>
                  Refer to the{" "}
                  <a
                    href="https://census.daybreakgames.com/#general"
                    aria-label="Official census API documentation page"
                    target="_blank"
                    rel="noreferrer"
                  >
                    official documentation
                  </a>{" "}
                  for more information on using the API.
                </p>

                <Grid
                  container
                  spacing={1}
                  alignItems="flex-start"
                  className={classes.gridRow}
                >
                  <Grid item sm={12} md={6} className={classes.splitQueryField}>
                    <CollectionSelector
                      collection={query.collection}
                      onChange={onCollectionChange}
                    />
                  </Grid>

                  <Grid item sm={12} md={6} className={classes.splitQueryField}>
                    <LanguageSelector
                      value={query.language}
                      onChange={onLanguageChange}
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  xs={12}
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                  className={classes.gridRow}
                >
                  <ConditionArgumentForm
                    conditionData={query.condition}
                    onFieldChange={onConditionFieldChange}
                    onOperatorChange={onConditionOperatorChange}
                    onValueChange={onConditionValueChange}
                  />
                </Grid>

                <h2 className={classes.header2}>Filter Displayed Fields</h2>
                <Grid
                  item
                  container
                  xs={12}
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0}
                  className={classes.gridRow}
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    className={classes.inlineSelectItem}
                  >
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="filter-type-select">
                        Filter Type
                      </InputLabel>
                      <Select
                        native
                        margin="dense"
                        label="Filter Type"
                        className={classes.filterSelect}
                        value={query.filterType}
                        onChange={onFilterTypeChange}
                        inputProps={{
                          name: "filter-type",
                          id: "filter-type-select",
                        }}
                      >
                        <option aria-label="Show" value="show">
                          Show
                        </option>
                        <option aira-label="Hide" value="hide">
                          Hide
                        </option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <FieldsEntryForm
                    label="Add Field"
                    fields={query.filterFields}
                    onAddField={(value) =>
                      onAddSimpleArrayValue("filterFields", value)
                    }
                    onRemoveField={(value) =>
                      onRemoveSimpleArrayValue("filterFields", value)
                    }
                  />
                </Grid>

                <Grid
                  item
                  container
                  xs={12}
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0}
                  className={classes.gridRow}
                >
                  <FieldsEntryForm
                    label="Resolves"
                    fields={query.resolves}
                    onAddField={(value) =>
                      onAddSimpleArrayValue("resolves", value)
                    }
                    onRemoveField={(value) =>
                      onRemoveSimpleArrayValue("resolves", value)
                    }
                  />
                </Grid>

                <Grid item sm={12}>
                  <LimitSlider
                    value={query.limit}
                    onChange={onLimitChange}
                    label="Limit"
                  />
                </Grid>

                <Button
                  color="primary"
                  onClick={onSubmitQuery}
                  value="Run Query"
                >
                  Get Query
                </Button>
              </Paper>
            </Grid>
          </Grid>

          <Grid container item xs={12} sm={6} className={classes.gridContainer}>
            <Grid item xs={12} className={classes.gridContainerItem}>
              <QueryUrlContainer queryUrl={queryUrl} />
            </Grid>

            <Grid item xs={12} className={classes.gridContainerItem}>
              <QueryResults data={queryResult} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
