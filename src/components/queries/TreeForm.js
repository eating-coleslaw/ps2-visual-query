import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextFormWithSave from "../shared/TextFormWithSave";
import BooleanSelector from "../shared/BooleanSelector";

const useStyles = makeStyles((theme) => ({
  gridRow: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
}));

export default function TreeForm({ tree, onChange }) {
  const classes = useStyles();

  function handleChangeTreeField(value) {
    onChange("treeField", value);
  }

  function handleChangeStartField(value) {
    onChange("startField", value);
  }

  function handleChangePrefix(value) {
    onChange("groupPrefix", value);
  }

  function handleChangeIsList(value) {
    onChange("isList", value);
  }

  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.gridRow}
      >
        <Grid item sm={12} md={6}>
          <TextFormWithSave
            label="Tree Field"
            initValue={tree.treeField}
            onChange={handleChangeTreeField}
          />
        </Grid>

        <Grid item sm={12} md={6}></Grid>
        <TextFormWithSave
          label="Start Field"
          initValue={tree.startField}
          onChange={handleChangeStartField}
        />
      </Grid>

      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.gridRow}
      >
        <Grid item xs={6} sm={3}>
          <BooleanSelector
            label="Is List"
            initValue={tree.isList}
            onChange={handleChangeIsList}
          />
        </Grid>

        <Grid item xs={6} sm={9}>
          <TextFormWithSave
            label="Group Prefix"
            initValue={tree.groupPrefix}
            onChange={handleChangePrefix}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
