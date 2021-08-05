import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useTheme } from "@material-ui/core";

export default function QueryMenu({
  query,
  isSavingEnabled,
  onClickSaveNew,
  onClickSave,
  onClickSaveAs,
  onClickNewQuery,
  onClickDelete,
  onClickRename,
  onClickImport,
}) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isNewQuery, setIsNewQuery] = useState(query.id === null);
  useEffect(() => {
    setIsNewQuery(query.id === null);
  }, [query.id]);

  function handleIconClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function handleClickSaveNew() {
    handleCloseMenu();
    onClickSaveNew();
  }

  function handleClickSaveAs() {
    handleCloseMenu();
    onClickSaveAs();
  }

  function handleClickNewQuery() {
    handleCloseMenu();
    onClickNewQuery();
  }

  function handleClickDelete() {
    handleCloseMenu();
    onClickDelete();
  }

  function handleClickRename() {
    handleCloseMenu();
    onClickRename();
  }

  function handleClickImport() {
    handleCloseMenu();
    onClickImport();
  }

  return (
    <Grid
      item
      container
      xs={5}
      sm={5}
      md={5}
      justifyContent="flex-end"
      alignItems="center"
      style={{ textAlign: "right" }}
    >
      {isNewQuery && isSavingEnabled && (
        <React.Fragment>
          <Button
            onClick={handleClickSaveNew}
            style={{ color: theme.palette.primary.main }}
          >
            Save
          </Button>
        </React.Fragment>
      )}
        <React.Fragment>
        {!isNewQuery && isSavingEnabled && (
          <Grid item>
            <Button
              onClick={() => onClickSave("")}
              style={{ color: theme.palette.primary.main }}
            >
              Save
            </Button>
          </Grid>)}
          
          <Grid item>
            <IconButton
              aria-label="More query options"
              aria-controls="query-options-menu"
              aria-haspopup={true}
              onClick={handleIconClick}
            >
              <MoreVertIcon />
            </IconButton>
            
            <Menu
              id="query-options-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleCloseMenu}
            >
              {isSavingEnabled && !isNewQuery &&
              <MenuItem key="SaveAs" onClick={handleClickSaveAs}>
                Save As...
              </MenuItem>}
              
              <MenuItem key="New" onClick={handleClickNewQuery}>
                New
              </MenuItem>
              
              {isSavingEnabled && !isNewQuery &&
              <MenuItem key="Rename" onClick={handleClickRename}>
                Rename
              </MenuItem>}
              
              {isSavingEnabled && !isNewQuery &&
              <MenuItem key="Delete" onClick={handleClickDelete}>
                Delete
              </MenuItem>}
              
              <MenuItem key="Import" onClick={handleClickImport}>
                Import
              </MenuItem>
            </Menu>
          </Grid>
        </React.Fragment>
    </Grid>
  );
}
