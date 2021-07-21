import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function ServiceKeyForm({ serviceId, onServiceKeyChange }) {
  const classes = useStyles();

  const [serviceKey, setServiceKey] = useState(serviceId); // TODO: get service key from localStorage

  function onSubmitForm(e) {
    e.preventDefault();
    onServiceKeyChange(serviceKey);
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
