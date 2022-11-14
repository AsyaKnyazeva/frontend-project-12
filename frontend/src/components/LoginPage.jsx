import React, { useContext, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/index.js';
import logo from '../logoHex.png';

const Login = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const loginSchema = yup.object().shape({
    username: yup.string()
      .trim()
      .min(3, `${t('errors.min3')}`)
      .required(t('errors.required')),
    password: yup.string()
      .trim()
      .required(t('errors.required')),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={logo} className="rounded-circle" alt="Войти" />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={loginSchema}
                onSubmit={ async (values, { resetForm }) => {
                  try {
                    const response = await axios.post('/api/v1/login', values);
                    auth.logIn(response.data);
                    resetForm();
                    navigate('/');
                  } catch (e) {
                    setAuthFailed(true);
                  }
                }}
              >
                {({ errors, touched }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">{t('login.enter')}</h1>
                    <div className="form-floating mb-3">
                      <Field name="username" className="form-control" placeholder="Ваш ник"/>
                      {errors.username && touched.username ? (
                        <div className="alert alert-warning">{errors.username}</div>
                      ) : null}
                      <label htmlFor="username">{t('login.name')}</label>
                    </div>
                    <div className="form-floating mb-4">
                      <Field name="password" placeholder="Пароль" className="form-control" />
                      {errors.password && touched.password ? (
                        <div className="alert alert-warning">{errors.password}</div>
                      ) : null}
                      <label className="form-label" htmlFor="password">{t('login.password')}</label>
                    </div>
                    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('login.enter')}</button>
                    {authFailed ? <div className="alert alert-danger">{t('errors.auth')}</div> : null}
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.question')}</span>
                <a href="/signup">{t('login.signup')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
