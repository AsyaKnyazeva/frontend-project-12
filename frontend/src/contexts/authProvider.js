import React, { useState } from 'react';

import { AuthContext } from './index.js';

const AuthProvider = ({ children }) => {
  const currentUser = localStorage.getItem('user');
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = (data) => {
    localStorage.setItem('user', data);
    setUser({ username: data.username, isAuth: true, token: data.token });
  };
  return (
    <AuthContext.Provider value={{ user, logIn }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
