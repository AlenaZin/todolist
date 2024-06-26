import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { logoutTC } from '../../features/login/auth-reducer';

export default function ButtonAppBar() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='warning'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}