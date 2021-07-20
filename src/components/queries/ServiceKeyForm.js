import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function ServiceKeyForm({ onServiceKeyChange }) {
  const [serviceKey, setServiceKey] = useState("example"); // TODO: get service key from localStorage

  function onSubmitForm(e) {
    e.preventDefault();
    onServiceKeyChange(serviceKey);
  }

  const classes = useStyles();

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
      />
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </form>
  );
}

export default ServiceKeyForm;
