import React, { useState } from "react";
import QueryMenu from "./QueryMenu";
import DeleteDialog from "./DeleteDialog";
import NewQueryDialog from "./NewQueryDialog";
import RenameDialog from "./RenameDialog";
import SaveAsDialog from "./SaveAsDialog";
import SaveNewDialog from "./SaveNewDialog";

export default function QueryOptionsContainer({
  query,
  onSaveNew,
  onSave,
  onSaveAs,
  onNewQuery,
  onDelete,
  onRename,
}) {
  const [openDialog, setOpenDialog] = useState("");

  function handleCloseDialog() {
    setOpenDialog("");
  }

  function tryOpenDialog(dialogName) {
    if (!openDialog) {
      setOpenDialog(dialogName);
    }
  }

  const handleSave = () => onSave();

  const handleSaveNew = () => tryOpenDialog("SaveNew");
  const handleSaveAs = () => tryOpenDialog("SaveAs");
  const handleOpenNew = () => tryOpenDialog("OpenNew");
  const handleDelete = () => tryOpenDialog("Delete");
  const handleRename = () => tryOpenDialog("Rename");

  const handleSaveNewSubmit = (queryName) => {
    handleCloseDialog();
    onSaveNew(queryName);
  };

  const handleSaveAsSubmit = (queryName) => {
    handleCloseDialog();
    onSaveAs(queryName);
  };

  const handleOpenNewSubmit = () => {
    handleCloseDialog();
    onNewQuery();
  };

  const handleDeleteSubmit = () => {
    handleCloseDialog();
    onDelete(query.id);
  };

  const handleRenameSubmit = (queryName) => {
    handleCloseDialog();
    onRename(queryName);
  };

  console.log("Dialog:", openDialog);

  return (
    <React.Fragment>
      <QueryMenu
        query={query}
        onClickSaveNew={handleSaveNew}
        onClickSave={handleSave}
        onClickSaveAs={handleSaveAs}
        onClickNewQuery={handleOpenNew}
        onClickDelete={handleDelete}
        onClickRename={handleRename}
      />
      <SaveNewDialog
        open={openDialog === "SaveNew"}
        onClose={handleCloseDialog}
        onSubmit={handleSaveNewSubmit}
      />
      <SaveAsDialog
        open={openDialog === "SaveAs"}
        onClose={handleCloseDialog}
        onSubmit={handleSaveAsSubmit}
      />
      <NewQueryDialog
        open={openDialog === "OpenNew"}
        onClose={handleCloseDialog}
        onSubmit={handleOpenNewSubmit}
      />
      <DeleteDialog
        open={openDialog === "Delete"}
        onClose={handleCloseDialog}
        onSubmit={handleDeleteSubmit}
      />
      <RenameDialog
        open={openDialog === "Rename"}
        onClose={handleCloseDialog}
        onSubmit={handleRenameSubmit}
      />
    </React.Fragment>
  );
}
