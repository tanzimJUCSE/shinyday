import React from 'react';
import { Box, Typography, Button, Stack, Card, CardContent } from '@mui/material';
import { NavLink } from 'react-router-dom';

function Landing() {
  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 6 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>ShineDay</Typography>
        <Typography variant="body1" paragraph>
          ShineDay is a no-frills, AI-assisted habit & mood tracker. Rate your mood once a day,
          tick a few healthy habits, and watch the simple chart reveal how small routines impact
          your wellbeing. No ads, no feeds—just insight.
        </Typography>
        <Typography variant="h6" gutterBottom>Contact</Typography>
        <Typography>Email: tanzim.mahfuz@maine.edu</Typography>
        <Typography>Phone: 207-123-4554</Typography>
        <Typography>Address: Barrows Hall, University of Maine, Orono, ME 04473</Typography>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="contained" component={NavLink} to="/signin">Sign In</Button>
          <Button variant="outlined" component={NavLink} to="/signup">Sign Up</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Landing; 