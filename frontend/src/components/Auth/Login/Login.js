import React, { useEffect, useState } from "react";
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Укажите электронную почту')
    const [passwordError, setPasswordError] = useState('Укажите пароль')
    const [formValid, setFormValid] = useState(false)

    useEffect( () => {
        if(emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])
    
    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Электронная почта некорректна')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if(e.target.value.length < 8) {
            setPasswordError('Пароль должен содержать больше 7 символов')
            if(!e.target.value) {
                setPasswordError('Укажите пароль')
            }
        } else {
            setPasswordError('')
        }
    }

    return(
        <div className="login-main">
            <form className="login-form">
                <h1 className="login-form-title">Вход</h1>
                <div className="login-form-group">
                    <input className="login-form-input" onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name="email" type="text" placeholder=" " /> {/* Пустой placeholder необходим для корректной работы анимации! */}
                    <label className="login-form-label">Email</label>
                    {(emailDirty && emailError) && <div className="login-form-input-error" style={{color:'red'}}>{emailError}</div>}
                </div>
                <div className="login-form-group">
                    <input className="login-form-input" onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name="password" type="password" placeholder=" " /> {/* Пустой placeholder необходим для корректной работы анимации! */}
                    <label className="login-form-label">Пароль</label>
                    {(passwordDirty && passwordError) && <div className="login-form-input-error" style={{color:'red'}}>{passwordError}</div>}
                </div>
                <button className="login-form-button" disabled={!formValid} type="submit">Войти</button>
            </form>
        </div>
    )
};