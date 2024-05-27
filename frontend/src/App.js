// App.js
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
// import AsideBar from "./components/Asidebar/Sidebar";
import Home from "./components/Home/Home";
import Product from "./components/Details/Product";
import Login from './components/Auth/Login/Login';
import Register from "./components/Auth/Reg/Reg";
import Cart from "./components/Cart/Cart";
import { AuthProvider } from './context/AuthContext';

import "./App.css";


function App() {
    return (
        <div className="main">
        <Router>
        <Routes>
        <Route path="/register/" element={<Register/>} />                
        </Routes>

        <AuthProvider>
        <Navbar />


        <Routes>
        <Route path="/login/" element={<Login/>} />     
        <Route path="/" element={<Home/>} />  
        <Route path="/products/*" element={<Product/>} />       
        <Route path="/cart/" element={<Cart/>} />       
        </Routes>

        </AuthProvider>
        </Router>
        </div>

    );
}
 
export default App;