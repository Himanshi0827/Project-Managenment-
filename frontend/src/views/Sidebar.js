import React, { useEffect, useState } from "react";
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import Header from './Header';
import MainContent from './MainContent';

const Sidebar = () => {
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState("");
  const [leftMenuVisible, setLeftMenuVisible] = useState(false);
  const [rightMenuVisible, setRightMenuVisible] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data === "token expired") {
          alert("Token expired, login again");
          window.localStorage.clear();
          window.location.href = "./auth";
        } else {
          setUserData(data.data);
          setUserType(data.data.userType);
        }
      });
  }, []);

  const openLeftMenu = () => {
    setLeftMenuVisible(true);
    document.getElementById('leftMenu').style.display = 'block';
  };

  const closeLeftMenu = () => {
    setLeftMenuVisible(false);
    document.getElementById('leftMenu').style.display = 'none';
  };

  const openRightMenu = () => {
    setRightMenuVisible(true);
    document.getElementById('rightMenu').style.display = 'block';
  };

  const closeRightMenu = () => {
    setRightMenuVisible(false);
    document.getElementById('rightMenu').style.display = 'none';
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header openLeftMenu={openLeftMenu} openRightMenu={openRightMenu} userData={userData} />
      <LeftMenu closeLeftMenu={closeLeftMenu} setContent={setContent} />
      <RightMenu closeRightMenu={closeRightMenu} setContent={setContent} />
      <MainContent content={content} />
    </div>
  );
};

export default Sidebar;
