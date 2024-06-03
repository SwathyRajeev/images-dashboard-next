import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#27292b' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Image Gallery
        </Typography>
        <IconButton color="inherit">
          <FavoriteIcon />
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            Lightboxes
          </Typography>
        </IconButton>
        <IconButton color="inherit">
          <ShoppingCartIcon />
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            Cart
          </Typography>
        </IconButton>
        <Button color="inherit" variant="outlined">
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
