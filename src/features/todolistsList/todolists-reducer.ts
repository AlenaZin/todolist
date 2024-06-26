import { TodolistType, todolistAPI } from "../../api/todolists-api"
import { Dispatch } from "redux"
import { RequestStatusType,  setStatusAC } from "../../app/app-reducer"
import { handleNetworkAppError } from "../../utils/utils-error"
import { fetchTasksTC } from "./tasks-reducer"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: TodolistDomainType[] = []

const slise = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{id: string}>) { 
      const index = state.findIndex(f => f.id === action.payload.id)
      if(index > -1) {
        state.splice(index, 1)
      }
    },
    addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>) { 
      state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})     
    },
    chengeTodolistTitleAC(state, action: PayloadAction<{title: string, id: string}>) {
      const index = state.findIndex(f => f.id === action.payload.id)
      state[index].title = action.payload.title
    },
    chengeTodolistFilterAC(state, action: PayloadAction<{filter: FilterValuesType, id: string}>) { 
      const index = state.findIndex(f => f.id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    setTodolistAC(state, action: PayloadAction<{todolist: TodolistType[]}>) {
      return action.payload.todolist.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}));
    },
    chengeTodolistEntityStatusAC(state, action: PayloadAction<{entityStatus: RequestStatusType, id: string}>) {
      const index = state.findIndex(f => f.id === action.payload.id)
      state[index].entityStatus = action.payload.entityStatus
    },
    clearTodosDataAC(state, action: PayloadAction<{}>) {
      state = []
    }
  },
});

export const todolistsReducer = slise.reducer
export const {removeTodolistAC, addTodolistAC, chengeTodolistTitleAC, chengeTodolistFilterAC, setTodolistAC, chengeTodolistEntityStatusAC, clearTodosDataAC} = slise.actions

// thunks
export const fetchTodolistsTC = () => (dispatch: any) => {
  dispatch(setStatusAC({status: 'loading'}))
  todolistAPI.getTodolists()
  .then(res => {
    dispatch(setTodolistAC({todolist: res.data}))
    dispatch(setStatusAC({status: 'succeeded'})) 
    return res.data
  })
  .then(todos => {
    todos.forEach(td => {
      dispatch(fetchTasksTC(td.id))
    })
  })
  .catch(error => {
    handleNetworkAppError(error, dispatch)
  })
}
export const removeTodolistTC = (todoListId: string) => (dispatch: Dispatch) => {
  dispatch(setStatusAC({status: 'loading'}))
dispatch(chengeTodolistEntityStatusAC({entityStatus: "loading", id: todoListId}))
  todolistAPI.deleteTodolist(todoListId)
  .then(res => {
    dispatch(removeTodolistAC({id: todoListId}))
    dispatch(setStatusAC({status: 'succeeded'}))
  })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistAPI.createTodolist(title)
  .then(res => {
    dispatch(addTodolistAC({todolist: res.data.data.item}))
  })
}
export const chengeTodolistTitleTC = (title: string, todoListId: string) => (dispatch: Dispatch) => {
  todolistAPI.updateTodolistTitle(title, todoListId)
  .then(res => {
    dispatch(chengeTodolistTitleAC({title: title, id: todoListId}))
  })
}


// types
export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType }
// export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
// export type AddTodolistACType = ReturnType<typeof addTodolistAC>
// export type SetTodolistACType = ReturnType<typeof setTodolistAC>
// export type ClearTodosDataACType = ReturnType<typeof clearTodosDataAC>
// export type ActionTodolistTypes = 
//   | ReturnType<typeof removeTodolistAC>
//   | ReturnType<typeof addTodolistAC>
//   | ReturnType<typeof chengeTodolistTitleAC>
//   | ReturnType<typeof chengeTodolistFilterAC>
//   | ReturnType<typeof setTodolistAC>
//   | ReturnType<typeof chengeTodolistEntityStatusAC>
//   | ClearTodosDataACType

  // export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionTodolistTypes): TodolistDomainType[] => {
//   switch (action.type) {    
//     case 'REMOVE-TODOLIST': 
//       return state.filter(f => f.id !== action.id)
//     case 'ADD-TODOLIST': 
//       return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
//     case 'CHANGE-TODOLIST-TITLE': 
//       return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
//     case 'CHANGE-TODOLIST-FILTER': 
//       return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
//     case 'SET-TODOLIST': 
//       return action.todolist.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}));
//     case 'CHANGE-TODOLIST-ENTITY-STATUS':
//       return state.map(el => el.id === action.id ? {...el, entityStatus: action.entityStatus} : el)
//     case 'CLEAR-DATA':
//       return []
//       default:
//           return state;
//   }
// }

  // actions
// export const removeTodolistAC = (id: string) => ({ type: 'REMOVE-TODOLIST', id } as const)
// export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const)
// export const chengeTodolistTitleAC = (title: string, id: string) => ({ type: 'CHANGE-TODOLIST-TITLE', title, id } as const)
// export const chengeTodolistFilterAC = (filter: FilterValuesType, id: string) =>({ type: 'CHANGE-TODOLIST-FILTER', filter, id } as const)
// export const setTodolistAC = (todolist: TodolistType[]) =>({ type: 'SET-TODOLIST', todolist } as const)
// export const chengeTodolistEntityStatusAC = (entityStatus: RequestStatusType, id: string) =>({ type: 'CHANGE-TODOLIST-ENTITY-STATUS', entityStatus, id } as const)
// export const clearTodosDataAC = () => ({type: 'CLEAR-DATA'} as const)
