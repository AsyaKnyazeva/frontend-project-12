import './App.css';
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Login from './components/LoginPage.jsx';
import NotFound from './components/NotFoundPage.jsx';
import Signup from './components/SignupPage.jsx';
import Home from './components/HomePage.jsx';
import Header from './components/Header.jsx';
import { ApiContext, AuthContext } from './contexts/index.js';
import buildChatApi from './contexts/buildChatApi.js';
import AuthProvider from './contexts/authProvider.js';
import store from './slices/index.js';
import ru from './locales/ru.js';
import routes from './routes.js';

const PrivateRoute = () => {
  const auth = useContext(AuthContext);
  return auth.user ? <Home /> : <Navigate replace to={routes.login} />;
};
const App = (socket) => {
  i18n
    .use(initReactI18next)
    .init({
      resources: { ru },
      lng: 'ru',
    });
  
    const chatApi = buildChatApi(socket);
  return (
    <React.StrictMode>
    <Provider store={store}>
      <ApiContext.Provider value={chatApi}>
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <Router>
              <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">
                  <Header />
                  <Routes>
                  <Route exact path={routes.login} element={<Login />} />
                      <Route path={routes.root} element={<PrivateRoute />} />
                      <Route path={routes.any} element={<NotFound />} />
                      <Route path={routes.signup} element={<Signup />} />
                  </Routes>
                  </div>
                </div>
              </Router>
            </I18nextProvider>
          </AuthProvider>
        </ApiContext.Provider>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
