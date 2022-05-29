import {FC, useState} from 'react';
import {observer} from 'mobx-react-lite';
// @ts-ignore
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {NoAvatar} from '../../../assets/images';
import {ModalContainer} from '../../ModalContainer';
import {Close} from '../../../assets/icons';
import {useAuth, useStores} from '../../../hooks';
import {User, UserSignUpForm} from '../../../types';
import {AuthService} from '../../../services/authService';

import styles from './index.module.scss';

export const ModalSignIn: FC = observer(() => {
  const [signInError, setSignInError] = useState<boolean>(false);

  const {modalStore: {clearCurrentModal}} = useStores();

  const {setAuth} = useAuth();

  const auth = new AuthService();

  const handleSignIn = (userForm: User) => {
    auth.login(userForm)
      .then(() => {
        setAuth(true);
        clearCurrentModal();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error: ', err.error);
        if (err.error.message === 'INVALID_PASSWORD' ||
          err.error.message === 'INVALID_EMAIL' ||
          err.error.message === 'EMAIL_NOT_FOUND') {
          setSignInError(true);
        }
      });
  };

  const handleSignUp = (userForm: UserSignUpForm) => {

  };

  const signInFormik = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      login: Yup.string().required('Это обязательное поле'),
      password: Yup.string().required('Это обязательное поле')
    }),
    onSubmit: (values) => handleSignIn({...values, email: values.login})
  });

  const signUpFormik = useFormik({
    initialValues: {
      login: '',
      password: '',
      repeatedPassword: '',
      email: ''
    },
    validationSchema: Yup.object().shape({
      login: Yup.string().required('Это обязательное поле'),
      password: Yup.string().required('Это обязательное поле'),
      repeatedPassword: Yup.string().required('Это обязательное поле'),
      email: Yup.string().required('Это обязательное поле')
    }),
    onSubmit: () => {}
  });


  return (
    <ModalContainer>
      <div className={styles.signIn}>
        <Tabs>
          <header className={styles.signIn__header}>
            <nav className={styles.signIn__navigation}>
              <TabList className={styles.signIn__tabs}>
                <Tab
                  className={styles.signIn__tab}
                  selectedClassName={styles.signIn__tab_selected}
                >Авторизация</Tab>
                <Tab
                  className={styles.signIn__tab}
                  selectedClassName={styles.signIn__tab_selected}
                >Регистрация</Tab>
              </TabList>
            </nav>
            <button
              type="button"
              className={styles.signIn__close}
              onClick={() => clearCurrentModal()}
            >
              <img src={Close} alt="Закрыть" />
            </button>
          </header>
          <section className={styles.signIn__content}>
            <TabPanel>
              <div className={styles.signIn__auth}>
                <div className={styles.signIn__img}>
                  <img src={NoAvatar} alt="Аватар" />
                </div>
                <span className={styles.signIn__entry}>Войти на сайт</span>
              </div>
              <form onSubmit={signInFormik.handleSubmit}>
                <label className={styles.signIn__label} htmlFor="login">
                  <span className={styles.signIn__inputName}>Логин</span>
                  <input
                    id="login"
                    name="login"
                    aria-label="login"
                    type="text"
                    className={styles.signIn__input}
                    value={signInFormik.values.login}
                    onChange={signInFormik.handleChange}
                    onBlur={signInFormik.handleBlur}
                  />
                </label>
                {signInFormik.errors.login && signInFormik.touched.login &&
                  <span className={styles.signIn__alert}>{signInFormik.errors.login}</span>}
                <label htmlFor="password" className={styles.signIn__label}>
                  <span className={styles.signIn__inputName}>Пароль</span>
                  <input
                    id="password"
                    name="password"
                    aria-label="password"
                    type="password"
                    className={styles.signIn__input}
                    value={signInFormik.values.password}
                    onChange={signInFormik.handleChange}
                    onBlur={signInFormik.handleBlur}
                  />
                </label>
                {signInFormik.errors.password && signInFormik.touched.password &&
                  <span className={styles.signIn__alert}>{signInFormik.errors.password}</span>}
                {signInError && <span className={styles.signIn__alert}>Неправильный логин или пароль</span>}
                <button
                  type="submit"
                  className={styles.signIn__signInBtn}
                  disabled={!signInFormik.values.login && !signInFormik.values.password}
                >Войти</button>
              </form>
            </TabPanel>
            <TabPanel>
              <form onSubmit={signUpFormik.handleSubmit}>
                <label className={styles.signIn__label} htmlFor="login">
                  <span className={styles.signIn__inputName}>Логин</span>
                  <input
                    id="login"
                    name="login"
                    aria-label="login"
                    type="text"
                    className={styles.signIn__input}
                    value={signUpFormik.values.login}
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                  />
                </label>
                {signUpFormik.errors.login && signUpFormik.touched.login &&
                  <span className={styles.signIn__alert}>{signUpFormik.errors.login}</span>}
                <label htmlFor="password" className={styles.signIn__label}>
                  <span className={styles.signIn__inputName}>Пароль</span>
                  <input
                    id="password"
                    name="password"
                    aria-label="password"
                    type="password"
                    className={styles.signIn__input}
                    value={signUpFormik.values.password}
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                  />
                </label>
                {signUpFormik.errors.password && signUpFormik.touched.password &&
                  <span className={styles.signIn__alert}>{signUpFormik.errors.password}</span>}
                <label htmlFor="repeatedPassword" className={styles.signIn__label}>
                  <span className={styles.signIn__inputName}>Повторие пароль</span>
                  <input
                    id="repeatedPassword"
                    name="repeatedPassword"
                    aria-label="repeatedPassword"
                    type="password"
                    className={styles.signIn__input}
                    value={signUpFormik.values.repeatedPassword}
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                  />
                </label>
                {signUpFormik.errors.repeatedPassword && signUpFormik.touched.repeatedPassword &&
                  <span className={styles.signIn__alert}>{signUpFormik.errors.repeatedPassword}</span>}
                <label htmlFor="email" className={styles.signIn__label}>
                  <span className={styles.signIn__inputName}>Email</span>
                  <input
                    id="email"
                    name="email"
                    aria-label="email"
                    type="email"
                    className={styles.signIn__input}
                    value={signUpFormik.values.email}
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                  />
                </label>
                {signUpFormik.errors.email && signUpFormik.touched.email &&
                  <span className={styles.signIn__alert}>{signUpFormik.errors.email}</span>}
                <button
                  type="submit"
                  className={styles.signIn__signInBtn}
                  disabled={!signUpFormik.values.login && !signUpFormik.values.password &&
                    !signUpFormik.values.repeatedPassword && !signUpFormik.values.email}
                >Зарегистрироваться</button>
              </form>
            </TabPanel>
          </section>
        </Tabs>
      </div>
    </ModalContainer>
  );
});
