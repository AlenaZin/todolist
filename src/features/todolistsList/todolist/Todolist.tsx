import { AddItemForm } from '../../../components/addItemForm/AddItemForn';
import { EditableSpan } from '../../../components/editableSpan/EditableSpan';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { Task } from './tasks/Task';
import { useTodolist } from './hooks/useTodolist';
import { FilterValuesType, TodolistDomainType } from '../todolists-reducer';


export type TodolistPropsType = {  
  todolist: TodolistDomainType
  onChangeFilter: (value: FilterValuesType, todoListID: string) => void
  onChengeTodolistTitle: (todoListID: string, newTitle: string) => void
  onRemoveTodoList: (todoListID: string) => void
  demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {

  const {onAllClickHandler, onActiveClickHandler, onCompletedClickHandler, removeTodoList, chengeTodolistTitle, addTask, chengeTaskTitle, changeTaskStatus, removeTask, tasksForTodolist} = useTodolist(props)
  
  useEffect(()=>{
    if (demo) {
      return;
    } 
    // else {
    //   dispatch(fetchTasksTC(props.todolist.id));
    // }    
  }, [])

  return (
    <div>
      <h3 style={{ margin: "5px 0" }}>
        <EditableSpan oldTitle={props.todolist.title} onChange={chengeTodolistTitle} />
        <IconButton onClick={removeTodoList} disabled={props.todolist.entityStatus === 'loading'}>
          <Delete />
        </IconButton>
      </h3>

      <AddItemForm addItem={addTask} disablit={props.todolist.entityStatus === 'loading'}/>

      <div>
        {(tasksForTodolist || []).map((t) => (
          <Task
            key={t.id}
            task={t}
            chengeStatusHandler={changeTaskStatus}
            chengeTitleHandler={chengeTaskTitle}
            onRemoveClickHandler={removeTask}
          />
        ))}

        <div>
          <Button
            variant={props.todolist.filter === "all" ? "contained" : "text"}
            color="inherit"
            onClick={onAllClickHandler}
          >
            All
          </Button>
          <Button
            variant={props.todolist.filter === "active" ? "contained" : "text"}
            color="warning"
            onClick={onActiveClickHandler}
          >
            Active
          </Button>
          <Button
            variant={props.todolist.filter === "completed" ? "contained" : "text"}
            color="success"
            onClick={onCompletedClickHandler}
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
})



 // const addTask = () => {
  //   props.setTasks([
  //     ...props.tasks, 
  //     {
  //       title: 'Lala', 
  //       id: props.tasks.length + 1, 
  //       isDone: false
  //     }
  //   ]);
  // }

  // const names = ['Alena', 'Alena'];
  // const nameAll = ['Danya', 'Yana', ...names];
  // const [tasks,setTasks] = useState(props.tasks);
  // props.tasks.push({title: 'Lala'}) // !!! restricted
