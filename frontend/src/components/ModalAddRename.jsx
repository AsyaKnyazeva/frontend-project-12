import React, { useRef, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import leoProfanity from 'leo-profanity';
import { ApiContext } from '../contexts/index.js';
import { selectors } from '../slices/channelsSlice.js';
import { actions as modalActions } from '../slices/modalSlice.js';

const ModalForm = () => {
  const chatApi = useContext(ApiContext);
  const { type, channel } = useSelector((state) => state.modal);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []);

  const closeModal = () => dispatch(modalActions.closeModal());
  const addChannel = (name) => {
    chatApi.addNewChannel({ removable: true, name });
    toast.success(t('toast.add'));
  };
  const renameChannel = (name) => {
    chatApi.renameChannel({ id: channel, name });
    toast.success(t('toast.rename'));
  };

  const title = type === 'adding' ? t('modal.add') : t('modal.rename');
  const action = type === 'adding' ? addChannel : renameChannel;

  const channelNames = useSelector(selectors.selectAll)
    .map((c) => c.name);

  const validationSchema = yup.object().shape({
    name: yup.string()
      .trim()
      .required(t('errors.required'))
      .notOneOf(channelNames, t('errors.uniq')),
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onClick={closeModal}>
        <Modal.Title className="h4">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationSchema}
          onSubmit={({ name }) => {
            const cleanName = leoProfanity.clean(name);
            action(cleanName);
            closeModal();
          }}
        >
          {({
            values, handleSubmit, handleChange, errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <Form.Control
                  isInvalid={errors.name}
                  onChange={handleChange}
                  className="mb-2"
                  name="name"
                  id="name"
                  value={values.name}
                  ref={inputRef}
                />
                <Form.Label htmlFor="name" className="visually-hidden">{t('modal.name')}</Form.Label>
                {errors.name ? (
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                ) : null}
                <div className="d-flex justify-content-end">
                  <Button onClick={closeModal} type="button" className="me-2" variant="secondary">{t('modal.cancel')}</Button>
                  <Button type="submit">{t('modal.send')}</Button>
                </div>
              </div>

            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
export default ModalForm;
