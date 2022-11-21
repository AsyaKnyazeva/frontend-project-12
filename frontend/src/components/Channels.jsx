import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { 
  Col, Button, Dropdown, Nav,
 } from 'react-bootstrap';
import { selectors, actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as modalActions } from '../slices/modalSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const handleClick = (id) => () => {
  dispatch(channelsActions.setCurrentId(id));
  };
  const showModal = (type, channel) => () => {
    dispatch(modalActions.openModal({ type, channel}));
  };
  const staticBtn = (channel, classBtn) => (
    <button type="button" className={classBtn} onClick={handleClick(channel.id)}>
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );

  const addedBtn = (channel, classBtn) => (
    <Dropdown role="group" className="d-flex btn-group">
      {staticBtn(channel, classBtn)}
      <Dropdown.Toggle
        split
        className="flex-grow-0 text-end"
        variant={channel.id === currentChannelId ? "secondary" : "light"}
        >
        <span className="visually-hidden">{t('channels.manage')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={showModal("remove", channel.id)} role="button">{t('channels.delete')}</Dropdown.Item>
        <Dropdown.Item onClick={showModal("rename", channel.id)} role="button">{t('channels.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.channels')}</span>
        <Button onClick={showModal("adding")} className="p-0 text-primary btn-group-vertical" variant="link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav variant="pills" className="flex-column nav-fill px-2" as="ul">
        {channels.map((channel) => {
          const classBtn = cn("w-100", "rounded-0", "text-start", "btn", "text-truncate", {
            "btn-secondary": channel.id === currentChannelId,
          });
          const btn = channel.removable
            ? addedBtn(channel, classBtn) : staticBtn(channel, classBtn);
          return (
            <Nav.Item as="li" className="w-100" key={channel.id}>
              {btn}
            </Nav.Item>
          );
        })}
      </Nav>
    </Col>
  );
};
export default Channels;