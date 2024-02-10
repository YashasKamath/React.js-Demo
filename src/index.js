import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Protected from './components/Protected';
import Home from './components/Home'
import Orders from './components/Orders';
import Farmers from './components/Farmers';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />} >
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path='/' element={<Protected />}>
                <Route path='/' index element={<Home />} />
                <Route path='/orderTable' index element={<Orders />} />
                <Route path='/farmerTable' index element={<Farmers />} />
            </Route>
        </Route>
    )
)

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);

