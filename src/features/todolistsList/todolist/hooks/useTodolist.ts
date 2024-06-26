import { useCallback } from "react";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../../../../app/store";
import { removeTaskTC, addTaskTC, updateTaskTC } from "../../tasks-reducer";
import { TodolistPropsType } from "../Todolist";
import { TaskStatuses, TasksType } from "../../../../api/todolists-api";



export const useTodolist = (
  props: TodolistPropsType
) => {
  const {todolist, onChangeFilter, onChengeTodolistTitle, onRemoveTodoList} = props
  const dispatch = useAppDispatch();
  const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[todolist.id])

  const onAllClickHandler = useCallback(() => {onChangeFilter("all", todolist.id)}, [onChangeFilter, todolist.id])
  const onActiveClickHandler = useCallback(() => {onChangeFilter("active", todolist.id)}, [onChangeFilter, todolist.id])
  const onCompletedClickHandler = useCallback(() => {onChangeFilter("completed", todolist.id)}, [onChangeFilter, todolist.id])

  const removeTodoList = () => {
    onRemoveTodoList(todolist.id)
  }
  const chengeTodolistTitle = useCallback(
    (newTitle: string) => {
      onChengeTodolistTitle(todolist.id, newTitle);
    }, [todolist.id]);
    
  const addTask = useCallback((title: string) => {
    dispatch(addTaskTC(title, todolist.id))
  }, [dispatch, todolist.id])

  const chengeTaskTitle = useCallback((id: string, title: string) => {
    dispatch(updateTaskTC(id, { title }, todolist.id))
  }, [dispatch, todolist.id])

  const changeTaskStatus = useCallback((id: string, status: TaskStatuses) => {    
    dispatch(updateTaskTC(id, { status }, todolist.id))
  }, [dispatch, todolist.id]);

  const removeTask = useCallback((id: string) => {
    dispatch(removeTaskTC(id, todolist.id))
  }, [dispatch, todolist.id])

  let tasksForTodolist: TasksType[] = tasks;

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.Completed);
  }
  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter(
      (t) => t.status === TaskStatuses.New
    );
  }
  return {
    onAllClickHandler,
    onActiveClickHandler,
    onCompletedClickHandler,
    removeTodoList,
    chengeTodolistTitle,
    addTask,
    chengeTaskTitle,
    changeTaskStatus,
    removeTask,
    tasksForTodolist,
  };
}