import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function SaveWithDialog({
  open,
  title,
  text,
  label,
  onClose,
  onSubmit,
}) {
  const [queryName, setQueryName] = useState("");

  function isValidName() {
    return !!queryName;
  }

  function handleSubmit() {
    if (isValidName) {
      onSubmit(queryName);
      setQueryName("");
    }
  }

  function handleCancel() {
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label={label}
          type="text"
          required
          fullWidth
          value={queryName}
          onChange={(event) => setQueryName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isValidName()}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
