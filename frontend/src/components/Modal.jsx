import React from 'react';
import { useSelector } from 'react-redux';
import ModalAddRename from './ModalAddRename.jsx';
import ModalRemove from './ModalRemove.jsx';

const Modal = () => {
  const { type } = useSelector((state) => state.modal);
  const Component = type === "remove" ? ModalRemove : ModalAddRename;
  return (<Component />);
};

export default Modal;