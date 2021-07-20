import React, { useState, useEffect } from "react";
import { InputLabel, NativeSelect, MenuItem, Select, FormControl } from "@material-ui/core";
import QueryEnums from "../../planetside/QueryEnums";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectControl: {
    minWidth: 120,
    width: 250,
  },
}));

function CollectionSelector({ onCollectionChange }) {
  const classes = useStyles();
  const [collection, setCollection] = useState("character");
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setCollections(QueryEnums.Collections);
  }, []);

  const collectionItems = collections.map((c) => (
    <option key={c} value={c}>
      {c}
    </option>
  ));

  function handleCollectionChange(e) {
    const value = e.target.value;

    setCollection(value);

    onCollectionChange(value);

    // console.log(value);
  } 

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="collection-select">Collection</InputLabel>
      <Select
        native
        // id="collection"
        margin="dense"
        label="Collection"
        // variant="outlined"
        className={classes.selectControl}
        value={collection}
        onChange={handleCollectionChange}
        inputProps={{
          name: "collection",
          id: "collection-select"
        }}
      >
        {/* <option aria-label="None" value="">None</option> */}
        {collectionItems}
      </Select>
    </FormControl>
  );
}

export default CollectionSelector;
