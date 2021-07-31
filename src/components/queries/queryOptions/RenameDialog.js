import React from "react";
import SaveWithDialog from "./SaveWithDialog";

export default function RenameDialog({ open, onClose, onSubmit }) {
  return (
    <SaveWithDialog
      open={open}
      title="Rename Query"
      text="Enter a new name for the query"
      label="Query Name"
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
