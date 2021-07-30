import React, { useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import '../../styles/MenuDrawer.css';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    zIndex: 1300,
    inset: 0,
    transition: "none",
  },
  backdrop: {
    opacity: 1,
    transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    zIndex: -1,
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  paper: {
    top: 0,
    flex: "1 0 auto",
    height: "100%",
    display: "flex",
    outline: 0,
    zIndex: 1200,
    position: "fixed",
    overflowY: "auto",
    flexDirection: "column",
    left: 0,
    right: "auto",
    borderRadius: 0,
    transform: "translateX(-300px)",
    transition: "transform 250ms cubic-bezier(.18,.89,.33,1) 0ms",
  },
}));

export default function MenuDrawer({ open, children, onClose, ...props}) {
  const classes = useStyles();

  useEffect(() => {
    const menuPaper = document.querySelector("#menu-drawer-paper");
    const backdrop = document.querySelector("#menu-drawer-backdrop");

    function handleBackdropClick(event) {
      if (event.target !== event.currentTarget) {
        return;
      }
  
      if (onClose) {
        menuPaper.classList.toggle("menu-drawer-transition");
        onClose('backdropClick');
      }
    }
  
    function handleKeyDown(event) {
      if (event.key !== 'Escape') {
        return;
      }
  
      // Swallow the event, in case someone is listening for the escape key on the body.
      event.stopPropagation();
  
      if (onClose) {
        menuPaper.classList.toggle("menu-drawer-transition");
        onClose('escapeKeyDown');
      }
    }

    if (open) {
      menuPaper.classList.toggle("menu-drawer-transition");
      
      backdrop.addEventListener("click", handleBackdropClick);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      menuPaper?.classList.toggle("menu-drawer-transition");

      backdrop?.removeEventListener("click", handleBackdropClick);
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [ open, onClose ]);

  if (!open) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div id="menu-drawer-backdrop" className={classes.backdrop}></div>
      <Paper id="menu-drawer-paper" className={classes.paper} style={{ transform: "translateX(-300px)"  }}>
        {children}
      </Paper>
    </div>
  );
}