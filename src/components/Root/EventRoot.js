import React from 'react';
import { Box } from '@mui/material';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { DETAILS, EVENTS, SHIFTS } from '../../constants/ROUTES';
import './EventRoot.scss';

const LINKS = [
  { path: DETAILS, label: 'EVENT DETAILS' },
  { path: SHIFTS, label: 'SHIFTS' },
];

function Links() {
  const { eventId } = useParams();
  return (
    <ul className={`event-list`}>
      {LINKS.map((link) => (
        <li key={link.label}>
          <NavLink
            to={`${EVENTS}/${eventId}${link.path}`}
            title={link.label}
            activeclassname="active"
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export function EventRoot() {
  return (
    <>
      <Box sx={{ width: '100%', marginBottom: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Links />
        </Box>
      </Box>
      <Outlet />
    </>
  );
}
