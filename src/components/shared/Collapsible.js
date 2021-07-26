import { Grid, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  header1: {
    margin: 0,
    fontSize: "1.4em",
    fontWeight: 500,
    width: "100%",
    marginBottom: -4,
  },
  header2: {
    margin: 0,
    fontSize: "1.2em",
    fontWeight: 500,
    width: "100%",
  },
  header3: {
    margin: 0,
    fontSize: "1.1em",
    fontWeight: 500,
    width: "100%",
    marginBottom: 2,
  },
  headerContainer: {
    marginBottom: theme.spacing(1),
  },
  headerContainerCollapsed: {
    paddingBottom: theme.spacing(1),
    borderBottom: "1px solid #919cb950",
  },
  toggleContainer: {
    textAlign: "right",
    borderBottom: "1px solid #919cb950",
  },
  toggleButton: {
    padding: theme.spacing(0.5),
  },
  toggle: {
    transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  toggleCollapsed: {
    transform: "rotateZ(180deg)",
  },
  content: {
    width: "100%",
    display: "none",
  },
  contentOpen: {
    width: "100%",
  },
}));

export default function Collapsible({
  headerLevel,
  headerText,
  defaultExtended,
  children,
  id,
  ...props
}) {
  const classes = useStyles();

  if (typeof headerLevel !== "number" || headerLevel < 0 || headerLevel > 6) {
    throw new Error("headerLevel must be an integer between 1 and 6");
  }

  const headerEl = React.createElement(
    `h${headerLevel}`,
    { className: classes[`header${headerLevel}`] },
    headerText
  );

  const [extended, setExtended] = useState(defaultExtended);

  function handleToggle() {
    setExtended(!extended);
  }

  function getToggleLabel() {
    return extended ? "Collapse Section" : "Expand Section";
  }

  function getToggleClassName() {
    return extended
      ? classes.toggle
      : `${classes.toggle} ${classes.toggleCollapsed}`;
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.headerContainer}
      >
        <Grid item xs={10} className={classes.headerContainerCollapsed}>
          {headerEl}
        </Grid>
        <Grid item xs={2} className={classes.toggleContainer}>
          <IconButton
            aria-label={getToggleLabel}
            onClick={handleToggle}
            className={classes.toggleButton}
          >
            <ExpandMoreIcon className={`${getToggleClassName()}`} />
          </IconButton>
        </Grid>
      </Grid>

      <div
        id={`collapsible-content-${id}`}
        className={extended ? classes.contentOpen : classes.content}
      >
        {children}
      </div>
    </div>
  );
}
