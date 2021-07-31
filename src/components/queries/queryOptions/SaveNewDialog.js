import React from "react";
import SaveWithDialog from "./SaveWithDialog";

export default function SaveNewDialog({ open, onClose, onSubmit }) {
  return (
    <SaveWithDialog
      open={open}
      title="Save New Query"
      text="Enter a name for the new query."
      label="Query Name"
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
