import React, { useContext } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { AuthContext } from '../contexts/index.js';
import routes from '../routes.js';

const Header = () => {
  const auth = useContext(AuthContext);
  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
        <a className="navbar-brand" href={routes.root}>Hexlet Chat</a>
        {auth.user ? <Button onClick={auth.logOut}>Выйти</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Header;