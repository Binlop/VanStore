import React, { useState } from "react";
import axios from "axios";
import "./Reg.css";

export default function Register() {

	const [password, setPassword] = useState('');
	const [repPassword, setRepPassword] = useState('');
	const [passwordsEqual, setPasswordsEqual] = useState(null);

	function handleSubmit(e) {
		if (password != repPassword) {
			e.preventDefault();
			setPasswordsEqual(false)
		} else {
			setPasswordsEqual(true)
		}
	}

	function passwordHandler(e) {
		setPassword(e.target.value)
	}

	function repPasswordHandler(e) {
		setRepPassword(e.target.value)
	}

	return (
		<div className="reg-wrapper">
			<form onSubmit={e => handleSubmit(e)}>
				<h1>Регистрация</h1>

				<div className="reg-input-box">
					<div className="reg-input-field">
						<input type="text" placeholder="Имя" required />
						<i class='bx bx-user' ></i>
					</div>
					<div className="reg-input-field">
						<input type="text" placeholder="Фамилия" required />
						<i class='bx bx-user' ></i>
					</div>
					<div className="reg-input-field">
						<input type="text" placeholder="Отчество" />
						<i class='bx bx-user' ></i>
					</div>
				</div>

				<div className="reg-input-box">
					<div className="reg-input-field">
						<input type="email" placeholder="Email" required />
						<i class='bx bx-envelope' ></i>
					</div>
					<div className="reg-input-field">
						<input type="tel" minLength={12} maxLength={12} pattern="\+?[0-9\s\-\(\)]+" placeholder="Телефон, например: +7xxxxxxxxxx" required title="Например: +70001112233" />
						<i class='bx bx-phone' ></i>
					</div>
				</div>

				<div className="reg-input-box">
					<div className="reg-input-field">
						<input type="password" minLength={8} onChange={e => passwordHandler(e)} value={password} placeholder="Пароль" required />
						<i class='bx bx-lock-alt' ></i>
					</div>
					<div className="reg-input-field">
						<input type="password" minLength={8} onChange={e => repPasswordHandler(e)} value={repPassword} placeholder="Повторите пароль" required />
						<i class='bx bx-lock-alt' ></i>
					</div>
					{passwordsEqual === false && <div style={{color: 'red'}}>Пароли не совпадают</div>}
				</div>

				<button type="submit" className="reg-btn">Зарегистрироваться</button>
			</form>
		</div>
	)
}