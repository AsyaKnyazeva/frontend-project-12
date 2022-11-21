import React, {
  useRef, useEffect, useState, useContext,
} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/index.js';
import routes from '../routes.js';
import logo from '../images/avatar.jpg';

const Signup = () => {
  const { t } = useTranslation();
  const [signupFailed, setSignupFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  useEffect(() => inputRef.current.focus(), []);

  const signupSchema = yup.object().shape({
    username: yup.string()
      .required(t('errors.required'))
      .min(3, t('errors.minmax'))
      .max(20, t('errors.minmax')),
    password: yup.string()
      .trim()
      .required(t('errors.required'))
      .min(6, t('errors.min6')),
    confirmPassword: yup.string()
      .trim()
      .required(t('errors.required'))
      .oneOf([yup.ref("password")], t('errors.same')),
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={logo} className="rounded-circle" alt={t('signup.signup')} />
              </div>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={signupSchema}
                onSubmit={ async (values) => {
                  setSignupFailed(false);
                  try {
                    const { data } = await axios.post(routes.signupPath(), values);
                    auth.logIn(data);
                    navigate(routes.root);
                  } catch (e) {
                    if (e.response.status === 409) {
                      setSignupFailed(true);
                    } else {
                      toast.error(t('errors.network'));
                      throw new Error(t('errors.network'));
                    }
                  }
                }}
              >
                {({
                  handleSubmit, handleChange, errors, values, isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit} className="w-50">
                    <h1 className="text-center mb-4">{t('signup.signup')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        isInvalid={errors.username || signupFailed}
                        id="username"
                        onChange={handleChange}
                        value={values.username}
                        ref={inputRef}
                        name="username"
                        placeholder={t('signup.name')}
                        disabled={isSubmitting}
                      />
                      <Form.Label htmlFor="username">{t('signup.name')}</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip placement="right">{errors.username}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="password"
                        isInvalid={errors.password || signupFailed}
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        placeholder={t('signup.password')}
                        disabled={isSubmitting}
                      />
                      <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        isInvalid={errors.confirmPassword || signupFailed}
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={values.confirmPassword}
                        placeholder={t('signup.confirmPassword')}
                        disabled={isSubmitting}
                      />
                      <Form.Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>{signupFailed ? t('signup.already') : errors.confirmPassword}</Form.Control.Feedback>
                    </Form.Group>
                    <Button className="w-100" disabled={isSubmitting} type="submit" variant="outline-primary">{t('signup.register')}</Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;