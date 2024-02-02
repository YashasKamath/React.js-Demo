import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Protected from './components/Protected';
import Home from './components/Home';
// import '../styles'

// import dotenv from 'dotenv';
// dotenv.config();

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />} >
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path='/' element={<Protected />}>
                <Route path='/' index element={<Home />} />
            </Route>
        </Route>
    )
)

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);

