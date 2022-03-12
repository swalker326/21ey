import { createContext, FC, useContext, useState } from "react";
import { lightTheme, darkTheme, ThemeContextType } from "../styles/theme";
import { ThemeProvider } from "styled-components";

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function useThemeContext() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("Theme context accessed outsde of provider tree");
  }
  return themeContext;
}

export const ThemeWrapper: FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");
  return (
    <ThemeContext.Provider
      value={
        currentTheme === "dark"
          ? { ...darkTheme, setCurrentTheme }
          : { ...lightTheme, setCurrentTheme }
      }
    >
      <ThemeProvider
        theme={
          currentTheme === "dark"
            ? { ...darkTheme, setCurrentTheme }
            : { ...lightTheme, setCurrentTheme }
        }
      >
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
