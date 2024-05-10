import React from "react";
import './Login.css';

export default function Login() {

    return(
        <div className="login-wrapper">
            <form>
                <h1>Вход</h1>
                <div className="login-input-box">
                    <input type="text" placeholder="Email" required />
                    <i class='bx bx-envelope' ></i>
                </div>
                <div className="login-input-box">
                    <input type="password" placeholder="Пароль" required />
                    <i class='bx bx-lock-alt' ></i>
                    
                </div>

                <div className="login-remember-forgot">
                    <label><input type="checkbox" /> Запомнить</label>
                    <a href="#">Забыли пароль?</a>
                </div>

                <button className="login-button" type="submit">Войти</button>

                <div className="login-register-link">
                    <p>Нет аккаунта? <a href="#">Зарегистрироваться</a></p>
                </div>
            </form>
        </div>
    )
}