import React, { useState } from 'react';

import { AuthContext } from './index.js';

const AuthProvider = ({ users }) => {
  const thisUser = localStorage.getItem('user');
  const [user, setUser] = useState(thisUser ? { username: thisUser.username } : null);
  const logIn = (data) => {
    localStorage.setItem('user', data);
    setUser({ username: data.username, isAuth: true, token: data.token });
  };
  return (
    <AuthContext.Provider value={{ user, logIn }}>
      { users }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
