import { Dispatch } from "redux";
import { authAPI } from "../api/todolists-api";
import { setLoggedInAC } from "../features/login/auth-reducer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: InitialStateType = {
  status: 'succeeded' as RequestStatusType, 
  error: null,
  initialized: false
}
const slise = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setErrorAC(state, action: PayloadAction<{error: string | null}>) {
      state.error = action.payload.error
    },
    setStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
      state.status = action.payload.status
    },
    setAppInitializedAC(state, action: PayloadAction<{initialized: boolean}>) {
      state.initialized = action.payload.initialized
    }
  }
})

export const appReducer = slise.reducer
export const {setErrorAC} = slise.actions
export const {setStatusAC} = slise.actions
export const {setAppInitializedAC} = slise.actions


// thunk

export const initializedAppTC = () => (dispatch: Dispatch) => {
  // (async () => {
  //  const authRes = await authAPI.me();
  // })();
  authAPI.me().then(res => {
    if(res.data.resultCode === 0) {
    dispatch(setLoggedInAC({value: true}))
    }  
    dispatch(setAppInitializedAC({initialized: true}))
  })
}

// type
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  // true когды прилоение проинициализированно (проверили юзеров, настройки и тд.) 
  initialized: boolean
}


// export type SetErrorACType= ReturnType<typeof setErrorAC>
// export type SetStatusACType= ReturnType<typeof setStatusAC>
// export type SetAppInitializedACType = ReturnType<typeof setAppInitializedAC>
// type ActionsType = 
// | SetErrorACType
// | SetStatusACType
// | SetAppInitializedACType

// export const appReducer = ( state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//   switch (action.type) {
//     case "APP/SET-STATUS":
//       return { ...state, status: action.status };
//     case "APP/SET-ERROR":
//       return { ...state, error: action.error };
//     case "APP/SET-APP-INITIALIZED":
//       return {...state, initialized: action.initialized}
//     default:
//       return state;
//   }
// }
// action

// export const setErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
// export const setStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
// export const setAppInitializedAC =(initialized: boolean) => ({type: "APP/SET-APP-INITIALIZED", initialized} as const)
