import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [themeColor, setThemeColor] = useState("blue");

  useEffect(() => {
    const savedDark =
      JSON.parse(localStorage.getItem("darkMode")) ?? true;

    const savedColor =
      localStorage.getItem("themeColor") ?? "blue";

    setDarkMode(savedDark);
    setThemeColor(savedColor);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    localStorage.setItem("themeColor", themeColor);

    document.body.className = "";

    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.add("light");
    }

    document.documentElement.setAttribute(
      "data-theme",
      themeColor
    );
  }, [darkMode, themeColor]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        themeColor,
        setThemeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);