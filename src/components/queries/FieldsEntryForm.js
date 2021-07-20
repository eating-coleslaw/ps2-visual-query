import React, { useState } from "react";
import {
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  Hidden,
} from "@material-ui/core";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0, //theme.spacing(1),
    padding: 0,
  },
  inlinePaper: {
    // maxWidth: 140,
    marginTop: theme.spacing(1),
    marginBottom: 4,
    whiteSpace: "nowrap",
    // padding: "10.5px 0 10.5px 14px",
  },
  paperGrid: {
    padding: "10.5px 0 10.5px 14px",
    lineHeight: "1.1876em",
    height: "1.1876em",
  },
  paperButton: {
    margin: 0,
    padding: 0,
    display: "inline-block",
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
  }
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
      onAddField(inputField);
    }
  }

  function handleRemoveField(field) {
    console.log(field);
    
    const value = field; //event.target.value;
    onRemoveField(value);
  }

  function isValidInput() {
    if (inputField === "") {
      return false;
    } else {
      return !fields.includes(inputField);
    }
  }

  const fieldItems = fields.map((field) => {
    return (
      <Grid key={field} item  className={classes.fieldGridItem}>
        <Paper className={classes.paper}>
          <Grid container>

            <Grid item className={classes.fieldName}>
              {field}
            </Grid>
            
            <Grid item>
              <IconButton name={field} value={field} onClick={() => handleRemoveField(field)} aria-label={`Remove ${field}`} className={classes.removeFieldButton} title={`Remove ${field}`}>
                <DeleteOutline fontSize="small"/>
              </IconButton>
            </Grid>

          </Grid>
        </Paper>
      </Grid>
      // <Grid item key={field}>
      //   <Paper
      //     // style={{ width: 140 }}
      //     className={classes.inlinePaper}
      //     // margin="dense"
      //   >
      //     {/* <Grid item container className={classes.paperGrid}> */}
      //     <Grid item container className={classes.inlinePaper}>
      //       <Grid item className={classes.paperGrid}>
      //         <span
      //           title={field}
      //           style={{
      //             maxWidth: "120px",
      //             overflow: "hidden",
      //             textOverflow: "ellipses",
      //             display: "inline-block",
      //           }}
      //         >
      //           {field}
      //         </span>
      //       </Grid>
      //       <Grid item xs className={classes.paperGrid}>
      //         <IconButton
      //           className={classes.paperButton}
      //           value={field}
      //           onClick={handleRemoveField}
      //           aria-label="Delete"
      //           color="primary"
      //         >
      //           <DeleteOutline style={{ padding: 0 }} />
      //         </IconButton>
      //       </Grid>
      //     </Grid>
      //   </Paper>
      // </Grid>
    );
  });

  return (
    // <Grid item container xs={12} justifyContent="flex-start" alignItems="center">
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4}>
        <form noValidate autoComplete="off" onSubmit={onSubmitForm}>
          <TextField
            id="add-show-field-input"
            label={label}
            margin="dense"
            variant="outlined"
            name="show-field"
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
                    // size="small"
                    disabled={!isValidInput()}
                    aria-label="Add to shown fields"
                    className={classes.button}
                    // startIcon={<AddCircleOutline />}
                  >
                    <AddCircleOutline />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* <IconButton
          type="submit"
          variant="outlined"
          color="primary"
          size="large"
          aria-label="Add a show field"
          className={classes.button}
          // startIcon={<AddCircleOutline />}
        >
          <AddCircleOutline />
        </IconButton> */}
        </form>
      </Grid>
      {fieldItems}
      {/* <Grid item xs>
      </Grid> */}
    </React.Fragment>
    // </Grid>
  );
}
