import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Typography } from "@material-ui/core";
import parseQueryUrl from "../../../planetside/queryUrlParsing/queryUrlParser";

export default function ImportUrlDialog({ open, onClose, onSubmit }) {
  const [queryUrl, setQueryUrl] = useState("");

  function isValidInput() {
    return !!queryUrl && !errorText;
  }

  const [errorText, setErrorText] = useState("");
  function handleSubmit() {
    try {
      const queryModel = parseQueryUrl(queryUrl);

      if (!!queryModel) {
        setErrorText("");
        setQueryUrl("");
        onSubmit(queryModel);
      } else {
        setErrorText("Query URL could not be parsed");
      }
    } catch (error) {
      setErrorText(`Error parsing query URL: ${error}`);
    }
  }

  function handleCancel() {
    onClose();
  }

  function handleChange(event) {
    setQueryUrl(event.target.value);
    setErrorText("");
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Import Query URL</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter a query URL to open in the editor
        </DialogContentText>

        <TextareaAutosize
          autoFocus
          required
          style={{ width: "100%" }}
          value={queryUrl}
          onChange={handleChange}
        />

        {errorText && (
          <Typography color="error" variant="body2" style={{ width: "100%" }}>
            {errorText}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isValidInput()}
          color="primary"
        >
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
}
