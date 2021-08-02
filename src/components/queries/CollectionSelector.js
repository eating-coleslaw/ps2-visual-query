import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import QueryEnums from "../../planetside/QueryEnums";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectControl: {
    minWidth: 250,
  },
  listbox: {
    margin: 0,
    padding: "8px 0",
    overflow: "auto",
    listStyle: "none",
    maxHeight: "40vh",
    border: "1px solid #414152",
    boxSizing: "border-box",
  },
}));

export default function CollectionSelector({ collection, onChange }) {
  const classes = useStyles();

  const [collections, setCollections] = useState([]);
  useEffect(() => {
    setCollections(QueryEnums.Collections);
  }, []);

  function handleChange(value) {
    if (collections.includes(value)) {
      onChange(value);
    }
  }

  return (
    <Autocomplete
      id="collection-selector"
      options={collections}
      value={collection}
      autoSelect
      required
      onChange={(event, newValue) => handleChange(newValue)}
      ListboxProps={{ className: `${classes.listbox}` }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Collection"
          variant="outlined"
          margin="dense"
        />
      )}
      className={classes.selectControl}
    />
  );
}
