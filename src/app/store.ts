import { thunk } from 'redux-thunk'
import { tasksReducer } from '../features/todolistsList/tasks-reducer'
import { todolistsReducer } from '../features/todolistsList/todolists-reducer'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer } from './app-reducer'
import { authReducer } from '../features/login/auth-reducer'
import { configureStore } from '@reduxjs/toolkit'

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


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
