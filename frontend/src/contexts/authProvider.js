import React, { useState } from 'react';

import { AuthContext } from './index.js';

export const getAuthHeader = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }
  return {};
};
const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser({ username: data.username, isAuth: true, token: data.token });
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{
      user,
      logIn,
      getAuthHeader,
      logOut,
    }}
    >
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
