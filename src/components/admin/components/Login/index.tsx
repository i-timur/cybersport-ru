import {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {useAuth} from '../../../../hooks';
import './index.scss';
import {Btn} from '../ui/Btn';
import {AuthService} from '../../../../services/authService';

export const Login: FC = () => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [toShowAlert, setToShowAlert] = useState(false);

  const {setAuth} = useAuth();

  const authService = new AuthService();

  const navigate = useNavigate();

  const handleBtnClick = () => {
    authService.login({
      email: loginInput,
      password: passwordInput
    })
      .then(() => {
        setAuth(true);
        navigate('/admin/create');
      })
      .catch((err) => {
        setLoginInput('');
        setPasswordInput('');
        if (err.message === 'INVALID_PASSWORD') {
          setToShowAlert(true);
        } else if (err.message === 'EMAIL_NOT_FOUND') {
          setToShowAlert(true);
        }
      });
  };

  return (
    <div className="admin-login">
      <h1 className="admin-login__title">Авторизация</h1>
      <div className="admin-login__form">
        <label className="admin-login__label" htmlFor="login">
          <span>Логин</span>
          <input
            aria-label="login"
            type="text"
            className="admin-login__form-control"
            value={loginInput}
            onChange={(event) => setLoginInput(event.target.value)}
          />
        </label>
        <label htmlFor="password" className="admin-login__label">
          <span>Пароль</span>
          <input
            aria-label="password"
            type="password"
            className="admin-login__form-control"
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
          />
        </label>
      </div>
      {toShowAlert && <span className="admin-login__alert">Неверный логин или пароль</span>}
      <div className="admin-login__btn">
        <Btn onClick={handleBtnClick}>
          Войти
        </Btn>
      </div>
    </div>
  );
};
