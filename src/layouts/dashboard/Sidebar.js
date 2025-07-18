import React, { useState, useEffect } from 'react';
import {
  Box,
  useTheme,
  Stack,
  IconButton,
  Divider,
  Avatar,
  Switch,
  Menu,
  MenuItem,
} from '@mui/material';
import Logo from '../../assets/Images/logo.ico';
import { Nav_Buttons, Profile_Menu } from '../../data';
import { Gear } from 'phosphor-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useSettings from '../../hooks/useSettings';
import AntSwitch from '../../components/AntSwitch';
import { LogoutUser } from '../../redux/slices/auth';
import { useDispatch } from "react-redux";


const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return '/profile';
    case 1:
      return '/setting';
    case 2:
      return "/auth/login";
    default:
      break;
  }
};

const getPath = (index) => {
  switch (index) {
    case 0:
      return '/app';
    case 1:
      return '/group';
    case 2:
      return '/call';
    case 3:
      return '/settings';
    default:
      return '/app';
  }
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { onToggleMode } = useSettings();

  const [selected, setSelected] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // 🔄 Sync sidebar state with current URL
  useEffect(() => {
    if (location.pathname !== '/app') {
      navigate('/app', { replace: true });
    }
    setSelected(0);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box
      p={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
        height: '100vh',
        width: 100,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: '100%' }}
        spacing={3}
      >
        {/* Top section */}
        <Stack alignItems="center" spacing={4}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: 64,
              width: 64,
              borderRadius: 1.5,
            }}
          >
            <img src={Logo} alt="Logo" width="100%" height="100%" />
          </Box>

          <Stack
            sx={{ width: '100%' }}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {Nav_Buttons.map((el) =>
              el.index === selected ? (
                <Box
                  key={el.index}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1,
                    height: 48,
                    width: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconButton sx={{ width: 'max-content', color: '#fff' }}>
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  key={el.index}
                  onClick={() => {
                    setSelected(el.index);
                    navigate(getPath(el.index));
                  }}
                  sx={{
                    width: 'max-content',
                    color:
                      theme.palette.mode === 'light'
                        ? '#000'
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              )
            )}

            <Divider
              sx={{ width: '60%', backgroundColor: 'rgba(0,0,0,0.12)' }}
            />

            {selected === 3 ? (
              <Box
                sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1 }}
              >
                <IconButton sx={{ width: 'max-content', color: '#fff' }}>
                  <Gear />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => {
                  setSelected(3);
                  navigate(getPath(3));
                }}
                sx={{
                  width: 'max-content',
                  color:
                    theme.palette.mode === 'light'
                      ? '#000'
                      : theme.palette.text.primary,
                }}
              >
                <Gear />
              </IconButton>
            )}
          </Stack>
        </Stack>

        {/* Bottom controls */}
        <Stack spacing={3} direction="column" alignItems="center">
          <AntSwitch onChange={() => onToggleMode()} defaultChecked />
          <Avatar
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
          />

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Stack spacing={2}>
              {Profile_Menu.map((el,idx) => (
                <MenuItem
                  onClick={() => {
                    navigate(el.path);
                    handleClose();
                    if(idx === 2){
                       dispatch(LogoutUser());
                    }
                   
                  }}
                  key={el.title}
                >
                  <Stack
                    sx={{ width: 100 }}
                    direction="row"
                    alignItems={'center'}
                    justifyContent="space-between"
                  >
                    <span>{el.title}</span>
                    {el.icon}
                  </Stack>
                </MenuItem>
              ))}

            </Stack>
          </Menu>

        </Stack>
      </Stack>
    </Box>
  );
};

export default Sidebar;
