import { TasksType, todolistAPI, UpdateTaskModelType } from "../../api/todolists-api"
import { TasksStateType } from "./todolist/tasks/Task"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTodolistTC, clearTodosDataAC, fetchTodolistsTC, removeTodolistTC } from "./todolists-reducer"
import { setStatusAC } from "../../app/app-reducer"
import { AppRootStateType } from "../../app/store"
import { handleServerAppError, handleNetworkAppError } from "../../utils/utils-error"

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI)=>{
  thunkAPI.dispatch(setStatusAC({status: 'loading'}))
  const res = await todolistAPI.getTasks(todolistId)
  const tasks = res.data?.items
  thunkAPI.dispatch(setStatusAC({ status: 'succeeded' }))
  return { tasks, todolistId }
})
export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: {id: string, todolistId: string}, thunkAPI)=>{
  const res = await todolistAPI.deleteTask(param.todolistId, param.id)  
    return {id: param.id, todolistId: param.todolistId}  
})
export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: {title: string, todolistId: string}, thunkAPI) => {
  thunkAPI.dispatch(setStatusAC({status: 'loading'}))
  try {
    const res = await todolistAPI.createTask(param.todolistId, param.title);
    if (res.data.resultCode === 0) {
      const task = res.data.data.item;
      thunkAPI.dispatch(setStatusAC({ status: "succeeded" }));
      return { task };
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null)
    }
  } catch(error: any) {
    handleNetworkAppError(error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue(null)
  }  
})
export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: {id: string, domainModel: UpdateDomainTaskModelType, todolistId: string}, thunkAPI) => {
  const state = thunkAPI.getState() as AppRootStateType;
  const task = state.tasks[param.todolistId].find(t => t.id === param.id)
  if(!task) {
    return thunkAPI.rejectWithValue('task not faund in the state')
  }
  const apiModel: UpdateTaskModelType = {
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    title: task.title,
    ...param.domainModel
  } 
  try{
  const res = await todolistAPI.updateTask(param.todolistId, param.id, apiModel)    
    if (res.data.resultCode === 0) {
      return param;
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  } catch(error: any) {
    handleNetworkAppError(error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue(null)
  }
})

export const tasksActions = {
  fetchTasksTC,
  removeTaskTC,
  addTaskTC,
  updateTaskTC,
}

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      delete state[action.payload.id]
    })
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      action.payload.todolist.forEach((tl) => {
        state[tl.id] = [];
      });
    })
    builder.addCase(clearTodosDataAC, () => {
      return {}
    })
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    })
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      const filtedTasks = state[action.payload.todolistId]
      const index = filtedTasks.findIndex(t => t.id === action.payload.id)
      if(index > -1) {
        filtedTasks.splice(index, 1)
      }
    })
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    })
    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      if(action.payload) {
        const filtedTasks = state[action.payload.todolistId!]
        const index = filtedTasks.findIndex(t => t.id === action.payload?.id)
        if(index > -1) {
          filtedTasks[index] = {...filtedTasks[index], ...action.payload.domainModel}
        }
      }  
    })
  }
});

export const tasksReducer = slice.reducer
export const allTasksActions = {
  ...slice.actions,
  fetchTasksTC,
  removeTaskTC,
  addTaskTC,
  updateTaskTC,
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

  // thunk 

  // export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
//   dispatch(setStatusAC({status: 'loading'}))
//   todolistAPI.getTasks(todolistId)
//   .then((res) => {
//     dispatch(setTasksAC({tasks: res.data.items, todolistId: todolistId}));
//     dispatch(setStatusAC({status: 'succeeded'}))
//   });
// }

// export const removeTaskTC = (id: string, todolistId: string) => (dispatch: Dispatch) => {
//   todolistAPI.deleteTask(todolistId, id)
//   .then(() => {
//     dispatch(removeTaskAC({id: id, todolistId: todolistId}));
//   }); 
// }
// export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
//   dispatch(setStatusAC({status: 'loading'}))
//   todolistAPI.createTask(todolistId, title)
//   .then(res => {
//     if(res.data.resultCode === 0) {
//       dispatch(addTaskAC({task: res.data.data.item}))
//       dispatch(setStatusAC({status: 'succeeded'}))
//     } else {
//       handleServerAppError(res.data, dispatch)
//     }     
//   })
//   .catch(error => {
//     handleNetworkAppError(error, dispatch)
//   })
// }
// export const updateTaskTC = (id: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => 
//   (dispatch: Dispatch, getState: () => AppRootStateType) => {

//   const state = getState();
//   const task = state.tasks[todolistId].find(t => t.id === id)
//   if(!task) {
//     //throw new Error ('task not faund in the state')
//     console.warn('task not faund in the state')
//     return
//   }
//   const apiModel: UpdateTaskModelType = {
//     description: task.description,
//     status: task.status,
//     priority: task.priority,
//     startDate: task.startDate,
//     deadline: task.deadline,
//     title: task.title,
//     ...domainModel
//   } 
//   todolistAPI.updateTask(todolistId, id, apiModel)  
//   .then(res => {
//     if (res.data.resultCode === 0) {
//       dispatch(updateTaskAC({id: id, model: domainModel, todolistId: todolistId}));
//     } else {
//       handleServerAppError(res.data, dispatch)
//     }
//   })
//   .catch(error => {
//     handleNetworkAppError(error, dispatch)
//   })
// }

// slise action: 
// addTaskAC(state, action: PayloadAction<{task: TasksType}>) {
//   state[action.payload.task.todoListId].unshift(action.payload.task)
// },

// export const updateTaskTC_ = (id: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => 
//   (dispatch: Dispatch, getState: () => AppRootStateType) => {

//   const state = getState();
//   const task = state.tasks[todolistId].find(t => t.id === id)
//   if(!task) {
//     //throw new Error ('task not faund in the state')
//     console.warn('task not faund in the state')
//     return
//   }
//   const apiModel: UpdateTaskModelType = {
//     description: task.description,
//     status: task.status,
//     priority: task.priority,
//     startDate: task.startDate,
//     deadline: task.deadline,
//     title: task.title,
//     ...domainModel
//   } 
//   todolistAPI.updateTask(todolistId, id, apiModel)  
//   .then(res => {
//     if (res.data.resultCode === 0) {
//       dispatch(updateTaskAC({id: id, model: domainModel, todolistId: todolistId}));
//     } else {
//       handleServerAppError(res.data, dispatch)
//     }
//   })
//   .catch(error => {
//     handleNetworkAppError(error, dispatch)
//   })
// }

