import './App.css';
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Login from './components/LoginPage.jsx';
import NotFound from './components/NotFoundPage.jsx';
import Home from './components/HomePage.jsx';
import { AuthContext } from './contexts/index.js';
import AuthProvider from './contexts/authProvider.js';
import store from './slices/index.js';
import ru from './locales/ru.js';

const PrivateRoute = () => {
  const auth = useContext(AuthContext);
  return auth.user.username ? <Home /> : <Navigate replace to="/login" />;
};
function App() {
  i18n
    .use(initReactI18next)
    .init({
      resources: { ru },
      lng: 'ru',
    });
  return (
    <Provider store={store}>
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <Router>
          <div className="h-100" id="chat">
            <div className="d-flex flex-column h-100">
              <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                <div className="container">
                  <a className="navbar-brand" href="/">Hexlet Chat</a>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/404" className="nav-link">404</Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route path="/" element={ <PrivateRoute />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </I18nextProvider>
    </AuthProvider>
  </Provider>
  );
}

export default App;
