import React, { useContext } from 'react';
import { Box, Typography, Button, Stack, Card, CardContent } from '@mui/material';
import { NavLink, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Landing() {
  const { user } = useContext(AuthContext);
  if(user) return <Navigate to="/app" replace />;
  return (
    <Box sx={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', py:8 }}>
    <Card sx={{ maxWidth: 700, mx: 'auto', boxShadow:3 }}>
      <CardContent sx={{ textAlign: 'center', p:5 }}>
        <Typography variant="h3" gutterBottom>ShineDay</Typography>
        <Typography variant="body1" paragraph sx={{ mb:4 }}>
          ShineDay is a no-frills, AI-assisted habit & mood tracker. Rate your mood once a day,
          tick a few healthy habits, and watch the simple chart reveal how small routines impact
          your wellbeing. No ads, no feeds—just insight.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Button variant="contained" component={NavLink} to="/signin">Sign In</Button>
          <Button variant="outlined" component={NavLink} to="/signup">Sign Up</Button>
        </Stack>
        <Box sx={{ mt:6, textAlign:'left' }}>
          <Typography variant="h6" gutterBottom>Contact</Typography>
          <Typography>Email: tanzim.mahfuz@maine.edu</Typography>
          <Typography>Phone: 207-123-4554</Typography>
          <Typography>Address: Barrows Hall, University of Maine, Orono, ME 04473</Typography>
        </Box>
      </CardContent>
    </Card>
    </Box>
  );
}

export default Landing; 