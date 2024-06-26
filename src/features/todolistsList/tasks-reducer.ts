import { TasksType, TodolistType, UpdateTaskModelType, todolistAPI } from "../../api/todolists-api"
import { Dispatch } from "redux"
import { AppRootStateType } from "../../app/store"
import { TasksStateType } from "./todolist/tasks/Task"
import { setStatusAC } from "../../app/app-reducer"
import { handleNetworkAppError, handleServerAppError } from "../../utils/utils-error"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { addTodolistAC, clearTodosDataAC, removeTodolistAC, setTodolistAC } from "./todolists-reducer"

const initialState: TasksStateType = {}

const slise = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    removeTaskAC(state, action: PayloadAction<{id: string, todolistId: string}>) {
      const filtedTasks = state[action.payload.todolistId]
      const index = filtedTasks.findIndex(t => t.id === action.payload.id)
      if(index > -1) {
        filtedTasks.splice(index, 1)
      }
    },
    addTaskAC(state, action: PayloadAction<{task: TasksType}>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTaskAC(state, action: PayloadAction<{id: string, model: UpdateDomainTaskModelType, todolistId: string}>) {
      const filtedTasks = state[action.payload.todolistId]
      const index = filtedTasks.findIndex(t => t.id === action.payload.id)
      if(index > -1) {
        filtedTasks[index] = {...filtedTasks[index], ...action.payload.model}
      }
    },
    setTasksAC(state, action: PayloadAction<{tasks: TasksType[], todolistId: string}>) {
      state[action.payload.todolistId] = action.payload.tasks 
    },
  },
  extraReducers: (bilder) => {
    bilder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    bilder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    bilder.addCase(setTodolistAC, (state, action) => {
      action.payload.todolist.forEach((tl) => {
        state[tl.id] = [];
      });
    })
    bilder.addCase(clearTodosDataAC, (state, action) => {
      state = {}
    })
  }
  
  // {    
  //   [addTodolistAC.type]: (state, action: PayloadAction<{todolist: TodolistType}>) => {
  //     state[action.payload.todolist.id] = []
  //   },
  //   [removeTodolistAC.type]: (state, action: PayloadAction<{id: string}>) => {
  //         delete state[action.payload.id]
  //        // return state
  //   },
  //   [setTodolistAC.type]: (state, action: PayloadAction<{todolist: TodolistType[]}>) => {
  //           action.payload.todolist.forEach(tl => {
  //             state[tl.id] = []
  //           })
  //           return state
  //   },
  //   [clearTodosDataAC.type]: (state, action: PayloadAction<{}>) => {
  //     state = {}
  //   }, 
  // }
});

export const tasksReducer = slise.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slise.actions


// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setStatusAC({status: 'loading'}))
  todolistAPI.getTasks(todolistId)
  .then((res) => {
    dispatch(setTasksAC({tasks: res.data.items, todolistId: todolistId}));
    dispatch(setStatusAC({status: 'succeeded'}))
  });
}
export const removeTaskTC = (id: string, todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTask(todolistId, id)
  .then(() => {
    dispatch(removeTaskAC({id: id, todolistId: todolistId}));
  }); 
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setStatusAC({status: 'loading'}))
  todolistAPI.createTask(todolistId, title)
  .then(res => {
    if(res.data.resultCode === 0) {
      dispatch(addTaskAC({task: res.data.data.item}))
      dispatch(setStatusAC({status: 'succeeded'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }     
  })
  .catch(error => {
    handleNetworkAppError(error, dispatch)
  })
}
export const updateTaskTC = (id: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => 
  (dispatch: Dispatch, getState: () => AppRootStateType) => {

  const state = getState();
  const task = state.tasks[todolistId].find(t => t.id === id)
  if(!task) {
    //throw new Error ('task not faund in the state')
    console.warn('task not faund in the state')
    return
  }
  const apiModel: UpdateTaskModelType = {
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    title: task.title,
    ...domainModel
  } 
  todolistAPI.updateTask(todolistId, id, apiModel)  
  .then(res => {
    if (res.data.resultCode === 0) {
      dispatch(updateTaskAC({id: id, model: domainModel, todolistId: todolistId}));
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
  .catch(error => {
    handleNetworkAppError(error, dispatch)
  })
}

// types
export type UpdateDomainTaskModelType = Partial<TasksType>;
//type TasksTypePartial = Omit<TasksType, 'id' | 'todoListId' | 'order' | 'addedDate'>;
// type ActionTasksTypes = 
//   | ReturnType<typeof removeTaskAC> 
//   | ReturnType<typeof addTaskAC> 
//   | ReturnType<typeof updateTaskAC> 
//   | ReturnType<typeof setTasksAC> 
//   | RemoveTodolistACType
//   | AddTodolistACType
//   | SetTodolistACType
//   | ClearTodosDataACType

  // export const tasksReducer = (state: TasksStateType = initialState, action: ActionTasksTypes): TasksStateType => {
    //   switch (action.type) {    
    //     case "REMOVE-TASK": {
    //       const filtedTasks = state[action.todolistId].filter(t => t.id !== action.id);
    //       return {
    //         ...state,
    //         [action.todolistId]: filtedTasks
    //       }      
    //     }
    //     case 'ADD-TASK': {
    //       let newTask = action.task
    //         return {...state, [newTask.todoListId]:[newTask, ...state[newTask.todoListId]]}
    //     }
    //     case 'UPDATE-TASK': {
    //       const updatedTask = action.model;
    //       const key = action.todolistId;
    //       const tasks = state[key].map(t => t.id === action.id ? {...t, ...updatedTask} : t);
    //       return {...state, [key]: tasks}
    //     }  
    //     case 'ADD-TODOLIST': 
    //         return {...state, [action.todolist.id]: [] }
    //     case 'REMOVE-TODOLIST': { 
    //       const stateCopy = {...state}
    //       delete stateCopy[action.id]
    //       return stateCopy
    //     }
    //     case 'SET-TODOLIST': {
    //       const stateCopy = {...state}
    //       action.payload.todolist.forEach(tl => {
    //         stateCopy[tl.id] = []
    //       })
    //       return stateCopy
    //     }
    //     case 'SET-TASKS': 
    //       return {...state, [action.todolistId]: action.tasks}  
    //     case 'CLEAR-DATA':
    //       return {}  
    //     default:
    //       return state;
    //   }
    // }
    // actions
// export const removeTaskAC = (id: string, todolistId: string) => ({ type: "REMOVE-TASK", id, todolistId } as const)
// export const addTaskAC = (task: TasksType) => ({ type: 'ADD-TASK', task } as const)
// export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, todolistId: string) => (
//   { type: 'UPDATE-TASK',id, model, todolistId} as const)
// export const setTasksAC = (tasks: TasksType[], todolistId: string) => ({ type: 'SET-TASKS', tasks, todolistId } as const)

