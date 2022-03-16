import { FC, useState } from "react";
import { defaultTheme } from "../styles/theme";
import { ThemeProvider } from "styled-components";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ThemeWrapper: FC = ({ children }) => {
  const [localColorMode, setLocalColorMode] = useLocalStorage<"dark" | "light">(
    "21ey_color_mode",
    "dark",
  );
  const [currentThemeMode, setCurrentThemeMode] = useState<"dark" | "light">(
    localColorMode,
  );
  const [currentTheme, setCurrentTheme] = useState({
    ...defaultTheme,
    mode: currentThemeMode,
  });
  const handleColorModeChange = () => {
    setCurrentTheme({
      ...currentTheme,
      mode: currentTheme.mode === "dark" ? "light" : "dark",
    });
    setCurrentThemeMode(currentThemeMode === "dark" ? "light" : "dark");
    setLocalColorMode(currentThemeMode === "dark" ? "light" : "dark");
  };
  return (
    <ThemeProvider theme={{ ...currentTheme, handleColorModeChange }}>
      {children}
    </ThemeProvider>
  );
};
