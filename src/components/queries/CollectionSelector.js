import React, { useState, useEffect } from "react";
import { InputLabel, NativeSelect, MenuItem } from "@material-ui/core";
import QueryEnums from "../../planetside/QueryEnums";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectControl: {
    minWidth: 120,
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

    console.log(value);
  } 

  return (
    <div>
      <InputLabel htmlFor="collection">Collection</InputLabel>
      <NativeSelect
        id="collection"
        className={classes.selectControl}
        value={collection}
        onChange={handleCollectionChange}
      >
        <option aria-label="None" value="">None</option>
        {collectionItems}
      </NativeSelect>
    </div>
  );
}

export default CollectionSelector;
