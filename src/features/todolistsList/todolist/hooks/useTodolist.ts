import { useCallback } from "react";
import { useSelector } from "react-redux";
import { AppRootStateType, useActions, useAllActions, useAppDispatch } from "../../../../app/store";
import { TodolistPropsType } from "../Todolist";
import { TaskStatuses, TasksType } from "../../../../api/todolists-api";
import { tasksActions } from "../..";


export const useTodolist = (
  props: TodolistPropsType
) => {
  const {todolist, onChangeFilter, onChengeTodolistTitle, onRemoveTodoList} = props
  const dispatch = useAppDispatch();
  // const {addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC} = useActions(tasksActions)
  const {addTaskTC, removeTaskTC, updateTaskTC} = useAllActions()
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
    addTaskTC({title, todolistId: todolist.id})
  }, [dispatch, todolist.id])

  const chengeTaskTitle = useCallback((id: string, title: string) => {
    updateTaskTC({id, domainModel: { title }, todolistId: todolist.id})
  }, [dispatch, todolist.id])

  const changeTaskStatus = useCallback((id: string, status: TaskStatuses) => {    
    dispatch(updateTaskTC({id, domainModel: { status }, todolistId: todolist.id}))
  }, [dispatch, todolist.id]);

  const removeTask = useCallback((id: string) => {
    removeTaskTC({id, todolistId: todolist.id})
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