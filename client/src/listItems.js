import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export const mainListItems = ({DashboardClick}) => (
  <React.Fragment>
    <ListItemButton onClick={DashboardClick}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Main"/>
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = ({CartClick}) => (
  <React.Fragment>
    <ListItemButton onClick={CartClick}>
        <ListItemIcon>
            <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Following" />
    </ListItemButton>
  </React.Fragment>
);
