import store from '../slices/index.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const buildChatApi = (socket) => {
  const sendNewMessage = (message) => {
    socket.emit('newMessage', message, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: message delivery failed');
      }
    });
  };

  socket.on('newMessage', (response) => {
    store.dispatch(messagesActions.addMessage(response));
  });

  const addNewChannel = (newChannel) => {
    socket.emit('newChannel', newChannel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel adding failed');
      }
    });
  };

  socket.on('newChannel', (response) => {
    store.dispatch(channelsActions.addChannel(response));
    store.dispatch(channelsActions.setCurrentId(response.id));
  });

  const removeChannel = (channel) => {
    socket.emit('removeChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel removing failed');
      }
    });
  };
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
  });
  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel renaming failed');
      }
    });
  };
  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(channelsActions.updateChannel({ id, changes: { name } }));
  });
  return {
    sendNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};
export default buildChatApi;