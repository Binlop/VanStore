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

import "./App.css";


function App() {
    return (
        <div className="main">
        <Router>
        <div className="navbar"><Navbar /></div>


                {/* <div className="left_bar"><AsideBar /></div> */}
                    <Routes>
                        <Route path="/" element={<Home/>} />                
                        <Route path="/products/*" element={<Product/>} />                
                    </Routes>
        </Router>
        </div>

    );
}
 
export default App;