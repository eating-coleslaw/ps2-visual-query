import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ThemeToggle from "./shared/ThemeToggle";
import GitHubLink from "./shared/GitHubLink";
import MenuDrawerContainer from "./menu/MenuDrawerContainer";

export default function StaticAppBar({ onMenuClicked, ...props }) {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container alignItems="center">
          <Grid item container xs={8} sm={6} alignItems="center">
            <MenuDrawerContainer {...props} />

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
  );
}
