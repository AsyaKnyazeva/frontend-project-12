import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ApiContext } from '../contexts/index.js';
import { actions as modalActions } from '../slices/modalSlice.js';

const ModalRemove = () => {
  const chatApi = useContext(ApiContext);
  const { channel } = useSelector((state) => state.modal);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const closeModal = () => dispatch(modalActions.closeModal());
  const removeChannel = () => {
    chatApi.removeChannel({ id: channel });
    toast.success(t('toast.remove'));
    dispatch(modalActions.closeModal());
  };
  return (
    <Modal show centered>
      <Modal.Header closeButton onClick={closeModal}>
        <Modal.Title className="h4">{t('modal.removing')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={removeChannel}>
          <div>
            <p className="lead">{t('modal.question')}</p>
            <div className="d-flex justify-content-end">
              <Button onClick={closeModal} type="button" className="me-2" variant="secondary">{t('modal.cancel')}</Button>
              <Button type="submit" className="btn-danger">{t('modal.remove')}</Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemove;