import React, { useState, useEffect } from "react";
import { InputLabel, FormControl, Select, TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import QueryEnums from "../../planetside/QueryEnums";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectControl: {
    minWidth: 250,
    // width: 250,
  },
}));

export default function CollectionSelector({ collection, onChange }) {
  const classes = useStyles();
  
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    setCollections(QueryEnums.Collections);
  }, []);
  
  const [collectionItems, setCollectionItems] = useState();
  useEffect(() => {
    // For some reason, the Select's label doesn't shrink on initial page load
    // with collection 
    let copy = [ ...collections ];
    // const characterIndex = copy.indexOf("character");    
    // copy.splice(characterIndex, 1);

    setCollectionItems(copy.map((c) => (
      <option key={c} value={c} aria-label={c}>
        {c}
      </option>
    )));
  }, [collections]);

  // const collectionItems = collections.map((c) => (
  //   <option key={c} value={c} aria-label={c}>
  //     {c}
  //   </option>
  // ));

  function handleChange(value) {
    // const value = event.target.value;
    if (collections.includes(value)) {
      console.log(value);
      onChange(value);
    }
  }

  console.log('Collection:', collection);

  return (
    <Autocomplete
      id="collection-selector"
      options={collections}
      // getOptionLabel={(option) => option.toString()}
      value={collection}
      autoSelect
      required
      onChange={(event, newValue) => handleChange(newValue)}
      renderInput={(params) => <TextField {...params} label="Collection" variant="outlined" margin="dense" />}
      className={classes.selectControl}
    />
    // <FormControl required variant="outlined">
    //   {/* <InputLabel htmlFor="collection-select" shrink={true}>Collection</InputLabel> */}
    //   {/* <InputLabel htmlFor="collection-select" shrink={true} dataShrink={true}>Collection</InputLabel> */}
    //   <InputLabel margin="dense" htmlFor="collection-select">Collection</InputLabel>
    //   <Select
    //     native
    //     key="Collection Select"
    //     margin="dense"
    //     label="Collection"
    //     className={classes.selectControl}
    //     value={collection}
    //     // defaultValue={collection}
    //     onChange={handleChange}
    //     // inputProps={{
    //     //   name: "collection",
    //     //   id: "collection-select",
    //     //   // label: "Collection",
    //     //   // inputlabelprops: { shrink: true } 
    //     // }}
    //   >
    //     {/* <option aria-label="No collection selected" value="">
    //     </option> */}
    //     {/* <option aria-label="character" value="character">
    //       character
    //     </option> */}
    //     {collectionItems}
    //   </Select>
    // </FormControl>
  );
}
