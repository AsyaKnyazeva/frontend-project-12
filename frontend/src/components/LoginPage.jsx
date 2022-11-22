import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/index.js';
import routes from '../routes.js';
import logo from '../images/logoHex.png';

const Login = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const loginSchema = yup.object().shape({
    username: yup.string()
      .trim()
      .min(3, t('errors.min3'))
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
                <img src={logo} className="rounded-circle" alt={t('login.enter')} />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={loginSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    const response = await axios.post(routes.loginPath(), values);
                    auth.logIn(response.data);
                    resetForm();
                    navigate(routes.root);
                  } catch (e) {
                    setAuthFailed(true);
                    toast.error(t('toast.err'));
                  }
                }}
              >
                {({
                  handleChange, handleSubmit, values, isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">{t('login.enter')}</h1>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          isInvalid={authFailed}
                          onChange={handleChange}
                          name="username"
                          value={values.username}
                          placeholder={t('login.name')}
                          id="username"
                          disabled={isSubmitting}
                        />
                        <Form.Label htmlFor="username">{t('login.name')}</Form.Label>
                      </Form.Group>
                      <Form.Group className="form-floating mb-4">
                      <Form.Control
                        onChange={handleChange}
                        isInvalid={authFailed}
                        name="password"
                        placeholder={t('login.password')}
                        value={values.password}
                        id="password"
                        disabled={isSubmitting}
                      />
                      <Form.Label className="form-label" htmlFor="password">{t('login.password')}</Form.Label>
                      <Form.Control.Feedback type="invalid">{t('errors.auth')}</Form.Control.Feedback>
                    </Form.Group>
    <button type="submit" disabled={isSubmitting} className="w-100 mb-3 btn btn-outline-primary">{t('login.enter')}</button>
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
