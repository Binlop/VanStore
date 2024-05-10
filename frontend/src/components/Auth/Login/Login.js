import React, {useContext, useEffect} from "react";
import './Login.css';
import AuthContext from "../../../context/AuthContext";

export default function Login() {

    let { loginUser } = useContext(AuthContext)

    useEffect(() => {
        document.title = "Вход"
    }, []);


    return (
        <div className="login-wrapper">
            <form onSubmit={loginUser}>
                <h1>Вход</h1>
                <div className="login-input-box">
                    <input name="username" type="email" placeholder="Email" required />
                    <i className='bx bx-envelope' ></i>
                </div>
                <div className="login-input-box">
                    <input minLength={8} name="password" type="password" placeholder="Пароль" required />
                    <i className='bx bx-lock-alt' ></i>

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