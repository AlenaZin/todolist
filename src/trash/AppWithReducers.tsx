import { useRef, useReducer } from 'react';
import './App.css';
import { v1 } from 'uuid';
import { AddItemForm } from '../components/addItemForm/AddItemForn';
import { Todolist } from '../features/todolistsList/todolist/Todolist';
import { Container, Grid, Paper } from '@mui/material';
import ButtonAppBar from '../components/buttonAppBar/ButtonAppBar';
import { addTodolistAC, chengeTodolistFilterAC, chengeTodolistTitleAC, removeTodolistAC, todolistsReducer } from '../features/todolistsList/todolists-reducer';
import { addTaskAC, removeTaskAC, tasksReducer, updateTaskAC } from '../features/todolistsList/tasks-reducer';
import { TaskPriorityes, TaskStatuses, TasksType } from '../api/todolists-api';

export type FilterValuesType = "all" | "completed" | "active"
export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: TasksType[]
}

export function AppWithReducers() {
  const todoListId1 = useRef(v1());
  const todoListId2 = useRef(v1());

  let [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {
      id: todoListId1.current,
      title: "What to learn",
      addedDate: "",
      order: 0,
      filter: "all",
      entityStatus: 'idle'
    },
    {
      id: todoListId2.current,
      title: "What to buy",
      addedDate: "",
      order: 0,
      filter: "all",
      entityStatus: 'idle'
    },
  ]); 

  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todoListId1.current]: [
      {
        id: v1(),
        title: "CSS",
        status: TaskStatuses.New,
        priority: TaskPriorityes.Low,
        startDate: "",
        deadline: "",
        todoListId: todoListId1.current,
        order: 0,
        addedDate: "",
        description: "",
      },
      {
        id: v1(),
        title: "YTML",
        status: TaskStatuses.New,
        priority: TaskPriorityes.Low,
        startDate: "",
        deadline: "",
        todoListId: todoListId1.current,
        order: 0,
        addedDate: "",
        description: "",
      },
    ],
    [todoListId2.current]: [
      {
        id: v1(),
        title: "Milk",
        status: TaskStatuses.New,
        priority: TaskPriorityes.Low,
        startDate: "",
        deadline: "",
        todoListId: todoListId2.current,
        order: 0,
        addedDate: "",
        description: "",
      },
      {
        id: v1(),
        title: "Tea",
        status: TaskStatuses.New,
        priority: TaskPriorityes.Low,
        startDate: "",
        deadline: "",
        todoListId: todoListId2.current,
        order: 0,
        addedDate: "",
        description: "",
      },
    ],
  });

  const removeTodoList = (todolistId: string) => {
    dispatchToTodolistsReducer(removeTodolistAC({id: todolistId}))
    dispatchToTasksReducer(removeTodolistAC({id: todolistId}))
  }

  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    dispatchToTodolistsReducer(chengeTodolistFilterAC({filter: filter, id: todolistId}))
  }

  const AddTodolist = (title: string) => {
    dispatchToTodolistsReducer(addTodolistAC({todolist: {id: v1(), title, addedDate: '', order: 0}}))
    dispatchToTasksReducer(addTodolistAC({todolist: {id: v1(), title, addedDate: '', order: 0}}))
  }

  const chengeTodolistTitle = (todolistId: string, newTitle: string) => {
    dispatchToTodolistsReducer(chengeTodolistTitleAC({title: newTitle, id: todolistId}))
  }

  const removeTasks = (id: string, todolistId: string) => {
    dispatchToTasksReducer(removeTaskAC({id: id, todolistId: todolistId}))
  }

  function addTask(title: string, todolistId: string) {
    dispatchToTasksReducer(addTaskAC({task: {
      id: v1(),
      title: title,
      status: TaskStatuses.New,
      priority: TaskPriorityes.Low,
      startDate: "",
      deadline: "",
      todoListId: todolistId,
      order: 0,
      addedDate: "",
      description: "",
    }}))
  }

  const chengeStatus = (id: string, status: TaskStatuses, todolistId: string) => {
    dispatchToTasksReducer(updateTaskAC({id: id, model: {status}, todolistId: todolistId}))
  }

  const chengeTaskTitle = (todolistId: string, id: string, newTitle: string) => {
    dispatchToTasksReducer(updateTaskAC({id: id, model: {title: newTitle}, todolistId: todolistId}))
  }

  return (
    <div className="App">
      <ButtonAppBar/>
      <Container fixed>
        <Grid container style={{ padding: "20px 10px"}}>
          <AddItemForm addItem={AddTodolist} />
        </Grid>
        <Grid container spacing={5}>
          {todoLists.map((tl) => {
            let tasksForTodolist = tasksObj[tl.id];

            // if (tl.filter === "completed") {
            //   tasksForTodolist = tasksForTodolist.filter(
            //     (t) => t.status === TaskStatuses.Completed
            //   );
            // }
            // if (tl.filter === "active") {
            //   tasksForTodolist = tasksForTodolist.filter(
            //     (t) => t.status === TaskStatuses.New
            //   );
            // }
            // console.log('=> ', { tasksForTodolist, tasksObj, tl });

            return (
              <Grid item>
                <Paper elevation={2} style={{ padding: "10px"}}>
                  <Todolist
                    key={tl.id}
                    todolist={tl}
                    //title={tl.title}
                    // tasks={tasksForTodolist}
                    // removeTasks={removeTasks}
                    onChangeFilter={changeFilter}
                    // addTask={addTask}
                    // chengeTasksStatus={chengeStatus}
                    // chengeTaskTitle={chengeTaskTitle}
                    //filter={tl.filter}
                    onRemoveTodoList={removeTodoList}
                    onChengeTodolistTitle={chengeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}


