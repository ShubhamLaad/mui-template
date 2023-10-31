import * as React from 'react';
import { useGetAPIQuery } from './homeSliceAPI';
import { COUNTERS, DEVICES, EVENTS, STORES } from '../../constants/ROUTES';
import { Info } from '../../components/Info/Info';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TabletAndroidOutlinedIcon from '@mui/icons-material/TabletAndroidOutlined';
import { red } from '@mui/material/colors';
const tiers = [
  {
    title: 'Events',
    key: 'events',
    path: EVENTS,
    icon: <AccessTimeIcon sx={{ color: red[600] }} />,
  },
  {
    title: 'Stores',
    key: 'stores',
    path: STORES,
    icon: <LocalGroceryStoreIcon sx={{ color: red[600] }} />,
  },
  {
    title: 'Counters',
    key: 'counters',
    path: COUNTERS,
    icon: <AccountCircleOutlinedIcon sx={{ color: red[600] }} />,
  },
  {
    title: 'Devices',
    key: 'devices',
    path: DEVICES,
    icon: <TabletAndroidOutlinedIcon sx={{ color: red[600] }} />,
  },
  {
    title: 'Events in Progress',
    color: 'red',
    key: 'events_in_progress',
  },
  {
    title: 'Events Scheduled',
    color: 'red',
    key: 'events_scheduled',
  },
  {
    title: 'Branches',
    color: 'red',
    key: 'branches',
  },
];

export function HomePage() {
  const { data, isLoading } = useGetAPIQuery();
  return (
    <React.Fragment>
      <Info data={data} isLoading={isLoading} tiers={tiers} />
    </React.Fragment>
  );
}
