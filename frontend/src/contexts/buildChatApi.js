const buildChatApi = (socket) => {
  const sendNewMessage = (message) => {
    socket.emit('newMessage', message, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: message delivery failed');
      }
    });
  };
  const addNewChannel = (newChannel) => {
    socket.emit('newChannel', newChannel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel adding failed');
      }
    });
  };
  const removeChannel = (channel) => {
    socket.emit('removeChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel removing failed');
      }
    });
  };
  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel renaming failed');
      }
    });
  };
  return {
    sendNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};
export default buildChatApi;