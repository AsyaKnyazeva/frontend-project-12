import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Container } from 'react-bootstrap';
import { fetchData } from '../slices/channelsSlice.js';
import { AuthContext } from '../contexts/index.js';
import Modal from './Modal.jsx';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const header = auth.getAuthHeader();

  useEffect(() => {
    dispatch(fetchData(header));
  }, []);
  const modalType = useSelector((state) => state.modal.type);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
      {modalType && <Modal />}
    </Container>
  );
};
export default Home;
