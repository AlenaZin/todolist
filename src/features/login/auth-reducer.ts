import { LoginParamsType, authAPI } from "../../api/todolists-api"
import { Dispatch } from "redux"
import { setStatusAC } from "../../app/app-reducer"
import { handleNetworkAppError, handleServerAppError } from "../../utils/utils-error"
import { clearTodosDataAC } from "../todolistsList/todolists-reducer"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoggedIn: false
}

const slise = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
      state.isLoggedIn = action.payload.value
    }
  },
});

export const authReducer = slise.reducer
export const {setLoggedInAC} = slise.actions


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setStatusAC({status: 'loading'}))
  authAPI.login(data)
  .then(res => {
    if(res.data.resultCode === 0) {
      dispatch(setLoggedInAC({value: true}))
      dispatch(setStatusAC({status: 'succeeded'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }     
  })
  .catch(error => {
    handleNetworkAppError(error, dispatch)
  })
}
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setStatusAC({status: 'loading'}))
  authAPI.logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setLoggedInAC({value: false})); 
        dispatch(setStatusAC({status: "succeeded"}));
        dispatch(clearTodosDataAC({}))
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleNetworkAppError(error, dispatch);
    });
}

// types

// type InitialStateType = {
//   isLoggedIn: boolean
// }
// export type ActionTodolistTypes = ReturnType<typeof setLoggedInAC>


// export const authReducer = (state: InitialStateType = initialState, action: ActionTodolistTypes): InitialStateType => {
//   switch (action.type) {    
//     case 'login/SET-LOGGED-IN':
//       return {...state, isLoggedIn: action.value}
//       default:
//           return state;
//   }
// }
// actions
// export const setLoggedInAC = (value: boolean) => ({ type: 'login/SET-LOGGED-IN', value } as const)