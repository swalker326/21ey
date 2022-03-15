import { FC, useState } from "react";
import { lightTheme, darkTheme } from "../styles/theme";
import { ThemeProvider } from "styled-components";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ThemeWrapper: FC = ({ children }) => {
  const [localColorMode, setLocalColorMode] = useLocalStorage<"dark" | "light">(
    "21ey_color_mode",
    "dark",
  );
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">(
    localColorMode,
  );
  const handleColorModeChange = () => {
    setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
    setLocalColorMode(currentTheme === "dark" ? "light" : "dark");
  };
  return (
    <ThemeProvider
      theme={
        currentTheme === "dark"
          ? { ...darkTheme, handleColorModeChange }
          : { ...lightTheme, handleColorModeChange }
      }
    >
      {children}
    </ThemeProvider>
  );
};
