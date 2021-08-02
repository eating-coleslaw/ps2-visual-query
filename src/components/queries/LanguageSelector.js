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

  const [optionItems, setOptionItems] = useState([]);
  useEffect(() => {
    const allItem = (
      <option ket="All" aria-label="All" value="All">
        All
      </option>
    );

    const languageItems = QueryEnums.Languages.map((lang) => (
      <option key={lang} value={lang} aria-label={lang}>
        {lang}
      </option>
    ));

    setOptionItems([allItem, ...languageItems]);
  }, []);

  function handleChange(event) {
    const value = event.target.value;
    onChange(value);
  }

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="language-select">Language</InputLabel>
      <Select
        native
        margin="dense"
        label="Language"
        className={classes.selectControl}
        value={language}
        onChange={handleChange}
        inputProps={{
          name: "language",
          id: "language-select",
        }}
      >
        {optionItems}
      </Select>
    </FormControl>
  );
}
