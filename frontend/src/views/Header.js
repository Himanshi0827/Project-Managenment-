import React, { useEffect, useState, useRef } from "react";

const Header = ({ openLeftMenu, openRightMenu , userData }) => {
  
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#334155',
    padding: '1rem'
  };

  const buttonStyle = {
    fontSize: '24px',
  
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  };
  const logOut = () => {
        window.localStorage.clear();
        window.location.href = "/auth/login";
      };

  return (
    <div style={headerStyle}>
    
      <button style={buttonStyle} onClick={openLeftMenu}>&#9776;</button>
      <div>
                   <p className="text-blueGray-100">
                     Name: <strong>{userData.fname}</strong>
                   </p>
                   <p className="text-blueGray-100">
                    Email: <strong>{userData.email}</strong>
                  </p>
                 </div>
      <div>
        <h1 style={{ color: 'white' }}>Project Analyst </h1>
      </div>
      <button
                    onClick={logOut}
                    className="bg-red-500 text-white active:bg-red-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Log Out
                  </button>
      <button style={buttonStyle} onClick={openRightMenu}>&#9776;</button>
    </div>
  );
};

export default Header;
