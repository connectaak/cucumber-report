import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const ProjectThemeProvider = ({ children }) => {
    const [mode, setMode] = React.useState("light");
    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        }
      }),
      []
    );
  
    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            mode,
          },
          overrides: {
            MuiLink: {
              root: {
                color: '#ff0000', // red
              },
            },
          },
        }),
      [mode]
    );
  
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
           
        
    );
};

export default ProjectThemeProvider;