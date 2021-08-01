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
import QueryCondition from "../planetside/QueryCondition";
import Collapsible from "./shared/Collapsible";
import HideAppBar from "./HideAppBar";
import QueryConfig from "../planetside/QueryConfig";
import TreeForm from "./queries/TreeForm";

import userPreferenceStore from "../persistence/userPreferencesStore";
import {
  upsertQuery,
  isSupported,
  getQuery,
  deleteQuery,
} from "../persistence/queryStore";
import QueryOptionsContainer from "./queries/queryOptions/QueryOptionsContainer";

const CensusQuery = require("dbgcensus").Query;
const dbgcensus = require("dbgcensus");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    "margin-top": theme.spacing(2),
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
    fontWeight: 500,
  },
  header2: {
    margin: 0,
    fontSize: "1.2em",
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

  const [namespace, setNamespace] = useState("ps2:v2");
  useEffect(() => {
    dbgcensus.SetGlobalNamespace("ps2:v2");
  }, [namespace]);

  const [storeKey, setStoreKey] = useState(userPreferenceStore.getServiceId());
  const [serviceKey, setServiceKey] = useState("example");
  useEffect(() => {
    const storedKey = userPreferenceStore.getServiceId();
    if (storedKey !== null) {
      dbgcensus.SetGlobalServiceKey(storedKey);
      setStoreKey(storedKey);
      setServiceKey(storedKey);
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState(
    // QueryConfig(storeKey ?? "example", "character", namespace)
    QueryConfig("character", namespace)
  );

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const storedColorTheme = userPreferenceStore.getColorTheme();

  const [colorTheme, setColorTheme] = useState(
    !!storedColorTheme ? storedColorTheme : prefersDarkMode ? "dark" : "light"
  );

  useEffect(() => {
    const newTheme = !!storedColorTheme
      ? storedColorTheme
      : prefersDarkMode
      ? "dark"
      : "light";
    setColorTheme(newTheme);
  }, [storedColorTheme, prefersDarkMode]);

  const useDarkMode = colorTheme === "dark";

  const theme = React.useMemo(() => {
    const theme = createTheme({
      palette: {
        type: useDarkMode ? "dark" : "light",
        primary: useDarkMode ? { main: "#E7ADFB" } : pink, //24E8D8 cyan : pink, //"#E34F8C" : pink, //amber : pink,
        secondary: orange, //amber,
        background: {
          paper: useDarkMode ? "#27273A" : "#fff",
          default: useDarkMode ? "#0F1320" : "#fafafa",
        },
        text: {},
      },
      contrastThreshold: 5,
    });

    return theme;
  }, [useDarkMode]);

  function handleColorThemeChange(theme) {
    userPreferenceStore.saveColorTheme(theme);
    setColorTheme(theme);
  }

  const [loadedQueryId, setLoadedQueryId] = useState();

  const [isStoreSupported, setIsStoreSupported] = useState(false);
  useEffect(() => {
    setIsStoreSupported(isSupported());
  }, []);

  async function handleSaveNewQuery(queryName) {
    if (!queryName) {
      console.warn("Invalid query name");
      return;
    }

    await handleSaveQuery(queryName);
  }

  async function handleSaveQuery(queryName) {
    const currentQuery = { ...query };

    if (!!queryName) {
      currentQuery.name = queryName;
    }

    try {
      await upsertQuery(currentQuery);

      const queryId = currentQuery.id;

      await handleLoadQuery(queryId);
    } catch (error) {
      console.warn("Error saving query:", error);
    }
  }

  async function handleSaveQueryAs(copyName = "") {
    try {
      const currentQuery = { ...query };

      if (!copyName) {
        copyName = `${currentQuery.name} (copy)`;
      }

      currentQuery.id = null;
      currentQuery.name = copyName;

      const result = await upsertQuery(currentQuery);

      if (!!result) {
        setQuery((prevQuery) => {
          return { ...prevQuery, ...currentQuery };
        });

        setLoadedQueryId(currentQuery.id);
      } else {
        console.warn("Error saving query:", result);
      }
    } catch (error) {
      console.warn("Error saving query:", error);
    }
  }

  async function handleLoadQuery(id) {
    try {
      const loadedQuery = await getQuery(id);

      if (!!loadedQuery) {
        setQuery(loadedQuery);

        setLoadedQueryId(id);
      }
    } catch (error) {
      console.warn(`Error loading query ${id}:`, error);
    }
  }

  async function handleRenameQuery(queryName) {
    await handleSaveQuery(queryName);
  }

  async function handleDeleteQuery(id) {
    try {
      const result = await deleteQuery(id);

      if (!!result) {
        handleNewQuery();
      }
    } catch (error) {
      console.warn(`Error deleting query ${id}:`, error);
    }
  }

  function handleNewQuery() {
    setQuery(QueryConfig());
  }

  function onServiceKeyChange(key) {
    dbgcensus.SetGlobalServiceKey(key);
    userPreferenceStore.saveServiceId(key); // TODO: make sure this doesn't cause problems with the store key effect above
    setServiceKey(key);
  }

  function onDeleteStoredServiceKey() {
    setQuery((prevQuery) => {
      return { ...prevQuery, ...{ serviceKey: "example" } };
    });

    dbgcensus.SetGlobalServiceKey("example");
    userPreferenceStore.removeServiceId();
  }

  function onCollectionChange(value) {
    setQuery((prevQuery) => {
      return { ...prevQuery, ...{ collection: value } };
    });
  }

  function onLimitChange(value) {
    const newLimit = value === 0 ? null : value;

    setQuery((prevQuery) => {
      return { ...prevQuery, ...{ limit: newLimit } };
    });
  }

  function onLanguageChange(value) {
    const newValue = value === "All" ? "" : value.toLowerCase();

    setQuery((prevQuery) => {
      return { ...prevQuery, ...{ language: newValue } };
    });
  }

  function onFilterTypeChange(event) {
    const value = event.target.value.toLowerCase();

    setQuery((prevQuery) => {
      return { ...prevQuery, ...{ filterType: value } };
    });
  }

  function onAddSimpleArrayValue(arrayPropertyName, value) {
    setQuery((prevQuery) => {
      const array = [...prevQuery[arrayPropertyName]];

      if (value !== "" && !array.includes(value)) {
        let updatedFields = array;
        updatedFields.push(value);

        return { ...prevQuery, ...{ [arrayPropertyName]: updatedFields } };
      } else {
        return prevQuery;
      }
    });
  }

  function onRemoveSimpleArrayValue(arrayPropertyName, value) {
    setQuery((prevQuery) => {
      const array = [...prevQuery[arrayPropertyName]];

      const index = array.indexOf(value);

      if (index !== -1) {
        let updatedFields = array;
        updatedFields.splice(index, 1);

        return { ...prevQuery, ...{ [arrayPropertyName]: updatedFields } };
      }
    });
  }

  function onConditionDataChange(id, propertyName, propertyValue) {
    setQuery((prevQuery) => {
      const updatedConditions = prevQuery.conditions.map((condition) => {
        if (condition.id === id) {
          return { ...condition, ...{ [propertyName]: propertyValue } };
        }

        return condition;
      });

      return { ...prevQuery, ...{ conditions: updatedConditions } };
    });
  }

  function onAddNewCondition() {
    const newCondition = QueryCondition();

    setQuery((prevQuery) => {
      const updatedConditions = [...prevQuery.conditions, newCondition];
      return { ...prevQuery, ...{ conditions: updatedConditions } };
    });
  }

  function onDeleteCondition(id) {
    setQuery((prevQuery) => {
      const updatedConditions = prevQuery.conditions.filter((condition) => {
        return condition.id !== id;
      });

      return { ...prevQuery, ...{ conditions: updatedConditions } };
    });
  }

  function handleAddJoin(join) {
    setQuery((prevQuery) => {
      let updatedJoins = [...prevQuery.joins, join];
      return { ...prevQuery, ...{ joins: updatedJoins } };
    });
  }

  function handleDeleteJoin(joinId) {
    setQuery((prevQuery) => {
      let updatedJoins = prevQuery.joins.filter((join) => join.id !== joinId);
      return { ...prevQuery, ...{ joins: updatedJoins } };
    });
  }

  function handleChangeJoinInfo(targetId, propertyName, value, ancestry) {
    setQuery((prevQuery) => {
      const updatedJoins = updateJoinAncestry(
        prevQuery.joins,
        targetId,
        propertyName,
        value,
        ancestry,
        (join) => changeJoinPropertyValue(join, propertyName, value)
      );
      return { ...prevQuery, ...{ joins: updatedJoins } };
    });
  }

  function handleAddJoinArrayItem(targetId, arrayName, item, ancestry) {
    setQuery((prevQuery) => {
      const updatedJoins = updateJoinAncestry(
        prevQuery.joins,
        targetId,
        arrayName,
        item,
        ancestry,
        (targetJoin) => addArrayItemToJoin(targetJoin, arrayName, item)
      );
      return { ...prevQuery, ...{ joins: updatedJoins } };
    });
  }

  function handleRemoveJoinArrayItem(targetId, arrayName, item, ancestry) {
    setQuery((prevQuery) => {
      const updatedJoins = updateJoinAncestry(
        prevQuery.joins,
        targetId,
        arrayName,
        item,
        ancestry,
        (targetJoin) => removeArrayItemFromJoin(targetJoin, arrayName, item)
      );
      return { ...prevQuery, ...{ joins: updatedJoins } };
    });
  }

  function handleChangeJoinArrayItemWithId(
    targetId,
    arrayName,
    itemId,
    propertyName,
    value,
    ancestry
  ) {
    setQuery((prevQuery) => {
      const updatedJoins = updateJoinAncestry(
        prevQuery.joins,
        targetId,
        propertyName,
        value,
        ancestry,
        (targetJoin) =>
          updateArrayItemWithIdInJoin(
            targetJoin,
            arrayName,
            itemId,
            propertyName,
            value
          )
      );
      return { ...prevQuery, ...{ joins: updatedJoins } };
    });
  }

  function handleRemoveJoinArrayItemWithId(
    targetId,
    arrayName,
    itemId,
    ancestry
  ) {
    setQuery((prevQuery) => {
      const updatedJoins = updateJoinAncestry(
        prevQuery.joins,
        targetId,
        arrayName,
        itemId,
        ancestry,
        (targetJoin) =>
          removeArrayItemWithIdFromJoin(targetJoin, arrayName, itemId)
      );
      return { ...prevQuery, ...{ joins: updatedJoins } };
    });
  }

  function updateJoinAncestry(
    joins,
    targetId,
    propertyName,
    value,
    ancestry,
    updateFunction
  ) {
    const startJoinId = ancestry[0];
    const childAncestry = [...ancestry];
    childAncestry.splice(0, 1);

    const updatedJoins = joins.map((join) => {
      if (join.id === startJoinId) {
        const updatedJoin = updateJoinAncestor(
          join,
          targetId,
          propertyName,
          value,
          childAncestry,
          updateFunction
        );
        return updatedJoin;
      }
      return join;
    });

    return updatedJoins;
  }

  function updateJoinAncestor(
    join,
    targetId,
    propertyName,
    value,
    ancestry,
    updateFunction
  ) {
    // If this is the target join, update the property's value
    if (join.id === targetId) {
      return updateFunction(join);
    }

    // If this is not the target join, dig down into children
    const nextChildId = ancestry[0];
    const childAncestry = [...ancestry];
    childAncestry.splice(0, 1);

    const updatedJoins = join.joins.map((j) => {
      if (j.id === nextChildId) {
        const updatedJoin = updateJoinAncestor(
          j,
          targetId,
          propertyName,
          value,
          childAncestry,
          updateFunction
        );
        return updatedJoin;
      }

      return j;
    });

    join = { ...join, ...{ joins: updatedJoins } };
    return join;
  }

  function changeJoinPropertyValue(join, propertyName, value) {
    return { ...join, ...{ [propertyName]: value } };
  }

  function addArrayItemToJoin(join, arrayName, item) {
    const updatedArray = [...join[arrayName], item];
    return { ...join, ...{ [arrayName]: updatedArray } };
  }

  function removeArrayItemFromJoin(join, arrayName, item) {
    const updatedArray = join[arrayName].filter((i) => i !== item);
    return { ...join, ...{ [arrayName]: updatedArray } };
  }

  function updateArrayItemWithIdInJoin(
    join,
    arrayName,
    itemId,
    propertyName,
    value
  ) {
    const updatedArray = join[arrayName].map((item) => {
      if (item.id === itemId) {
        return { ...item, ...{ [propertyName]: value } };
      }
      return item;
    });

    return { ...join, ...{ [arrayName]: updatedArray } };
  }

  function removeArrayItemWithIdFromJoin(join, arrayName, itemId) {
    const updatedArray = join[arrayName].filter((item) => item.id !== itemId);
    return { ...join, ...{ [arrayName]: updatedArray } };
  }

  function handleChangeQueryTreeProperty(propertyName, value) {
    setQuery((prevQuery) => {
      let updatedTree = { ...prevQuery.tree, ...{ [propertyName]: value } };

      return { ...prevQuery, ...{ tree: updatedTree } };
    });
  }

  const [queryUrl, setQueryUrl] = useState("");
  useEffect(() => {
    console.log("Query Changed effect");

    function convertToCensusQuery() {
      let censusQuery = new CensusQuery(
        query.collection,
        query.namespace //,
        // serviceKey
        // query.serviceKey
      );

      if (!!query.language && query.language !== "All") {
        censusQuery.setLanguage(query.language.toLowerCase());
      }

      if (query.limit !== null && query.limit !== 0) {
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

      if (query.sortFields.length > 0) {
        censusQuery.sort(query.sortFields);
      }

      if (query.conditions.length > 0) {
        query.conditions.forEach((condition) => {
          const field = condition.field;
          const operator = condition.operator;
          const value = condition.value;

          // if (condition.isValid(field, operator, value)) {
          if (!!field && !!operator && !!value) {
            censusQuery.where(field)[operator.name](value);
          }
        });
      }

      if (query.joins.length > 0) {
        censusQuery = addQueryJoins(censusQuery, query.joins);
      }

      return censusQuery;
    }

    function addQueryJoins(censusQuery, joinsArray, censusJoin = null) {
      if (joinsArray.length > 0) {
        joinsArray.forEach((join) => {
          if (!!join.collection) {
            let serviceJoin =
              censusJoin !== null
                ? censusJoin.joinService(join.collection)
                : censusQuery.joinService(join.collection);

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
                const field = term.field;
                const operator = term.operator;
                const value = term.value;

                // if (term.isValid(field, operator, value)) {
                if (!!field && !!operator && !!value) {
                  serviceJoin.where(field)[operator.name](value);
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

    // The dbgcensus package doesn't process trees correctly, so we do it manually
    function getTreeViewUrlString() {
      const treeField = query.tree.treeField || query.tree.startField;

      if (!!treeField) {
        let treeViewString = `&c:tree=field:${treeField}`;

        treeViewString = `${treeViewString}^isList:${query.tree.isList}`;

        if (!!query.tree.groupPrefix) {
          treeViewString = `${treeViewString}^prefix:${query.tree.groupPrefix}`;
        }

        if (!!query.tree.startField) {
          treeViewString = `${treeViewString}^start:${query.tree.startField}`;
        }

        return treeViewString;
      }
    }

    try {
      const censusQuery = convertToCensusQuery();
      let url = censusQuery.toUrl();
      url = url.replace("http://", "https://");

      let treeViewString = getTreeViewUrlString();

      if (!!treeViewString) {
        url = url + treeViewString;
      }

      setQueryUrl(url);
    } catch (error) {
      console.log("Error getting query URL: ", error);
    }
  }, [query, loadedQueryId]);

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
      <HideAppBar
        theme={colorTheme}
        onChangeTheme={handleColorThemeChange}
        onLoadQuery={handleLoadQuery}
      />
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
                <Grid
                  container
                  className={classes.gridRow}
                  alignItems="center"
                  spacing={1}
                >
                  <Grid
                    item
                    container
                    sm={12}
                    md={4}
                    justifyContent="flex-start"
                  >
                    <h1 className={classes.header1}>Query Creator</h1>
                  </Grid>

                  {isStoreSupported && (
                    <QueryOptionsContainer
                      query={query}
                      onSaveNew={handleSaveNewQuery}
                      onSave={handleSaveQuery}
                      onSaveAs={handleSaveQueryAs}
                      onNewQuery={handleNewQuery}
                      onDelete={handleDeleteQuery}
                      onRename={handleRenameQuery}
                    />
                  )}
                </Grid>

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
                  or{" "}
                  <a
                    href="https://github.com/leonhard-s/auraxium/wiki/Census-API-Primer"
                    aria-label="Leonhard-s's Census API Primer wiki"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#40afee" }}
                  >
                    leonhard-s's API primer
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

                    <Grid item sm={12} style={{ marginLeft: 16, marginTop: 8 }}>
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
                    spacing={1}
                    className={classes.gridRow}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
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
                    onAddJoin={handleAddJoin}
                    onDeleteJoin={handleDeleteJoin}
                    onInfoChange={handleChangeJoinInfo}
                    onAddArrayItem={handleAddJoinArrayItem}
                    onRemoveArrayItem={handleRemoveJoinArrayItem}
                    onChangeArrayItemWithId={handleChangeJoinArrayItemWithId}
                    onRemoveArrayItemWithId={handleRemoveJoinArrayItemWithId}
                  />
                </Collapsible>

                <Collapsible
                  id="tree-form"
                  headerLevel={2}
                  headerText="Tree View"
                  defaultExtended={true}
                >
                  <TreeForm
                    tree={query.tree}
                    onChange={handleChangeQueryTreeProperty}
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
