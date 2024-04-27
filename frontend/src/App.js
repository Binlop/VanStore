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

import "./App.css";


function App() {
    return (
        <div className="main">
        <div className="navbar"><Navbar />

        <Router>
                {/* <div className="left_bar"><AsideBar /></div> */}
                    <Routes>
                        <Route path="/" element={<Home/>} />                
                    </Routes>
        </Router>
        </div>
        </div>
    );
}
 
export default App;