const userPreferenceStore = (() => {
  const serviceIdKey = "DaybreakGamesKey";
  const saveServiceId = (id) => localStorage.setItem(serviceIdKey, id);
  const getServiceId = () => localStorage.getItem(serviceIdKey);
  const removeServiceId = () => localStorage.removeItem(serviceIdKey);

  const colorThemeKey = "ColorTheme";
  const saveColorTheme = (theme) => localStorage.setItem(colorThemeKey, theme);
  const getColorTheme = () => localStorage.getItem(colorThemeKey);
  const removeColorTheme = () => localStorage.removeItem(colorThemeKey);

  return {
    saveServiceId,
    getServiceId,
    removeServiceId,
    saveColorTheme,
    getColorTheme,
    removeColorTheme,
  };
})();

export default userPreferenceStore;
