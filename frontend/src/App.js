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
import { AuthProvider } from './context/AuthContext';

import "./App.css";


function App() {
    return (
        <div className="main">
        <Router>
        <AuthProvider>
        <Routes>
        <Route path="/login/" element={<Login/>} />     
        </Routes>
        <Navbar />

        <Routes>

        <Route path="/" element={<Home/>} />                
        <Route path="/products/*" element={<Product/>} />       
        </Routes>

        </AuthProvider>
        </Router>
        </div>

    );
}
 
export default App;