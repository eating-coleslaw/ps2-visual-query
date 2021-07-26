import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import GitHubIcon from "@material-ui/icons/GitHub";
import "../../styles/ThemeToggle.css";
import { useTheme } from "@material-ui/core/styles";

export default function GitHubLink() {
  const theme = useTheme();

  const gitHubUrl = "https://github.com/eating-coleslaw/ps2-visual-query";

  const [isDarkTheme, setIsDarkTheme] = useState(theme.palette.type === "dark");
  useEffect(() => {
    setIsDarkTheme(theme.palette.type === "dark");
  }, [theme.palette.type]);

  let color = isDarkTheme ? "rgba(0, 0, 0, 0.87)" : "#fff";

  return (
    <Link to={gitHubUrl} href={gitHubUrl} target="_blank" rel="noreferrer">
      <IconButton
        aria-label="Go to GitHub repository"
        title="Go to GitHub repository"
      >
        <GitHubIcon style={{ color: color }} />
      </IconButton>
    </Link>
  );
}
