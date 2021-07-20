import React, { useState, useEffect } from "react";
import { InputLabel, FormControl, Select } from "@material-ui/core";
import QueryEnums from "../../planetside/QueryEnums";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectControl: {
    minWidth: 120,
    width: 120,
  },
}));

export default function LanguageSelector({ language, onChange }) {
  const classes = useStyles();
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    setLanguages(QueryEnums.Languages);
  }, []);

  const languageItems = languages.map((c) => (
    <option key={c} value={c} aria-label={c}>
      {c}
    </option>
  ));

  function handleChange(e) {
    const value = e.target.value;
    onChange(value);
  } 

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor='language-select'>Language</InputLabel>
      <Select
        native
        margin="dense"
        label="Language"
        className={classes.selectControl}
        value={language}
        onChange={handleChange}
        inputProps={{
          name: 'language',
          id: 'language-select'
        }}
      >
        <option aria-label="All" value="All">All</option>
        {languageItems}
      </Select>
    </FormControl>
  );
}
