import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import logo from '../logoHex.png';

const LoginSchema = yup.object().shape({
  username: yup.string()
    .min(3, 'Password must be 6 characters at minimum')
    .required('Name is required'),
  password: yup.string()
    .min(6, 'Password must be 6 characters at minimum')
    .required('Password is required'),
});

const Login = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-10 col-md-8 col-xxl-6">
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
              validationSchema={LoginSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(JSON.stringify(values, null, 2));
                resetForm();
              }}
            >
              {({ errors, touched }) => (
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
                    <Field name="username" className="form-control" placeholder="Ваш ник"/>
                    {errors.username && touched.username ? (
                      <div className="alert alert-danger">{errors.username}</div>
                    ) : null}
                    <label htmlFor="username">Ваше имя</label>
                  </div>
                  <div className="form-floating mb-4">
                    <Field name="password" placeholder="Пароль" className="form-control" />
                    {errors.password && touched.password ? (
                      <div className="alert alert-danger">{errors.password}</div>
                    ) : null}
                    <label className="form-label" htmlFor="password">Пароль</label>
                  </div>
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                </Form>
              )}

            </Formik>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта? </span>
              <a href="/signup">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Login;
