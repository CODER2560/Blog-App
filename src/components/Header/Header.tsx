import React from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, Box, IconButton, Menu, MenuItem, Avatar, Badge, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const DumpLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" style={{ marginRight: 8 }}>
    <circle cx="16" cy="16" r="14" fill="#1976d2" />
    <text x="16" y="22" textAnchor="middle" fontSize="16" fill="#fff" fontFamily="Arial">D</text>
  </svg>
);

const tabRoutes = ["/feed","/dashboard", "/create"];
const tabLabels = ["Feed","Dashboard", "Create"];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabValue, setTabValue] = React.useState(0);
  const [notifAnchorEl, setNotifAnchorEl] = React.useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);

  // Set tab index based on current route
  React.useEffect(() => {
    const idx = tabRoutes.findIndex(route => location.pathname.startsWith(route));
    setTabValue(idx === -1 ? 0 : idx);
  }, [location.pathname]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    navigate(tabRoutes[newValue]);
  };

  // Notification menu
  const handleNotifOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };
  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  // Profile menu
  const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 64 }}>
        {/* Left: Logo and Website Name */}
        <Box display="flex" alignItems="center" sx={{ flex: 1 }}>
          <DumpLogo />
          <Typography fontFamily="monospace" variant="h5" color="primary" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            rewired
          </Typography>
        </Box>

        <Box sx={{ flex: 2, display: "flex", justifyContent: "center" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            centered
          >
            {tabLabels.map(label => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
        </Box>
        
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
         
          <IconButton color="inherit" onClick={handleNotifOpen}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notifAnchorEl}
            open={Boolean(notifAnchorEl)}
            onClose={handleNotifClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleNotifClose}>No new notifications</MenuItem>
          </Menu>

          {/* Profile Dropdown */}
          <Button
            onClick={handleProfileOpen}
            endIcon={profileAnchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            sx={{ ml: 2, textTransform: "none" }}
            color="inherit"
            startIcon={
              <Avatar sx={{ width: 32, height: 32 }}>
                <AccountCircleIcon />
              </Avatar>
            }
          >
            John Doe
          </Button>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;