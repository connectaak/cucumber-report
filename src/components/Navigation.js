import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Link, MenuItem, Typography } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Scrollspy from 'react-scrollspy';
import logo from '../assets/images/logo.png';
import { ColorModeContext } from '../context/ColoProvider';
import useReportData from "../hooks/useReportData";
import FileUpload from './FileUpload';

const Navigation = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const classes = useStyles();
  const { isSuccess } = useReportData();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


    return (
      <>
        <Box sx={{bgcolor: "background.default",display: { xs: 'none', md: 'flex' },}} className={`${classes.container} ${trigger ? classes.shadow : ''}`}>
          <NavLink activeClassName='is-active'   className={classes.text} to="/"><img className={classes.logo} src={logo} alt=''/></NavLink> 
          <Box className={classes.subContainer}>
          <NavLink activeClassName='is-active'  style={({ isActive, isPending }) => {
    return {
      color: "black",
      // background:isActive?"#FFDAB9":"white" 
    };
  }}   className={classes.text} to="/"><Typography>HOME</Typography></NavLink>
                   
          {isSuccess&&
          <>
           <NavLink style={({ isActive, isPending }) => {
    return {
      color: "black",
      background:isActive?"#0476B5":"" ,
     
    };
  }}  className={classes.text} to="/json"><Typography >JSON</Typography></NavLink>
         {location.pathname=="/"&& <Scrollspy  className={classes.spyContainer}  items={ ['counter', 'pichart', 'trendchart',"grid"] } currentClassName={classes.current}>
                      <Link sx={{color: "text.primary"}}  className={classes.text} href="#counter"><Typography >COUNTER</Typography></Link>
                      <Link sx={{color: "text.primary"}}  className={classes.text} href="#pichart"><Typography>PICHART</Typography></Link>
                      <Link sx={{color: "text.primary"}}  className={classes.text} href="#trendchart"><Typography>TRENDCHART</Typography></Link>
                      <Link sx={{color: "text.primary"}}  className={classes.text} href="#grid"><Typography>GRID</Typography></Link>
                    </Scrollspy>}
                    </>
                    }
                   
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
         
         </Box>
      
         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },justifyContent:"space-between", backgroundColor:"#FCD73C !important" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <NavLink activeClassName='is-active'   className={classes.text} to="/"><img className={classes.logoMobile} src={logo} alt=''/></NavLink> 
           <Box sx={{display:"flex"}}>
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

{location.pathname=="/"&& <Scrollspy  className={classes.spyContainerMobile}  items={ ['counter', 'pichart', 'trendchart',"grid"] } currentClassName={classes.current}>
                      <MenuItem  onClick={handleCloseNavMenu}> 
                      <Link sx={{color: "text.primary"}}  className={classes.text} href="#counter"><Typography >COUNTER</Typography>
                      </Link>
                      </MenuItem>
                      <MenuItem  onClick={handleCloseNavMenu}> 
                      <Link sx={{color: "text.primary"}}  className={classes.text} href="#pichart"><Typography>PICHART</Typography></Link>
                      </MenuItem>
                      <MenuItem  onClick={handleCloseNavMenu}> 
                      <Link sx={{color: "text.primary"}}  className={classes.text} href="#trendchart"><Typography>TRENDCHART</Typography></Link>
                      </MenuItem>
                      <MenuItem  onClick={handleCloseNavMenu}> 
                      <Link sx={{color: "text.primary"}}  className={classes.text} href="#grid"><Typography>GRID</Typography></Link>
                      </MenuItem>
                    </Scrollspy>}
              {/* {pages.map((page) => ( */}
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">heeee</Typography>
                </MenuItem>
              {/* ))} */}
            </Menu>
          </Box>
         </>
    );
};

export default Navigation;

const useStyles= makeStyles({
    container:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"0 20px",
        position: "sticky",
        top: 0,
        zIndex:"10",
        marginBottom:"10px",
        // borderRadius:"5px",
        backgroundColor:"#FCD73C !important"
        // boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
    },
    logo:{
      width:"auto",
      height:"50px",
      objectFit: "cover"
    },
    logoMobile:{
      width:"auto",
      height:"30px",
      objectFit: "cover"
    },
    subContainer:{
      display:"flex !important",
      alignItems:"center !important",
      padding:0,
      margin:0,
    },
    spyContainer:{
      display:"flex !important",
      padding:0,
      margin:0,
      // position: "relative",
      // height:"56px !important"
      // gap:"10px !important"
    },
    spyContainerMobile:{
      // display:"flex !important",
      padding:0,
      margin:0,
      // position: "relative",
      // height:"56px !important"
      // gap:"10px !important"
    },
    current:{
      background:"#0476B5 !important",
      color:"white !important",
     
    },
    shadow: {
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
    },
    text:{
      textDecoration:"none !important",
      color: "text.primary !important",
      padding:"0 8px !important",
      height:"56px !important",
      display:"flex",
      alignItems: "center",
      textAlign: "center",
      // height:"8vh !important",
      // borderRadius:"5px !important",
      // verticalAlign:"middle !important",
    // display:"table-cell !important",
      marginRight:"5px !important",
      fontWeight:"700",
      fontSize:"16px !important",
      // position: "absolute",
      // top: "50%",
      // marginTop: "-90px"
    },

  })
