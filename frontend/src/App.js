// App.js
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Product from "./components/Details/Product";
import Login from './components/Auth/Login/Login';
import Register from "./components/Auth/Reg/Reg";
import Cart from "./components/Cart/Cart";
import { AuthProvider } from './context/AuthContext';

import "./App.css";

function App() {
    return (
        <Router>
        <AuthProvider>
            <div className="main">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login/" element={<Login />} />
                        <Route path="/register/" element={<Register />} />
                        <Route path="/products/*" element={<Product />} />
                        <Route path="/cart/" element={<Cart />} />
                    </Routes>
            </div>
        </AuthProvider>
        </Router>

    );
}

export default App;
