import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { isSupported, getLastModified } from "../../persistence/queryStore";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, ListSubheader } from "@material-ui/core";
import MenuDrawer from "./MenuDrawer";
import QuerySelector from "./QuerySelector";

const useStyles = makeStyles((theme) => ({
  header1: {
    margin: 0,
    fontSize: "1.4em",
    fontWeight: 500,
  },
  menuButtonContainer: {
    maxWidth: 20,
    marginRight: theme.spacing(2),
  },
  button: {
    margin: 0,
    padding: 0,
  },
  divider: {
    margin: "8px 0",
  },
  list: {
    width: "100%",
  },
  recentListItem: {
    padding: "0 0 0 8px",
  },
  subHeader: {
    color: theme.palette.secondary.main,
    lineHeight: 2,
    padding: "8px 0 0 0",
    fontSize: "0.875rem",
    boxSizing: "border-box",
    fontWeight: 500,
    margin: "0 0 4px 0",
  },
  listSubheader: {
    color: theme.palette.secondary.main,
    lineHeight: 2,
    padding: "8px 0 0 0",
    marginTop: theme.spacing(1),
  },
}));

export default function MenuDrawerContainer({ onLoadQuery, ...props }) {
  const classes = useStyles();
  const theme = useTheme();

  const [isStoreSupported, setIsStoreSupported] = useState(false);
  useEffect(() => {
    setIsStoreSupported(isSupported());
  }, []);

  const [isDarkTheme, setIsDarkTheme] = useState(theme.palette.type === "dark");
  useEffect(() => {
    setIsDarkTheme(theme.palette.type === "dark");
  }, [theme.palette.type]);

  let color = isDarkTheme ? "rgba(0, 0, 0, 0.87)" : "#fff";

  const [isOpen, setIsOpen] = useState(false);
  function handleMenuClicked(event) {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    toggleDrawer(true);
  }

  function toggleDrawer(state) {
    setIsOpen(state);
  }

  const [recentQueryItems, setRecentQueryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getRecentlyModified() {
      try {
        return await getLastModified(10);
      } catch (error) {
        console.warn(
          "Error getting recently modified queries:",
          getRecentlyModified
        );
        return;
      }
    }

    function handleLoadQuery(id) {
      onLoadQuery(id);
      setIsOpen(false);
    }

    if (isOpen && !isLoading) {
      setIsLoading(true);

      getRecentlyModified().then((recentQueries) => {
        if (!!recentQueries && recentQueries.length > 0) {
          const listItems = recentQueries.map((query) => {
            const timestamp = new Date(query.dateLastModified).toLocaleString();
            const subText = `Modified: ${timestamp}`;

            return (
              <ListItem
                button
                key={query.id}
                onClick={() => handleLoadQuery(query.id)}
                className={classes.recentListItem}
              >
                <ListItemText
                  primary={query.name}
                  primaryTypographyProps={{ variant: "body2" }}
                  secondary={subText}
                />
              </ListItem>
            );
          });

          setRecentQueryItems(listItems);
        }

        setIsLoading(false);
      });

      setIsLoading(false);
    }

    return () => {
      setIsLoading(false);
    };
  }, [isOpen, isLoading, onLoadQuery, classes.recentListItem]);

  function handleSelectQuery(id) {
    onLoadQuery(id);
    setIsOpen(false);
  }

  if (!isStoreSupported) {
    return null;
  }

  return (
    <React.Fragment>
      <Grid item xs={1} className={classes.menuButtonContainer}>
        <IconButton
          type="submit"
          variant="outlined"
          color="primary"
          aria-label="Menu"
          className={classes.button}
          onClick={handleMenuClicked}
        >
          <MenuIcon style={{ color: color }} />
        </IconButton>
      </Grid>

      <MenuDrawer open={isOpen} onClose={() => toggleDrawer(false)}>
        <h1 className={classes.header1}>PS2 Query Editor</h1>

        <Divider className={classes.divider} />

        <h2 className={classes.subHeader}>Open a Query</h2>
        <QuerySelector onSelectQuery={handleSelectQuery} />

        <List
          className={classes.list}
          subheader={
            <ListSubheader
              component="div"
              id="recent-queries-subheader"
              className={classes.listSubheader}
            >
              Recent Queries
            </ListSubheader>
          }
        >
          {recentQueryItems}
        </List>
        <Divider />
      </MenuDrawer>
    </React.Fragment>
  );
}
