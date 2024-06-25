// import React, { useEffect, useState } from "react";

// export default function UserHome({ userData }) {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     // Assuming projects are fetched from an API endpoint
//     fetch(`http://localhost:5000/projects?managerId=${userData.id}`)
//       .then(response => response.json())
//       .then(data => setProjects(data))
//       .catch(error => console.error("Error fetching projects:", error));
//   }, [userData.id]);

//   const logOut = () => {
//     window.localStorage.clear();
//     window.location.href = "./auth/login";
//   };

//   const handleEdit = (projectId) => {
//     // Redirect to the project edit page or show edit modal
//     window.location.href = `./edit-project/${projectId}`;
//   };

//   const styles = {
//     body: {
//       backgroundColor: '#f0f8ff',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       flexDirection: 'column',
//       height: '100vh',
//       margin: 0,
//       fontFamily: 'Arial, sans-serif',
//     },
//     authWrapper: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       width: '100%',
//     },
//     authInner: {
//       background: 'rgb(255, 255, 255)',
//       padding: '47px',
//       borderRadius: '10px',
//       boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//       maxWidth: '800px',
//       width: '800px',
//       marginBottom: '20px',
//     },
//     header: {
//       textAlign: 'center',
//       color: '#007bff',
//     },
//     projectCard: {
//       background: '#fff',
//       padding: '20px',
//       margin: '10px 0',
//       borderRadius: '10px',
//       boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
//       width: '100%',
//     },
//     projectTitle: {
//       fontSize: '1.5em',
//       color: '#007bff',
//     },
//     projectDetails: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     },
//     projectCP: {
//       fontSize: '1.2em',
//       color: '#28a745',
//     },
//     editButton: {
//       backgroundColor: '#007bff',
//       borderColor: '#007bff',
//       color: '#fff',
//       padding: '10px 20px',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       textDecoration: 'none',
//     },
//     logOutButton: {
//       backgroundColor: '#dc3545',
//       borderColor: '#dc3545',
//       color: '#fff',
//       padding: '10px 20px',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       textAlign: 'center',
//       textDecoration: 'none',
//     },
//   };

//   return (
//     <div style={styles.body}>
//       <div style={styles.authWrapper}>
//         <div style={styles.authInner}>
//           <h2 style={styles.header}>Project Manager Dashboard</h2>
//           <p>Name: <strong>{userData.fname}</strong></p>
//           <p>Email: <strong>{userData.email}</strong></p>
//           <button onClick={logOut} style={styles.logOutButton}>
//             Log Out
//           </button>
//         </div>
//         <div style={styles.authInner}>
//           <h3 style={styles.header}>My Projects</h3>
//           {projects.map(project => (
//             <div key={project.projectNumber} style={styles.projectCard}>
//               <div style={styles.projectDetails}>
//                 <div>
//                   <h4 style={styles.projectTitle}>{project.name}</h4>
//                   <p>CP: <span style={styles.projectCP}>{project.CP}%</span></p>
//                 </div>
//                 <button
//                   onClick={() => handleEdit(project.projectNumber)}
//                   style={styles.editButton}
//                 >
//                   Edit
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // the last code

// import React, { useEffect, useState } from "react";

// export default function UserHome({ userData }) {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     // Assuming projects are fetched from an API endpoint
//     fetch(`http://localhost:5000/projects?managerId=${userData.id}`)
//       .then(response => response.json())
//       .then(data => setProjects(data))
//       .catch(error => console.error("Error fetching projects:", error));
//   }, [userData.id]);

//   const logOut = () => {
//     window.localStorage.clear();
//     window.location.href = "./auth/login";
//   };

//   const handleEdit = (projectId) => {
//     // Redirect to the project edit page or show edit modal
//     window.location.href = `./edit-project/${projectId}`;
//   };

