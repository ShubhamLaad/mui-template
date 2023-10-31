import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../features/slices/userSlice';
import { HOME, RESETPASS, SIGNIN } from '../../constants/ROUTES';

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName = '' } = useSelector(
    (state) => state.userSession.sessionObj
  );

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    switch (event.target.innerText) {
      case 'Logout':
        dispatch(userLogin({}));
        navigate(SIGNIN);
        break;
      case 'Reset Password':
        navigate(RESETPASS);
        break;
      default:
    }
    setAnchorElUser(null);
  };
  const settings = [
    { option: 'Reset Password', func: handleCloseUserMenu },
    { option: 'Logout', func: handleCloseUserMenu },
  ];

  return (
    <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
      <Link to={HOME} title="home">
        <img
          src="/logo.png"
          alt="logo"
          style={{ width: '170px', display: 'block' }}
        />
      </Link>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title={userName}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar>{userName?.toUpperCase()?.slice(0, 1)}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting.option} onClick={setting.func}>
              <Typography textAlign="center">{setting.option}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Toolbar>
  );
};
