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

const useStyles = makeStyles((theme) => ({
  menuButtonContainer: {
    maxWidth: 20,
    marginRight: theme.spacing(2),
  },
  button: {
    margin: 0,
    padding: 0,
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
    console.log("using effect. Open:", isOpen, "Loading:", isLoading);

    async function getRecentlyModified() {
      console.log("Getting recent queries...");

      try {
        return await getLastModified(5);
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
        console.log("Recent Queries:", recentQueries);

        if (!!recentQueries && recentQueries.length > 0) {
          const listItems = recentQueries.map((query) => {
            return (
              <ListItem
                button
                key={query.id}
                onClick={() => handleLoadQuery(query.id)}
              >
                <ListItemText
                  primary={`${query.name}`}
                  secondary={new Date(query.dateLastModified).toUTCString()}
                />
              </ListItem>
            );
          });

          console.log(listItems);

          setRecentQueryItems(listItems);
        }

        setIsLoading(false);
      });

      setIsLoading(false);
    }

    return () => {
      setIsLoading(false);
    };
  }, [isOpen, isLoading, onLoadQuery]);

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
        <Divider />
        <List
          style={{ width: "auto" }}
          subheader={
            <ListSubheader component="div" id="recent-queries-subheader">
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
