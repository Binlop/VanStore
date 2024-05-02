import React from "react";
import { FaShoppingCart, FaHeart, FaSignInAlt } from 'react-icons/fa'; // Импортируем иконки из библиотеки react-icons
import './navbar.css'
import logo from './logo.png'

export default function Navbar() {
    return(
    <div className="header_main">
        <div className="header_top">
            <h3>IT SCIENCE</h3>
            <div className="word-list">
                            <span>Акции</span>
                            <span>Слово2</span>
                            <span>Слово3</span>
            </div>    
        </div>
        <div className="header_low">
            <img src={logo} alt="Логотип магазина" width="200" height="50"></img>
            <div className="search">
                <input type="text" name="search" placeholder="Поиск товара"></input>
            </div>
            <div className="user-actions-list">
                    <div className="user-actions-list-icon">
                        <FaShoppingCart />
                        <span>Корзина</span>
                    </div>
                    <div className="user-actions-list-icon">
                        <FaHeart />
                        <span>Избранное</span>
                    </div>
                    <div className="user-actions-list-icon">
                        <FaSignInAlt />
                        <span>Войти</span>
                    </div>
            </div>   
        </div>
    </div>
    )
}