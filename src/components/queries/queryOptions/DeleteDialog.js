import React from "react";
import ConfirmationDialog from "../../shared/ConfirmationDialog";

export default function DeleteDialog({ open, onClose, onSubmit }) {
  const contentText =
    "Are you sure you want to delete this query? This action is permanent and cannot be undone.";

  return (
    <ConfirmationDialog
      open={open}
      title="Delete Query"
      text={contentText}
      confirmLabel="Delete"
      onCancel={onClose}
      onConfirm={onSubmit}
    />
  );
}
