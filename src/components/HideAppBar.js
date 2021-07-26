import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import HideOnScroll from "./shared/HideOnScroll";
import ThemeToggle from "./shared/ThemeToggle";
import GitHubLink from "./shared/GitHubLink";

export default function HideAppBar(props) {
  return (
    <HideOnScroll {...props}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h6">PS2 Query Editor</Typography>
            </Grid>
            <Grid item container xs={6} justifyContent="flex-end">
              <GitHubLink />
              <ThemeToggle {...props} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
