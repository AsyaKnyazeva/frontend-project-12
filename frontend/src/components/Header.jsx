import React, { useContext } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { AuthContext } from '../contexts/index.js';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

const Header = () => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
        <a className="navbar-brand" href={routes.root}>{t("hexlet")}</a>
        {auth.user ? <Button onClick={auth.logOut}>{t("login.exit")}</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Header;