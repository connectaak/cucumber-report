import CssBaseline from '@material-ui/core/CssBaseline';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Home from './pages/Home';



const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


 export function App() {
  
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
     <Box sx={{
        display:"flex",
        justifyContent:"space-between",
        padding:"10px 20px"
        
     }}>
      <FileUpload/>
     <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
     
     </Box>
     
     <Home/>
    </Box>

  );
}

export default function ToggleColorMode() {
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
          // dark:{
          //   background:{
          //     default:"red !Important",
          //   },
          //   text:{ 
          //     primary:"white",
          //   }
          // },

        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
