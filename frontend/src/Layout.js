import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from './AuthContext';

function Layout() {
  const theme = createTheme({
    palette: {
      primary: { main: '#0d47a1' }, // navy blue
      secondary: { main: '#1976d2' },
    },
  });

  const { user, logout } = React.useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ShineDay
          </Typography>
          {user && (
            <>
              <Button variant="contained" color="success" sx={{ mx: 1 }} component={NavLink} to="/app">
                Home
              </Button>
              <Button variant="outlined" color="inherit" sx={{ mx: 1, borderColor: 'white', color: 'white' }} component={NavLink} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" sx={{ mx: 1 }} onClick={logout}>Logout</Button>
            </>
          )}
          {!user && (
            <>
              <Button color="inherit" component={NavLink} to="/signin">Sign In</Button>
              <Button color="inherit" component={NavLink} to="/signup">Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default Layout; 