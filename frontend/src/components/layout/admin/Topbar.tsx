'use client';

import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';

export default function Topbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1f2937', zIndex: 1201 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Admin Panel</Typography>
        <Box>
          <IconButton color="inherit" title="Logout">
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
