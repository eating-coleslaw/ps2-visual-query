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
  onClickSaveNew,
  onClickSave,
  onClickSaveAs,
  onClickNewQuery,
  onClickDelete,
  onClickRename,
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

  return (
    <Grid
      item
      container
      sm={12}
      md={8}
      justifyContent="flex-end"
      style={{ textAlign: "right" }}
    >
      {isNewQuery && (
        <React.Fragment>
          <Button
            onClick={handleClickSaveNew}
            style={{ color: theme.palette.primary.main }}
          >
            Save
          </Button>
        </React.Fragment>
      )}
      {!isNewQuery && (
        <React.Fragment>
          <Button
            onClick={() => onClickSave("")}
            style={{ color: theme.palette.primary.main }}
          >
            Save
          </Button>
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
            <MenuItem key="SaveAs" onClick={handleClickSaveAs}>
              Save As...
            </MenuItem>
            <MenuItem key="New" onClick={handleClickNewQuery}>
              New
            </MenuItem>
            <MenuItem key="Rename" onClick={handleClickRename}>
              Rename
            </MenuItem>
            <MenuItem key="Delete" onClick={handleClickDelete}>
              Delete
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </Grid>
  );
}
