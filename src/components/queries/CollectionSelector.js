import React, { useState, useEffect } from "react";
import { InputLabel, NativeSelect, FormControl, Select } from "@material-ui/core";
import QueryEnums from "../../planetside/QueryEnums";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectControl: {
    minWidth: 120,
    width: 250,
  },
}));

export default function CollectionSelector({ collection, onChange }) {
  const classes = useStyles();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setCollections(QueryEnums.Collections);
  }, []);

  const collectionItems = collections.map((c) => (
    <option key={c} value={c}>
      {c}
    </option>
  ));

  function handleChange(e) {
    const value = e.target.value;
    onChange(value);
  } 

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="collection-select">Collection</InputLabel>
      <Select
        native
        // defaultValue={collection}
        // id="collection"
        margin="dense"
        label="Collection"
        // variant="outlined"
        className={classes.selectControl}
        value={collection}
        onChange={handleChange}
        inputProps={{
          name: "collection",
          id: "collection-select"
        }}
      >
        {collectionItems}
      </Select>
    </FormControl>
  );
}