import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../slices/channelsSlice.js';
import { AuthContext } from '../contexts/index.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const header = auth.getAuthHeader();

  useEffect(() => {
    dispatch(fetchData(header));
  }, [dispatch]);

  return (
    <div className='container h-100 my-4 overflow-hidden rounded shadow'>
      <div className='row h-100 bg-white flex-md-row'>
        <Channels />
        <Messages />
      </div>
    </div>
  );
};
export default Home;
