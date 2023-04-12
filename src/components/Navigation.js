import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { ColorModeContext } from '../context/ColoProvider';
import FileUpload from './FileUpload';

const Navigation = () => {
    const theme = useTheme();
   const colorMode = React.useContext(ColorModeContext);
   const classes=useStyles()
    return (
        <Box className={classes.container}>
          <FileUpload/>
         <IconButton
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
    );
};

export default Navigation;

const useStyles= makeStyles({
    container:{
        display:"flex",
        justifyContent:"space-between",
        padding:"10px 20px"
    }
  })