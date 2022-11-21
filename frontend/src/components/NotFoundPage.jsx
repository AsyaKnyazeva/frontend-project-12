import React from 'react';
import { useTranslation } from 'react-i18next';
import notFound from '../images/notFound2.svg';
import routes from '../routes.js';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img alt={t("notFound.notFound")} className="img-fluid h-25" src={notFound} />
      <h1 className="h4 text-muted">{t("notFound.notFound")}</h1>
      <p className="text-muted">{t("notFound.text")}<a href={routes.root}>{t("notFound.link")}</a></p>
    </div>
);
  };
  
export default NotFound;
