import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { RiMenu3Fill } from "react-icons/ri";
import navbarLogo from "../assets/navbar-logo.webp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useUser } from "../context/Store";
import toast from "react-hot-toast";
import { auth, signOut } from "../config/firebase.config";
import "../index.scss";

const pages = ["Home", "About Us", "Contact Us", "Visit Store"];
const settings = ["Dashboard", "Signup", "Signin", "Logout"];
function NavbarComp() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const user = useUser();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successfully.");
      navigate("/signin");
    } catch (error) {
      toast.error("Please try again");
    }
  };

  const handleMenuClickLeft = (page) => {
    switch (page) {
      case "Home":
        navigate("/");
        break;
      case "About Us":
        navigate("/about-us");
        break;
      case "Contact Us":
        navigate("/contact-us");
        break;
      case "Visit Store":
        navigate("/visit-store");
        break;
      default:
        break;
    }
    handleCloseNavMenu();
  };
  const handleMenuClickRight = (setting) => {
    switch (setting) {
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "Signup":
        navigate("/signup");
        break;
      case "Signin":
        navigate("/signin");
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
    handleCloseNavMenu();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ marginRight: "20px" }}>
      <AppBar position="static" className="navbar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              <img src={navbarLogo} width="150px" alt="Navbar Logo" />
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
                <RiMenu3Fill />
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
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => handleMenuClickLeft(page)}
                  >
                    <Button sx={{ color: "black" }}>{page}</Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 5,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
              }}
            >
              <img src={navbarLogo} width="150px" alt="Navbar Logo" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleMenuClickLeft(page)}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" sx={{ width: 40, height: 40 }}>
                    <LazyLoadImage
                      effect="blur"
                      src={user ? user.userPic : "/default-avatar.png"}
                      style={{
                        borderRadius: "50%",
                        width: "100%",
                        height: "100%",
                      }}
                      width="100%"
                      height="100%"
                    />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleMenuClickRight(setting)}
                  >
                    <Button
                      sx={{
                        textDecoration: "none",
                        color: "black",
                        display: index === 0 ? "block" : "inline-block",
                        marginBottom: index === settings.length - 1 ? 0 : "0px",
                      }}
                    >
                      {setting}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default NavbarComp;
