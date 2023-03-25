import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Reports from "./components/reports/Reports";
import Home from "./components/home/Home";


const router = createBrowserRouter([
    {
        path: '/', element: <App/>, errorElement: <PageNotFound/>, children: [
            {index: true, element: <Home/>},
            {path: '/home', element: <Home/>},
            {path: '/home/:reportId', element: <Home/>},
            {path: '/reports', element: <Reports/>}

        ]
    },

])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
        <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
