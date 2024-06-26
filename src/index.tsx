import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { App } from './app/App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, HashRouter, Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './features/login/Login';
import { TodolistsList } from './features/todolistsList/TodolistsList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Navigate to="/todolists" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/todolists",
        element: <TodolistsList />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
);


reportWebVitals();
