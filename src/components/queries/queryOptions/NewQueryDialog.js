import React from "react";
import ConfirmationDialog from "../../shared/ConfirmationDialog";

export default function NewQueryDialog({ open, onClose, onSubmit }) {
  const contentText =
    "Opening a new query will erase all unsaved changes. Are you sure you want to continue?";

  return (
    <ConfirmationDialog
      open={open}
      title="New Query"
      text={contentText}
      confirmLabel="Open New"
      onCancel={onClose}
      onConfirm={onSubmit}
    />
  );
}
