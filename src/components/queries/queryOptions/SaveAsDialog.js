import React from "react";
import SaveWithDialog from "./SaveWithDialog";

export default function SaveAsDialog({ open, onClose, onSubmit }) {
  return (
    <SaveWithDialog
      open={open}
      title="Save Query As..."
      text="Enter a name for the copied query."
      label="Query Name"
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
