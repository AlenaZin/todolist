import React from 'react'
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {v1} from "uuid";
import { AppRootStateType } from '../../app/store';
import { tasksReducer } from '../../features/todolistsList/tasks-reducer';
import { todolistsReducer } from '../../features/todolistsList/todolists-reducer';
import { TaskPriorityes, TaskStatuses } from '../../api/todolists-api';
import { appReducer } from '../../app/app-reducer';
import { thunk } from 'redux-thunk';
import { authReducer } from '../../features/login/auth-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { HashRouter } from 'react-router-dom';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", addedDate: '', order: 0, filter: "all", entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", addedDate: '', order: 0, filter: "all", entityStatus: 'loading'}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), 
                title: 'HTML&CSS', 
                status: TaskStatuses.New,
                priority: TaskPriorityes.Low,
                startDate: '',
                deadline: '', 
                todoListId: "todolistId1",
                order: 0,
                addedDate: '',
                description: ''  
            },
            {
                id: v1(), 
                title: 'JS', 
                status: TaskStatuses.New,
                priority: TaskPriorityes.Low,
                startDate: '',
                deadline: '', 
                todoListId: "todolistId1",
                order: 0,
                addedDate: '',
                description: ''  
            },
            
        ],
        ["todolistId2"]: [
            {
                id: v1(), 
                title: 'HTML&Milk', 
                status: TaskStatuses.New,
                priority: TaskPriorityes.Low,
                startDate: '',
                deadline: '', 
                todoListId: "todolistId2",
                order: 0,
                addedDate: '',
                description: ''  
            },
            {
                id: v1(), 
                title: 'React Book', 
                status: TaskStatuses.New,
                priority: TaskPriorityes.Low,
                startDate: '',
                deadline: '', 
                todoListId: "todolistId2",
                order: 0,
                addedDate: '',
                description: ''  
            },
        ]
    },
    app: {
        status: 'idle',
        error: null,
        initialized: true
    },
    auth: {
        isLoggedIn: true
    }
};

// export const storyBookStore = createStore(rootReducer, initialGlobalState as any, applyMiddleware(thunk));

export const storyBookStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().prepend(thunk),
});

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

export const BrowserRouterDecorator = (storyFn: () => React.ReactNode) => (
<HashRouter>{storyFn()}</HashRouter>
)