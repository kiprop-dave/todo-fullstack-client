import { createContext, SyntheticEvent, useState } from "react";

interface ThemeInterfaceProps {
  toggleTheme: (e: SyntheticEvent) => void;
  lightMode: boolean;
}
const ThemeContext = createContext<ThemeInterfaceProps | null>(null);

type contextProps = {
  children: React.ReactNode;
};
const ThemeProvider = ({ children }: contextProps) => {
  const [lightMode, setLightMode] = useState(false);

  const toggleTheme = (e: SyntheticEvent) => {
    setLightMode((prev) => !prev);
  };

  const values = { toggleTheme, lightMode };
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
