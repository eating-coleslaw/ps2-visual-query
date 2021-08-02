import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getAllSortedByName } from "../../persistence/queryStore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  listbox: {
    margin: 0,
    padding: "8px 0",
    overflow: "auto",
    listStyle: "none",
    maxHeight: "40vh",
    border: "1px solid #414152",
    boxSizing: "border-box",
    lineHeight: 1.25,
  },
}));

export default function QuerySelector({ onSelectQuery }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const queries = await getAllSortedByName();

        if (!!queries) {
          setOptions([]);
        }

        if (active) {
          setOptions(queries);
        }
      } catch (error) {
        console.warn("Error loading queries:", error);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="query-selector"
      className={classes.root}
      open={open}
      onChange={(event, newValue) => onSelectQuery(newValue.id)}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      ListboxProps={{ className: `${classes.listbox}` }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Query Search"
          variant="outlined"
          margin="dense"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
