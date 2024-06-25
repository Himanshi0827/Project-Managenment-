import { right } from '@popperjs/core';
import React from 'react';

const LeftMenu = ({ closeLeftMenu, setContent }) => {
  const sidebarStyle = {
    display: 'none',
    width: '250px',
    backgroundColor: ' #e2e8f0',
    position: 'absolute',
    zIndex: 1,
    overflowX: 'hidden',
    transition: '0.5s',
    left: 0,
    paddingTop: '0px'
  };

  const buttonStyle = {
    // position: 'absolute',
    top: '3px',
    left: '20px',
 
    fontSize: '36px',
    marginLeft: '5px',
    // backgroundColor: '#0ea5e9',
    color: 'black',
    border: 'none',
    cursor: 'pointer'
  };

  const linkStyle = {
    padding: '8px 8px 8px 32px',
    textDecoration: 'none',
    fontSize: '25px',
    color: '#333',
    display: 'block',
    transition: '0.3s'
  };

  return (
    <div style={sidebarStyle} id="leftMenu">
      <button onClick={closeLeftMenu} style={buttonStyle}>&times;</button>
      <a onClick={() => setContent('AboutUs')} style={linkStyle}>About Us</a>
      <a onClick={() => setContent('Services')} style={linkStyle}>Services</a>
      <a onClick={() => setContent('Events')} style={linkStyle}>Events</a>
      <a onClick={() => setContent('Contact')} style={linkStyle}>Contact</a>
      <a onClick={() => setContent('Support')} style={linkStyle}>Support</a>
    </div>
  );
};

export default LeftMenu;
