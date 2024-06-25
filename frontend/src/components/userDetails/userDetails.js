// import React, { Component, useEffect, useState } from "react";
// import AdminHome from "./adminHome";

// import UserHome from "./userHome";

// export default function UserDetails() {
//   const [userData, setUserData] = useState("");
//   const [admin, setAdmin] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:5000/userData", {
//       method: "POST",
//       crossDomain: true,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify({
//         token: window.localStorage.getItem("token"),
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data, "userData");
//         if (data.data.userType == "Admin") {
//           setAdmin(true);
//         }

//         setUserData(data.data);

//         if (data.data == "token expired") {
//           alert("Token expired login again");
//           window.localStorage.clear();
//           window.location.href = "./auth/login";
//         }
//       });
//   }, []);

//   return admin ? <AdminHome /> : <UserHome userData={userData} />;
// }

import AdminHome from "components/adminHome/adminHome";
import UserHome from "components/userHome/userHome";
import React, { useEffect, useState } from "react";
// import AdminHome from "./AdminHome";
// import UserHome from "./UserHome";
//import ProjectManagerDashboard from "./ProjectManagerDashboard";
import ProjectAnalystDashboard from "views/ProjectAnalystDashboard";
import AuditorDashboard from "views/AuditorDashboard";
import ProjectDirector from "views/ProjectDirector";

export default function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState("");

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
          window.location.href = "./auth/login";
        } else {
          setUserData(data.data);
          setUserType(data.data.userType);
        }
      });
  }, []);

  if (!userData) {
    return <div>ERROR 404</div>;
  }

  switch (userType) {
    case "Admin":
      return <AdminHome />;
    case "Project Manager":
      return <UserHome userData={userData} />;
    case "Analyst":
      return <ProjectAnalystDashboard userData={userData} />;
    case "Auditor":
      return <AuditorDashboard userData={userData} />;
    case "Project Director":
      return <ProjectDirector userData={userData} />;
    default:
      return <UserHome userData={userData} />;
  }
}
