import { thunk } from 'redux-thunk'
import { allTasksActions, tasksReducer } from '../features/todolistsList/tasks-reducer'
import { todolistsReducer } from '../features/todolistsList/todolists-reducer'
import { ActionCreatorsMapObject, bindActionCreators, combineReducers } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer } from './app-reducer'
import { authReducer } from '../features/login/auth-reducer'
import { AsyncThunk, AsyncThunkPayloadCreator, configureStore } from '@reduxjs/toolkit'
import { useMemo } from 'react'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

//export const store = createStore(rootReducer as any, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().prepend(thunk),
});

export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export function useActions<T extends ActionCreatorsMapObject<any>> (actions: T) {
  const dispatch = useAppDispatch()

  const boundActions = useMemo(() => {
    return bindActionCreators(actions, dispatch)
  }, [])

  return boundActions
}

export function useAllActions() {
  const dispatch = useAppDispatch()

  return useMemo(() => {
    return bindActionCreators({
      ...allTasksActions,
    }, dispatch)
  }, [])
}

// hints for getState/dispatch @ createAsyncThunk
// declare module '@reduxjs/toolkit' {
//   type AsyncThunkConfig = {
//     state?: unknown;
//     dispatch?: AppDispatch;
//     extra?: unknown;
//     rejectValue?: unknown;
//     serializedErrorType?: unknown;
//   };

//   function createAsyncThunk<Returned,
//     ThunkArg = void,
//     ThunkApiConfig extends AsyncThunkConfig = {state: AppRootStateType}>(
//     typePrefix: string,
//     payloadCreator: AsyncThunkPayloadCreator<Returned,
//       ThunkArg,
//       ThunkApiConfig>,
//     options?: any,
//   ): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
// }


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
