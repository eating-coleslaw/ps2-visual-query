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
import { pink, amber, orange, blue, cyan } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";

import ServiceKeyForm from "./queries/ServiceKeyForm";
import CollectionSelector from "./queries/CollectionSelector";
import LimitSlider from "./queries/LimitSlider";
import LanguageSelector from "./queries/LanguageSelector";

import FieldsEntryForm from "./queries/FieldsEntryForm";
import ConditionArgumentForm from "./queries/ConditionArgumentForm";
import QueryResults from "./queries/QueryResults";
import QueryUrlContainer from "./queries/QueryUrlContainer";

import JoinsContainer from "./queries/JoinsContainer";
// import JoinForm from "./queries/JoinForm";

import Collapsible from "./shared/Collapsible";

import { v4 as uuidv4 } from "uuid";

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
    // color: theme.palette.text.primary,
    fontWeight: 500,
  },
  header2: {
    margin: 0,
    fontSize: "1.2em",
    // color: theme.palette.text.primary,
    fontWeight: 500,
    width: "100%",
    marginTop: theme.spacing(1.5),
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
  textButton: {
    marginTop: -4,
    marginBottom: theme.spacing(1),
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
  },
  buttonProgress: {
    color: "black",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function App() {
  const classes = useStyles();

  useEffect(() => {
    dbgcensus.SetGlobalNamespace("ps2:v2");
  }, []);

  const [storeKey, setStoreKey] = useState(
    localStorage.getItem("DaybreakGamesKey")
  );
  useEffect(() => {
    const storedKey = localStorage.getItem("DaybreakGamesKey");
    if (storedKey !== null) {
      dbgcensus.SetGlobalServiceKey(storedKey);
      setStoreKey(storedKey);
    }
  }, [setStoreKey]);

  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState({
    serviceKey: storeKey || "example",
    namespace: "ps2:v2",
    collection: "character",
    language: "All",
    conditions: [],
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
          type: prefersDarkMode ? "dark" : "light",
          primary: prefersDarkMode ? { main: "#E7ADFB" } : pink, //24E8D8 cyan : pink, //"#E34F8C" : pink, //amber : pink,
          secondary: orange, //amber,
          background: {
            paper: prefersDarkMode ? "#27273A" : "#fff",
            default: prefersDarkMode ? "#0F1320" : "#fafafa",
          },
          text: {

          }
        },
        contrastThreshold: 5,
      }),
    [prefersDarkMode]
  );

  function onServiceKeyChange(key) {
    setQuery({ ...query, ...{ serviceKey: key } });
    dbgcensus.SetGlobalServiceKey(key);
    localStorage.setItem("DaybreakGamesKey", key);
  }

  function onDeleteStoredServiceKey() {
    setQuery({ ...query, ...{ serviceKey: "example" } });
    dbgcensus.SetGlobalServiceKey("example");
    localStorage.removeItem("DaybreakGamesKey");
  }

  function onCollectionChange(value) {
    setQuery({ ...query, ...{ collection: value } });
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

    setQuery({ ...query, ...{ filterType: value } });
  }

  function onAddSimpleArrayValue(arrayPropertyName, value) {
    const array = [ ...query[arrayPropertyName] ];

    if (value !== "" && !array.includes(value)) {
      let updatedFields = array;
      updatedFields.push(value);
      setQuery({ ...query, ...{ [arrayPropertyName]: updatedFields } });
    }
  }

  function onRemoveSimpleArrayValue(arrayPropertyName, value) {
    const array = [ ...query[arrayPropertyName] ];

    const index = array.indexOf(value);

    if (index !== -1) {
      let updatedFields = array;
      updatedFields.splice(index, 1);
      setQuery({ ...query, ...{ [arrayPropertyName]: updatedFields } });
    }
  }

  function onConditionDataChange(id, propertyName, propertyValue) {
    const updatedConditions = query.conditions.map((condition) => {
      if (condition.id === id) {
        condition[propertyName] = propertyValue;
      }

      return condition;
    });

    setQuery({ ...query, ...{ conditions: updatedConditions } });
  }

  function onAddNewCondition() {
    const newCondition = {
      id: uuidv4(),
      field: "",
      value: "",
      operator: {
        display: "=",
        name: "equals",
        title: "Equals",
        value: "=",
      },
    };

    setQuery({
      ...query,
      ...{ conditions: [...query.conditions, newCondition] },
    });
  }

  function onDeleteCondition(id) {
    const updatedConditions = query.conditions.filter((condition) => {
      return condition.id !== id;
    });

    setQuery({ ...query, ...{ conditions: updatedConditions } });
  }

  function onJoinDataChange(updatedJoin) {
    const updatedJoins = query.joins.map((join) => {
      if (join.id === updatedJoin.id) {
        return updatedJoin;
      }

      return join;
    });

    setQuery({ ...query, ...{ joins: updatedJoins } });
  }

  function onAddNewJoin(newJoin) {
    if (!!newJoin.parentId) {
      return;
    }

    setQuery({ ...query, ...{ joins: [...query.joins, newJoin] } });
  }

  function onDeleteJoin(id) {
    const updatedJoins = query.joins.filter((join) => {
      return join.id !== id;
    });

    setQuery({ ...query, ...{ joins: updatedJoins } });
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

      if (query.conditions.length > 0) {
        query.conditions.forEach((condition) => {
          if (
            condition.field !== "" &&
            !!condition.operator &&
            condition.value !== ""
          ) {
            censusQuery
              .where(condition.field)
              [condition.operator.name](condition.value);
          }
        });
      }

      if (query.joins.length > 0) {
        console.log("==================");
        console.log(query.joins);
        censusQuery = addQueryJoins(censusQuery, query.joins);
      }

      console.log("==================");

      return censusQuery;
    }

    function addQueryJoins(censusQuery, joinsArray, censusJoin = null) {
      if (joinsArray.length > 0) {
        joinsArray.forEach((join) => {
          if (!!join.collection) {
            let serviceJoin = censusJoin !== null ? censusJoin.joinService(join.collection) : censusQuery.joinService(join.collection);

            serviceJoin.isList(join.isList);
            serviceJoin.isOuterJoin(join.isOuterJoin);

            if (!!join.injectAt) {
              serviceJoin.injectAt(join.injectAt);
            }

            if (!!join.onField) {
              serviceJoin.onField(join.onField);
            }

            if (!!join.toField) {
              serviceJoin.toField(join.toField);
            }

            if (join.filterFields.length > 0) {
              serviceJoin[`${join.filterType}Fields`](join.filterFields);
            }
            
            if (join.terms.length > 0) {
              join.terms.forEach((term) => {
                if (
                  term.field !== "" &&
                  !!term.operator &&
                  term.value !== ""
                ) {
                  serviceJoin.where(term.field)[term.operator.name](term.value);
                }
              });
            }

            if (join.joins.length > 0) {
              addQueryJoins(censusQuery, join.joins, serviceJoin);
            }
          }
        });
      }

      return censusQuery;
    }

    try {
      const censusQuery = convertToCensusQuery();
      setDbgQuery(censusQuery);
      let url = censusQuery.toUrl();
      url = url.replace("http://", "https://");
      setQueryUrl(url);
    } catch (error) {
      console.log("Error getting query URL: ", error);
    }
  }, [ query ]);

  const [queryResult, setQueryResult] = useState("");
  async function onSubmitQuery() {
    if (!!queryUrl && !loading) {
      setLoading(true);

      try {
        const response = await fetch(queryUrl);
        const responseJson = await response.json();
        setQueryResult(responseJson);
        setLoading(false);
      } catch (error) {
        console.log("Error getting data from query: ", error);
        setQueryResult(`Error getting data from query: ${error}`);
        setLoading(false);
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
                <Collapsible
                  id="service-id"
                  headerLevel={1}
                  headerText="Service ID"
                  defaultExtended={!storeKey || storeKey === "example"}
                >
                  <p className={classes.itemParagraph}>
                    Sign up for a service ID{" "}
                    <a
                      href="https://census.daybreakgames.com/#service-id"
                      aria-label="Service ID sign up page"
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#40afee" }}
                    >
                      here
                    </a>
                    . The 'example' service ID allows up to 10 requests per
                    minute. Saving your service ID will store it to this
                    browser.
                  </p>
                  <ServiceKeyForm
                    serviceId={query.serviceKey}
                    onServiceKeyChange={onServiceKeyChange}
                    onDeleteStoredKey={onDeleteStoredServiceKey}
                  />
                </Collapsible>
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
                    style={{ color: "#40afee" }}
                  >
                    official documentation
                  </a>{" "}
                  for more information on using the API.
                </p>

                <Collapsible
                  id="collection"
                  headerLevel={2}
                  headerText="Collection"
                  defaultExtended={true}
                >
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    className={classes.gridRow}
                  >
                    <Grid
                      item
                      sm={12}
                      md={7}
                      className={classes.splitQueryField}
                    >
                      <CollectionSelector
                        collection={query.collection}
                        onChange={onCollectionChange}
                      />
                    </Grid>

                    <Grid
                      item
                      sm={12}
                      md={4}
                      className={classes.splitQueryField}
                      style={{ marginTop: 4 }}
                    >
                      <LanguageSelector
                        value={query.language}
                        onChange={onLanguageChange}
                      />
                    </Grid>

                    <Grid item sm={12} style={{ marginLeft: 4, marginTop: 8 }}>
                      <LimitSlider
                        value={query.limit}
                        onChange={onLimitChange}
                        label="Limit"
                      />
                    </Grid>
                  </Grid>
                </Collapsible>

                <Collapsible
                  id="search-conditions"
                  headerLevel={2}
                  headerText="Search Conditions"
                  defaultExtended={true}
                >
                  {query.conditions.length > 0 && (
                    <Grid
                      item
                      container
                      xs={12}
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={1}
                      className={classes.gridRow}
                    >
                      {query.conditions.map((condition) => {
                        return (
                          <ConditionArgumentForm
                            key={condition.id}
                            conditionData={condition}
                            onDataChange={onConditionDataChange}
                            onDelete={onDeleteCondition}
                          />
                        );
                      })}
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Button
                      color="primary"
                      startIcon={<AddIcon fontSize="small" />}
                      size="small"
                      onClick={onAddNewCondition}
                      className={classes.textButton}
                    >
                      New Condition
                    </Button>
                  </Grid>
                </Collapsible>

                <Collapsible
                  id="field-filters"
                  headerLevel={2}
                  headerText="Filter Displayed Fields"
                  defaultExtended={true}
                >
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
                </Collapsible>

                <Collapsible
                  id="resolves-container"
                  headerLevel={2}
                  headerText="Resolves"
                  defaultExtended={true}
                >
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
                </Collapsible>

                <Collapsible
                  id="joins-container"
                  headerLevel={2}
                  headerText="Joins"
                  defaultExtended={true}
                >
                  <JoinsContainer
                    joinsData={query.joins}
                    depth={0}
                    onJoinDataChange={onJoinDataChange}
                    onAddNewJoin={onAddNewJoin}
                    onDeleteJoin={onDeleteJoin}
                  />
                </Collapsible>
              </Paper>
            </Grid>
          </Grid>

          <Grid container item xs={12} sm={6} className={classes.gridContainer}>
            <Grid item xs={12} className={classes.gridContainerItem}>
              <QueryUrlContainer
                queryUrl={queryUrl}
                isLoading={loading}
                onRunQuery={onSubmitQuery}
              />
            </Grid>

            <Grid item xs={12} className={classes.gridContainerItem}>
              <QueryResults data={queryResult} isLoading={loading} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
