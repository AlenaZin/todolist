import { authAPI } from "../api/todolists-api";
import { setLoggedInAC } from "../features/login/auth-reducer";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const initializedAppTC = createAsyncThunk('app/initializedApp', async (param, thunkAPI) => {
  const res = await authAPI.me()  
    if(res.data.resultCode === 0) {
      thunkAPI.dispatch(setLoggedInAC({value: true}))
    }  
    return;  
})

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'succeeded' as RequestStatusType, 
    error: null,
    initialized: false
  } as InitialStateType,
  reducers: {
    setErrorAC(state, action: PayloadAction<{error: string | null}>) {
      state.error = action.payload.error
    },
    setStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
      state.status = action.payload.status
    },
  },
  extraReducers(builder) {
    builder.addCase(initializedAppTC.fulfilled, (state, action) => {
      state.initialized = true
    }) 
  },
})

export const appReducer = slice.reducer
export const {setErrorAC, setStatusAC} = slice.actions


// type
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  // true когды прилоение проинициализированно (проверили юзеров, настройки и тд.) 
  initialized: boolean
}

// ..............................................................................................................

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

// thunk

// export const initializedAppTC = () => (dispatch: Dispatch) => {
//   authAPI.me().then(res => {
//     if(res.data.resultCode === 0) {
//     dispatch(setLoggedInAC({value: true}))
//     }  
//     dispatch(setAppInitializedAC({initialized: true}))
//   })
// }
