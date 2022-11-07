import './App.css';
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Navigate,
  Routes,
} from 'react-router-dom';
import Login from './components/LoginPage.jsx';
import NotFound from './components/NotFoundPage.jsx';
import Home from './components/HomePage.jsx';
import { AuthContext } from './contexts/index.js';
import AuthProvider from './contexts/authProvider.js';

const PrivateRoute = () => {
  const auth = useContext(AuthContext);
  return auth.user.username ? <Home /> : <Navigate replace to="/login" />;
};
function App() {
  const token = localStorage.getItem('user');
  console.log('!!!', token);
  return (
  <AuthProvider>
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
  </AuthProvider>
  );
}

export default App;
