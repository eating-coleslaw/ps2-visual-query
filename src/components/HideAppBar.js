import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import HideOnScroll from "./shared/HideOnScroll";
import ThemeToggle from "./shared/ThemeToggle";
import GitHubLink from "./shared/GitHubLink";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { isSupported } from "../persistence/queryStore";
// import MenuIcon from "@material-ui/icons/Menu";
// import { IconButton } from "@material-ui/core";
import MenuDrawerContainer from "./menu/MenuDrawerContainer";

// const useStyles = makeStyles((theme) => ({
//   menuButtonContainer: {
//     maxWidth: 20,
//     marginRight: theme.spacing(2),
//   },
//   button: {
//     margin: 0,
//     padding: 0,
//   },
// }));

export default function HideAppBar({ onMenuClicked, ...props }) {
  // const classes = useStyles();
  // const theme = useTheme();

  // const [isStoreSupported, setIsStoreSupported] = useState(false);
  // useEffect(() => {
  //   setIsStoreSupported(isSupported());
  // }, []);

  // const [isDarkTheme, setIsDarkTheme] = useState(theme.palette.type === "dark");
  // useEffect(() => {
  //   setIsDarkTheme(theme.palette.type === "dark");
  // }, [theme.palette.type]);

  // let color = isDarkTheme ? "rgba(0, 0, 0, 0.87)" : "#fff";

  // function handleMenuClicked(event) {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }

  //   onMenuClicked();
  // }

  return (
    <HideOnScroll {...props}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Grid container alignItems="center">
            <Grid item container xs={8} sm={6} alignItems="center">
              {/* {isStoreSupported && (
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
              )} */}
              <MenuDrawerContainer {...props} /> {/*{...props}/>*/}

              <Grid item xs={10}>
                <Typography variant="h6">PS2 Query Editor</Typography>
              </Grid>
            </Grid>

            <Grid item xs={4} sm={6} container alignItems="center">
              <Grid item container xs={12} justifyContent="flex-end">
                <GitHubLink />
                <ThemeToggle {...props} />
              </Grid>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