//   const styles = {
//     body: {
//       backgroundColor: '#f0f8ff',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       flexDirection: 'column',
//       height: '100vh',
//       margin: 0,
//       fontFamily: 'Arial, sans-serif',
//     },
//     authWrapper: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       width: '100%',
//     },
//     authInner: {
//       background: 'rgb(255, 255, 255)',
//       padding: '47px',
//       borderRadius: '10px',
//       boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//       maxWidth: '800px',
//       width: '800px',
//       marginBottom: '20px',
//     },
//     header: {
//       textAlign: 'center',
//       color: '#007bff',
//     },
//     projectCard: {
//       background: '#fff',
//       padding: '20px',
//       margin: '10px 0',
//       borderRadius: '10px',
//       boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
//       width: '100%',
//     },
//     projectTitle: {
//       fontSize: '1.5em',
//       color: '#007bff',
//     },
//     projectDetails: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     },
//     projectCP: {
//       fontSize: '1.2em',
//       color: '#28a745',
//     },
//     editButton: {
//       backgroundColor: '#007bff',
//       borderColor: '#007bff',
//       color: '#fff',
//       padding: '10px 20px',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       textDecoration: 'none',
//     },
//     logOutButton: {
//       backgroundColor: '#dc3545',
//       borderColor: '#dc3545',
//       color: '#fff',
//       padding: '10px 20px',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       textAlign: 'center',
//       textDecoration: 'none',
//     },
//   };

//   return (
//     <div style={styles.body}>
//       <div style={styles.authWrapper}>
//         <div style={styles.authInner}>
//           <h2 style={styles.header}>Project Manager Dashboard</h2>
//           <p>Name: <strong>{userData.fname}</strong></p>
//           <p>Email: <strong>{userData.email}</strong></p>
//           <button onClick={logOut} style={styles.logOutButton}>
//             Log Out
//           </button>
//         </div>
//         <div style={styles.authInner}>
//           <h3 style={styles.header}>My Projects</h3>
//           {projects.map(project => (
//             <div key={project.projectNumber} style={styles.projectCard}>
//               <div style={styles.projectDetails}>
//                 <div>
//                   <h4 style={styles.projectTitle}>{project.name}</h4>
//                   <p>CP: <span style={styles.projectCP}>{project.CP}%</span></p>
//                 </div>
//                 <button
//                   onClick={() => handleEdit(project.projectNumber)}
//                   style={styles.editButton}
//                 >
//                   Edit
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

import Sidebar from "./Sidebar_";

export default function Dashboard() {
  return (
    <div>
      <Sidebar />
    </div>
  );
}

// import React, { useEffect, useState } from "react";

// export default function UserHome({ userData }) {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/projects?managerId=${userData.id}`)
//       .then(response => response.json())
//       .then(data => setProjects(data))
//       .catch(error => console.error("Error fetching projects:", error));
//   }, [userData.id]);

//   const logOut = () => {
//     window.localStorage.clear();
//     window.location.href = "./auth/login";
//   };

//   const handleEdit = (projectId) => {
//     window.location.href = `./edit-project/${projectId}`;
//   };

//   const styles = {
//     body: {
//       backgroundColor: '#e6f7ff',
//       minHeight: '100vh',
//       padding: '20px',
//       fontFamily: 'Arial, sans-serif',
//     },
//     navbar: {
//       background: '#007bff',
//       padding: '10px 20px',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       color: '#ffffff'
//     },
//     authInner: {
//       backgroundColor: 'white',
//       padding: '20px',
//       borderRadius: '5px',
//       boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//       marginBottom: '20px',
//     },
//     header: {
//       textAlign: 'center',
//       color: '#007bff',
//     },
//     projectCard: {
//       backgroundColor: '#fff',
//       padding: '15px',
//       margin: '10px 0',
//       borderRadius: '5px',
//       boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
//     },
//     button: {
//       backgroundColor: '#0056b3',
//       color: '#ffffff',
//       border: 'none',
//       padding: '10px 20px',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       marginRight: '10px',
//     },
//     logOutButton: {
//       backgroundColor: '#dc3545',
//       color: '#ffffff',
//       border: 'none',
//       padding: '10px 20px',
//       borderRadius: '5px',
//       cursor: 'pointer',
//     },
//   };

//   return (
//     <div style={styles.body}>
//       <div style={styles.navbar}>
//         <h1>Project Manager Dashboard</h1>
//         <div>
//           <button onClick={() => { /* query logic here */ }} style={styles.button}>
//             Query
//           </button>
//           <button onClick={logOut} style={styles.logOutButton}>
//             Log Out
//           </button>
//         </div>
//       </div>
//       <div style={styles.authInner}>
//         <h3 style={styles.header}>My Projects</h3>
//         {projects.map(project => (
//           <div key={project.projectNumber} style={styles.projectCard}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>
//                 <h4>{project.name}</h4>
//                 <p>CP: <span>{project.CP}%</span></p>
//               </div>
//               <div>
//                 <button onClick={() => handleEdit(project.projectNumber)} style={styles.button}>Edit</button>
//                 <button onClick={() => console.log("View clicked for", project.projectNumber)} style={styles.button}>View</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
