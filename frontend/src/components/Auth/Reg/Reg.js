import React, { useState } from "react";
import axios from "axios";
import "./Reg.css";

export default function Register() {
	const [passwordsEqual, setPasswordsEqual] = useState(true);
	const [userData, setUserData] = useState({});
	const [message, setMessage] = useState(null);
	const [errors, setErrors] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({ ...prevUserData, [name]: value }));
    if (name === "password" || name === "re_password") {
      setPasswordsEqual(value === userData.password);
    }
  };

	const handleSubmit = (e) => {
	e.preventDefault(); // Предотвращаем поведение по умолчанию формы

	if (passwordsEqual) {
		const headers = {
			'Content-Type': 'application/json',
		};
		console.log(userData)
		
		axios
		.post("/api/users/register/", userData, { headers }
		)
		.then((res) => {
			setMessage(res.data);
			console.log("Это результат запроса в регистрацию", res);
		})
		.catch((error) => {
			setErrors(error.response.data)
			console.error("Это результат запроса с ошибкой в регистрацию", error.response.data)
		});
	} else {
		console.log("Пароли не совпадают");
	}
	};

  return (
    <div className="reg-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Регистрация</h1>

        <div className="reg-input-box">
          <div className="reg-input-field">
            <input
              type="text"
              placeholder="Имя"
            //   required
              onChange={handleChange}
              value={userData.name}
              name="name"
            />
            <i class="bx bx-user"></i>
          </div>
          <div className="reg-input-field">
            <input
              type="text"
              placeholder="Ник"
              required
              onChange={handleChange}
              value={userData.username}
              name="username"
            />
            <i class="bx bx-user"></i>
			{errors && errors.username && (
            <div className="alert alert-danger mt-3 mb-0">
            <ul>
                {errors.username.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
            </div>
            )}
          </div>
          <div className="reg-input-field">
            <input
              type="text"
              placeholder="Фамилия"
            //   required
              onChange={handleChange}
              value={userData.firstname}
              name="firstname"
            />
            <i class="bx bx-user"></i>
          </div>
          <div className="reg-input-field">
            <input
              type="text"
              placeholder="Отчество"
              onChange={handleChange}
              value={userData.patronymic}
              name="patronymic"
            />
            <i class="bx bx-user"></i>
          </div>
        </div>

        <div className="reg-input-box">
          <div className="reg-input-field">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
              value={userData.email}
              name="email"
            />
            <i class="bx bx-envelope"></i>
			{errors && errors.email && (
            <div className="alert alert-danger mt-3 mb-0">
            <ul>
                {errors.email.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
            </div>
            )}
          </div>
          <div className="reg-input-field">
            <input
              type="tel"
              minLength={12}
              maxLength={12}
              pattern="\+?[0-9\s\-\(\)]+"
              onChange={handleChange}
              value={userData.phone}
              placeholder="Телефон, например: +7xxxxxxxxxx"
              name="phone"
            //   required
              title="Например: +70001112233"
            />
            <i class="bx bx-phone"></i>
          </div>
        </div>

        <div className="reg-input-box">
          <div className="reg-input-field">
            <input
              type="password"
              minLength={8}
              onChange={handleChange}
              value={userData.password}
              name="password"
              placeholder="Пароль"
              required
            />
            <i class="bx bx-lock-alt"></i>
          </div>
          <div className="reg-input-field">
            <input
              type="password"
              minLength={8}
              onChange={handleChange}
              value={userData.re_password}
              name="re_password"
              placeholder="Повторите пароль"
              required
            />
            <i class="bx bx-lock-alt"></i>
          </div>
          {!passwordsEqual && <div style={{ color: "red" }}>Пароли не совпадают</div>}
          {message && <div style={{ color: "red" }}>{message.message}</div>}
        </div>

        <button type="submit" className="reg-btn">Зарегистрироваться</button>
      </form>
    </div>
  );
}