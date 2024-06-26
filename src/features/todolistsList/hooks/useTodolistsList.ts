import { useCallback } from "react";
import {  useAppDispatch, useAppSelector } from "../../../app/store";
import { FilterValuesType, addTodolistTC, chengeTodolistFilterAC, chengeTodolistTitleTC, removeTodolistTC } from "../todolists-reducer";


export const useTodolistsList = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(state => state.todolists)

  const removeTodoList = useCallback((todolistId: string) => {
    dispatch(removeTodolistTC(todolistId))
  }, [dispatch])
  const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
    dispatch(chengeTodolistFilterAC({filter: filter, id: todolistId}))
  }, [dispatch])
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [dispatch])
  const chengeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
    dispatch(chengeTodolistTitleTC(newTitle, todolistId))
  }, [dispatch])

  return {todolists, removeTodoList, changeFilter, addTodolist, chengeTodolistTitle}
}