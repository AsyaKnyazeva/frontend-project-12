import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import Login from './components/Login.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
  return (
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
          <Route exact path="/login" render={() => <Login />} element={<Login />} />
          <Route path="/404" render={() => <NotFound />} element={<NotFound />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

const Home = () => <h2>Home</h2>;

export default App;
