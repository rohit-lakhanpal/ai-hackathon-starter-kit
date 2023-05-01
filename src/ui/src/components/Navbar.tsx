import { FC, ReactElement, useEffect, useState } from "react";
import {  
  Box,
  Link,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { routes } from "../utilities/routes";
import { NavLink } from "react-router-dom";
import { infoService } from "../services/infoService";
import logo from "../assets/logo.png";

// Create a functional component called AppLogo
const AppLogo: FC = (): ReactElement => {
  const [about, setAbout] = useState<any>({});
  const [pageTitle, setPageTitle] = useState<string>("");

  useEffect(() => {
    (async () => {                          
        try{
            const about = await infoService.getAppInfoAsync();
            if(about?.faviconOptional)
              document.querySelector("link[rel~='icon']")?.setAttribute("href", about.faviconOptional);

            // Get page title from the route
            var route = routes.find((r) => r.path === window.location.pathname);
            if(route)
              setPageTitle(route.title);
            else
              setPageTitle("Home");
        }
        catch {
            setAbout({});
        }
    })();
  }, []);

  useEffect(() => {
    // Get page title from the route
    var route = routes.find((r) => r.path === window.location.pathname);
    if(route)
      setPageTitle(route.title);
    else
      setPageTitle("Home");
  }, []);



  return (<>
    <Box
      component="img"
      sx={{
        padding: about?.logoOptional?.endsWith(".svg") ? "0.5rem" : "0.1rem",                           
        overflow: "auto",
        maxHeight: {
          xs: about?.logoOptional?.endsWith(".svg") ? "3.2rem" : "3.2rem",
          sm: about?.logoOptional?.endsWith(".svg") ? "3.4rem" : "3.4rem",
          md: about?.logoOptional?.endsWith(".svg") ? "3.6rem" : "5rem",
          lg: about?.logoOptional?.endsWith(".svg") ? "3.8rem" : "5rem",
          xl: about?.logoOptional?.endsWith(".svg") ? "4rem" : "5rem",
        },
        // Hide the logo when the screen is extra small
        display: { xs: "none", sm: "block", md: "block" },
      }}
      alt={about?.name}
      src={about?.logoOptional || logo}
    />
    {/* When the screen is extra small, Display the page header */}
    <Typography
      variant="h3"
      noWrap
      component="div"
      sx={{
        flexGrow: 1,
        display: { xs: "block", sm: "none", md: "none" },
        margin: "0.25rem",
      }}
    >
      {pageTitle}
    </Typography>

  </>)
};

const Navbar: FC = (): ReactElement => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>          
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          > 
            <AppLogo />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {routes.map((page) => (
                <Link
                  key={page.key}
                  component={NavLink}
                  to={page.path}
                  color="black"
                  underline="none"
                  variant="button"
                  hidden={page.enabled ? false : true}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"            
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, margin: "0.25rem" }}
          >
            <AppLogo />      
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              {routes.map((page) => (
                <Link
                  key={page.key}
                  component={NavLink}
                  to={page.path}
                  color="black"
                  underline="none"
                  variant="button"                  
                  hidden={page.enabled ? false : true}
                  sx={{ fontSize: "large", marginLeft: "2rem" }}
                >
                  {page.title}
                </Link>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Navbar;