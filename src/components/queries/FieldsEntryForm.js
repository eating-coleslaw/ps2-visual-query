import React, { useState } from "react";
import {
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  Chip,
} from "@material-ui/core";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0,
    padding: 0,
  },
  fieldGridItem: {
    marginTop: theme.spacing(1),
    marginBottom: 4,
    marginLeft: theme.spacing(1),
  },
  paper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    textAlign: 'center',
  },
  fieldName: {
    marginRight: theme.spacing(1),
  },
  removeFieldButton: {
    padding: 0,
  },
  chipList: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function FieldsEntryForm({
  label,
  fields,
  onAddField,
  onRemoveField,
}) {
  const classes = useStyles();

  const [inputField, setInputField] = useState("");

  function onSubmitForm(event) {
    event.preventDefault();

    if (isValidInput()) {
      setInputField("");
      onAddField(inputField.toLowerCase());
    }
  }

  function handleRemoveField(field) {
    console.log(field);
    const value = field;
    onRemoveField(value);
  }

  function isValidInput() {
    if (inputField === "") {
      return false;
    } else {
      return !fields.includes(inputField.toLowerCase());
    }
  }

  const fieldItems = fields.map((field) => {
    return (
        <li key={field}>
          <Chip
            label={field}
            onDelete={() => handleRemoveField(field)}
            className={classes.chip}
            size="small"
          />
        </li>
      // <Grid key={field} item  className={classes.fieldGridItem}>
      //   <Paper className={classes.paper}>
      //     <Grid container>

      //       <Grid item className={classes.fieldName}>
      //         {field}
      //       </Grid>
            
      //       <Grid item>
      //         <IconButton name={field} value={field} onClick={() => handleRemoveField(field)} aria-label={`Remove ${field}`} className={classes.removeFieldButton} title={`Remove ${field}`}>
      //           <DeleteOutline fontSize="small"/>
      //         </IconButton>
      //       </Grid>

      //     </Grid>
      //   </Paper>
      // </Grid>
    );
  });

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4}>
        <form noValidate autoComplete="off" onSubmit={onSubmitForm}>
          <TextField
            id="add-show-field-input"
            label={label}
            margin="dense"
            variant="outlined"
            name="show-field"
            size="small"
            onChange={(e) => setInputField(e.target.value)}
            placeholder="example"
            value={inputField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    variant="outlined"
                    color="primary"
                    disabled={!isValidInput()}
                    aria-label="Add to shown fields"
                    className={classes.button}
                  >
                    <AddCircleOutline />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Grid>
      <ul className={classes.chipList}>
        {fieldItems}
      </ul>
    </React.Fragment>
  );
}
