import './../App.css';
import { v1 } from 'uuid';
import { AddItemForm } from '../components/addItemForm/AddItemForn';
import { Todolist } from '../features/todolistsList/todolist/Todolist';
import { Container, Grid, Paper} from '@mui/material';
import ButtonAppBar from '../components/buttonAppBar/ButtonAppBar';
import { useTasksApp } from './hooks/useTasksApp';
import { TasksType } from '../api/todolists-api';
import { TodolistDomainType } from '../features/todolistsList/todolists-reducer';

export type FilterValuesType = "all" | "completed" | "active"
export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: TasksType[]
}

export function App() {

  const {
    tasksObj,
    setTasksObj,
    removeTasks,
    addTask,
    chengeStatus,
    chengeTaskTitle,
    onStateForNewTodolist,
    removeTasksForTodolist
  } = useTasksApp();

  const {
    todoLists,
    setTodoLists,
    removeTodoList,
    changeFilter,
    AddTodolist,
    chengeTodolistTitle,
  } = useTodolistApp(onStateForNewTodolist, removeTasksForTodolist);



  return (
    <div className="App">
      <ButtonAppBar/>
      <Container fixed>
        <Grid container style={{ padding: "20px 10px"}}>
          <AddItemForm addItem={AddTodolist} />
        </Grid>
        <Grid container spacing={5}>
          {todoLists.map(tl => {
            let tasksForTodolist = tasksObj[tl.id];

            if (tl.filter === "completed") {
              tasksForTodolist = tasksForTodolist.filter(
                (t) => t.status === 2
              );
            }
            if (tl.filter === "active") {
              tasksForTodolist = tasksForTodolist.filter(
                (t) => t.status === 0
              );
            }
            // console.log('=> ', { tasksForTodolist, tasksObj, tl });

            return (
              <Grid item>
                <Paper elevation={2} style={{ padding: "10px"}}>
                  <Todolist
                    key={tl.id}
                    todolist={tl}
                    //todolistId={tl.id}
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


function useTodolistApp(onStateForNewTodolist: (id: string) => void, removeTasksForTodolist: (id: string) => void): { todoLists: TodolistDomainType[]; setTodoLists: any; removeTodoList: any; changeFilter: any; AddTodolist: any; chengeTodolistTitle: any; } {
  throw new Error('Function not implemented.');
}

