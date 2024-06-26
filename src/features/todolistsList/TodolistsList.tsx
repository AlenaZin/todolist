import {Grid, Paper } from '@mui/material';
import { AddItemForm } from '../../components/addItemForm/AddItemForn';
import { Todolist } from './todolist/Todolist';
import { useTodolistsList } from './hooks/useTodolistsList';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { useEffect } from 'react';
import { fetchTodolistsTC } from './todolists-reducer';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
  const {todolists, removeTodoList, changeFilter, addTodolist, chengeTodolistTitle} = useTodolistsList()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn]);

  useEffect(()=>{
    if (demo || !isLoggedIn) {
      return;
    } else {
      dispatch(fetchTodolistsTC());
    }
  }, [])

  return (
    <>
      <Grid container style={{ padding: "20px 10px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={5}>
        {todolists.map((tl) => {
          // console.log('=> ', { tasksForTodolist, tasksObj, tl });

          return (
            <Grid item>
              <Paper elevation={2} style={{ padding: "10px" }}>
                <Todolist
                  demo={demo}
                  key={tl.id}
                  todolist={tl}
                  onChangeFilter={changeFilter}
                  onRemoveTodoList={removeTodoList}
                  onChengeTodolistTitle={chengeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}