import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  SmartToy as AIIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { initializeApp } from 'firebase/app';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import AIPage from './AIPage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp7Y_rs8IFz5tRFfFuw-sR1TOXRiqgmL8",
  authDomain: "plant-monitoring-system-8636c.firebaseapp.com",
  projectId: "plant-monitoring-system-8636c",
  storageBucket: "plant-monitoring-system-8636c.appspot.com",
  messagingSenderId: "739518529830",
  appId: "1:739518529830:web:148c896865c615134101e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#4caf50',
          },
          secondary: {
            main: '#2196f3',
          },
        },
      }),
    [prefersDarkMode],
  );

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'AI', icon: <AIIcon />, path: '/ai' },
  ];

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const NavButtons = () => {
    const location = useLocation();
    const theme = useTheme();

    return (
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        {menuItems.map((item) => (
          <Button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              color: 'white',
              mx: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
              ...(location.pathname === item.path && {
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
              }),
            }}
            startIcon={item.icon}
          >
            {item.text}
          </Button>
        ))}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, display: { sm: 'none' } }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Plant Monitoring System
              </Typography>
              <NavButtons />
            </Toolbar>
          </AppBar>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai" element={<AIPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;