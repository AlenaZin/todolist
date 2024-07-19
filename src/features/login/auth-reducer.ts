import { FieldErrorType, LoginParamsType, authAPI } from "../../api/todolists-api"
import { setStatusAC } from "../../app/app-reducer"
import { handleNetworkAppError, handleServerAppError } from "../../utils/utils-error"
import { clearTodosDataAC } from "../todolistsList/todolists-reducer"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

export const loginTC = createAsyncThunk<
  undefined,
  LoginParamsType,
  { rejectValue: { errors: string[]; fieldsErrors?: FieldErrorType[] } }
>("auth/login", async (param, thunkAPI) => {
  thunkAPI.dispatch(setStatusAC({ status: "loading" }));
  try {
    const res = await authAPI.login(param);
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setStatusAC({ status: "succeeded" }));
      return;
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: res.data.messages,
        fieldsErrors: res.data.fieldsErrors,
      });
    }
  } catch (err: any) {
    const error: AxiosError = err;
    handleNetworkAppError(error, thunkAPI.dispatch);
    return thunkAPI.rejectWithValue({
      errors: [error.message],
      fieldsErrors: undefined,
    });
  }
});
export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
  thunkAPI.dispatch(setStatusAC({status: 'loading'}))
  try {
    const res = await authAPI.logout()    
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setStatusAC({status: "succeeded"}));
      thunkAPI.dispatch(clearTodosDataAC())
      return;
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({})
    }
  } catch(error: any) {
      handleNetworkAppError(error, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({})
    };
})


const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    setLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
      state.isLoggedIn = action.payload.value
    }
  },
  extraReducers: bilder => {
    bilder.addCase(loginTC.fulfilled, (state, action) => {
      state.isLoggedIn = true
    })
    bilder.addCase(logoutTC.fulfilled, (state, action) => {
      state.isLoggedIn = false
    })
  }
});

export const authReducer = slice.reducer
export const {setLoggedInAC} = slice.actions




// ......................................................................................................
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

// thunk

// export const loginTC_ = (data: LoginParamsType) => (dispatch: Dispatch) => {
//   dispatch(setStatusAC({status: 'loading'}))
//   authAPI.login(data)
//   .then(res => {
//     if(res.data.resultCode === 0) {
//       dispatch(setLoggedInAC({value: true}))
//       dispatch(setStatusAC({status: 'succeeded'}))
//     } else {
//       handleServerAppError(res.data, dispatch)
//     }     
//   })
//   .catch(error => {
//     handleNetworkAppError(error, dispatch)
//   })
// }

// export const logoutTC = () => (dispatch: Dispatch) => {
//   dispatch(setStatusAC({status: 'loading'}))
//   authAPI.logout()
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(setLoggedInAC({value: false})); 
//         dispatch(setStatusAC({status: "succeeded"}));
//         dispatch(clearTodosDataAC({}))
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleNetworkAppError(error, dispatch);
//     });
// }