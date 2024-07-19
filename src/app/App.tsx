import s from './App.module.css';
import {Container } from '@mui/material';
import ButtonAppBar from '../components/buttonAppBar/ButtonAppBar';
import LinearProgress from '@mui/material/LinearProgress';
import { ErrorSnackbar } from '../components/ErrorSnackbar';
import { AppRootStateType, useAppDispatch, useAppSelector } from './store';
import { Outlet } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { initializedAppTC } from './app-reducer';
import { selectStatus, selektInitialized } from './selectors';

type PropsType = {
  demo?: boolean
}

export function App({demo = false}: PropsType) { 
  const status = useAppSelector(selectStatus)
  const initialized = useAppSelector(selektInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(!demo) {
      dispatch(initializedAppTC())
    }    
  }, [])

  if(!initialized) {
    return (
      <Box sx={{ display: 'ruby-text', marginTop: '10%' }}>
        <CircularProgress color="warning"/>
      </Box>
    );
  }

  return (
    // <BrowserRouter>
    <div className={s.app}>
      <ErrorSnackbar />
      <ButtonAppBar />
      <div className={s.wrapperLoading}>
        {status === "loading" && <LinearProgress color="warning" />}
      </div>
      <Container fixed>
        {/* <Route exact path='/' render={()=>{<TodolistsList demo={demo}/>}}/>
          <Route path='/login' render={()=>{<Login/>}}/> */}
        <Outlet />
      </Container>
    </div>
    // </BrowserRouter>
  );
}


