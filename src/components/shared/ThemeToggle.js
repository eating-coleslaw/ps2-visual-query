import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import userPreferenceStore from "../../persistence/userPreferencesStore";
import "../../styles/ThemeToggle.css";

export default function ThemeToggle({ theme, onChangeTheme }) {
  function toggleTheme() {
    if (theme === "dark") {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  }

  const [twirl, setTwirl] = useState(false);

  function setLightTheme() {
    userPreferenceStore.saveColorTheme("light");
    setTwirl(true);
    onChangeTheme("light");
  }

  function setDarkTheme() {
    userPreferenceStore.saveColorTheme("dark");
    setTwirl(true);
    onChangeTheme("dark");
  }

  const isDarkTheme = theme === "dark";

  let iconClass = isDarkTheme ? "toggle-dark" : "toggle-light";
  if (twirl) {
    iconClass = `${iconClass} toggle-twirl`;
  }

  const icon = isDarkTheme ? (
    <Brightness7Icon
      className={iconClass}
      onAnimationEnd={(event) => {
        if (event.animationName === "twirl") {
          setTwirl(false);
        }
      }}
    />
  ) : (
    <Brightness4Icon
      className={iconClass}
      onAnimationEnd={(event) => {
        if (event.animationName === "twirl") {
          setTwirl(false);
        }
      }}
    />
  );

  return (
    <IconButton
      aria-label="Toggle light/dark theme"
      title="Toggle light/dark theme"
      onClick={toggleTheme}
    >
      {icon}
    </IconButton>
  );
}
