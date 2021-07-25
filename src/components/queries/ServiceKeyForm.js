import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function ServiceKeyForm({ serviceId, onServiceKeyChange, onDeleteStoredKey }) {
  const classes = useStyles();

  const [serviceKey, setServiceKey] = useState(serviceId);

  function onSubmitForm(e) {
    e.preventDefault();
    onServiceKeyChange(serviceKey);
  }

  function onClickDelete() {
    setServiceKey("example");
    onDeleteStoredKey();
  }

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmitForm}>
      <TextField
        id="service-key"
        label="Service Key"
        margin="dense"
        variant="outlined"
        required
        name="service-key"
        onChange={(e) => setServiceKey(e.target.value)}
        placeholder="example"
        value={serviceKey}
        helperText="Omit the leading 's:'"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>

      <Button
        type="button"
        variant="outlined"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={onClickDelete}
      >
        Delete
      </Button>
    </form>
  );
}

export default ServiceKeyForm;
