import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TabletAndroidOutlinedIcon from '@mui/icons-material/TabletAndroidOutlined';
import { red } from '@mui/material/colors';
import { COUNTERS, DEVICES, EVENTS, STORES } from '../../constants/ROUTES';
import { NavLink } from 'react-router-dom';
import { List } from '@mui/material';
import './EventRoot.scss';

const LINKS = [
  {
    path: EVENTS,
    label: 'Events',
    icon: <AccessTimeIcon sx={{ color: red[600] }} />,
  },
  {
    path: STORES,
    label: 'Stores',
    icon: <LocalGroceryStoreIcon sx={{ color: red[600] }} />,
  },
  {
    path: COUNTERS,
    label: 'Counters',
    icon: <AccountCircleOutlinedIcon sx={{ color: red[600] }} />,
  },
  {
    path: DEVICES,
    label: 'Devices',
    icon: <TabletAndroidOutlinedIcon sx={{ color: red[600] }} />,
  },
];

function Links() {
  return (
    <List component="nav" className={`drawer-list`}>
      {LINKS.map((link) => (
        <ListItemButton key={link.label}>
          <NavLink
            to={link.path}
            title={link.label}
            activeclassname="active"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.label} />
          </NavLink>
        </ListItemButton>
      ))}
    </List>
  );
}

export const DrawerItems = () => {
  return (
    <>
      <Links />
    </>
  );
};
