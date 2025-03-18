import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme)").matches;
  const storedDarkMode = localStorage.getItem("darkTheme");
  if (storedDarkMode === "true") return storedDarkMode || prefersDarkMode;
};

export const AppProvider = ({ children }) => {
  const [isDartkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("cat");
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDartkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDartkTheme);
  }, [isDartkTheme]);

  return (
    <AppContext.Provider
      value={{ isDartkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
