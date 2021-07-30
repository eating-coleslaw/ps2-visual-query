import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { isSupported, getLastModified } from "../../persistence/queryStore";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
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

export default function MenuDrawerContainer(props) {
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
    // onMenuClicked();
  }

  function toggleDrawer(state) {
    setIsOpen(state);
  }

  const [recentQueryItems, setRecentQueryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getRecentlyModified() {
      console.log("Getting recent queries...");
  
      try {
        return await getLastModified(5);
      } catch (error) {
        console.warn("Error getting recently modified queries:", getRecentlyModified);
        return
      }
    }

    if (isOpen && !isLoading) {
      setIsLoading(true);

      getRecentlyModified().then((recentQueries) => {
        console.log("Recent Queries:", recentQueries);
        
        if (!!recentQueries && recentQueries.length > 0) {
          
          const listItems = recentQueries.map((query) => {
            return (
              <ListItem button key={query.id}>
                <ListItemText primary={query.name} secondary={new Date(query.dateLastModified).toUTCString()} />
              </ListItem>
            )
          }); 
          
          setRecentQueryItems(listItems);
        }
      });

      setIsLoading(true);
    }
  }, [isOpen, isLoading]);

  

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
        <List style={{ width: "auto" }}>
          {recentQueryItems}
        </List>
      </MenuDrawer>

      {/* <Drawer anchor="left" open={isOpen} onClose={() => toggleDrawer(false)} style={{ transition: "none" }}>
        <List style={{ width: "auto" }}>
          {recentQueryItems}
        </List>
      </Drawer> */}
    </React.Fragment>
  );
}