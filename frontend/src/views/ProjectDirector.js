// import React, { useEffect, useState } from "react";

// export default function ProjectDirector({ userData }) {
//   const [projects, setProjects] = useState([]);
//   const [managers, setManagers] = useState([]);
//   const [members, setMembers] = useState([]);
//   const [newProject, setNewProject] = useState({
//     manager: "",
//     title: "",
//     numMembers: 0,
//     selectedMembers: [],
//   });
//   const [queries, setQueries] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showQueries, setShowQueries] = useState(false);

//   useEffect(() => {
//     // Fetch existing projects
//     fetch("http://localhost:5000/projects")
//       .then((response) => response.json())
//       .then((data) => setProjects(data))
//       .catch((error) => console.error("Error fetching projects:", error));

//     // Fetch list of project managers
//     fetch("http://localhost:5000/managers")
//       .then((response) => response.json())
//       .then((data) => setManagers(data))
//       .catch((error) => console.error("Error fetching managers:", error));

//     // Fetch list of members
//     fetch("http://localhost:5000/members")
//       .then((response) => response.json())
//       .then((data) => setMembers(data))
//       .catch((error) => console.error("Error fetching members:", error));

//     // Fetch queries
//     fetch("http://localhost:5000/queries")
//       .then((response) => response.json())
//       .then((data) => setQueries(data))
//       .catch((error) => console.error("Error fetching queries:", error));
//   }, []);

//   const handleNewProjectChange = (e) => {
//     const { name, value } = e.target;
//     setNewProject((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleCreateProject = (e) => {
//     e.preventDefault();
//     if (newProject.selectedMembers.length > newProject.numMembers) {
//       alert("Number of selected members exceeds the specified number of members");
//       return;
//     }
//     fetch("http://localhost:5000/create-project", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newProject),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setProjects((prevState) => [...prevState, data]);
//         alert("Project created successfully!");
//         setNewProject({
//           manager: "",
//           title: "",
//           numMembers: 0,
//           selectedMembers: [],
//         });
//         setShowForm(false);
//       })
//       .catch((error) => console.error("Error creating project:", error));
//   };

//   const handleQueryResolve = (queryId) => {
//     // Implement query resolution logic here
//     alert(`Resolving query ${queryId}`);
//   };

//   const handleMemberSelection = (e) => {
//     const options = Array.from(e.target.options);
//     const selectedMembers = options
//       .filter((option) => option.selected)
//       .map((option) => option.value);

//     if (selectedMembers.length <= newProject.numMembers) {
//       setNewProject((prevState) => ({
//         ...prevState,
//         selectedMembers,
//       }));
//     } else {
//       alert(`You can only select up to ${newProject.numMembers} members.`);
//     }
//   };

//   const logOut = () => {
//     window.localStorage.clear();
//     window.location.href = "./auth/login";
//   };

//   return (
//     <div style={{ backgroundColor: "#e6f7ff", height: "100vh", padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <div style={{ backgroundColor: "#66b2ff", color: "white", padding: "10px 20px", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <div>
//           <p style={{ margin: "0" }}>Name: <strong>{userData.fname}</strong></p>
//           <p style={{ margin: "0" }}>Email: <strong>{userData.email}</strong></p>
//         </div>
//         <div>
//           <button onClick={() => setShowForm(!showForm)} style={{ backgroundColor: "#004080", color: "white", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>
//             {showForm ? "Close Form" : "Create New Project"}
//           </button>
//           <button onClick={() => setShowQueries(!showQueries)} style={{ backgroundColor: "#004080", color: "white", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>
//             {showQueries ? "Hide Queries" : "Show Queries"}
//           </button>
//           <button onClick={logOut} style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer" }}>
//             Log Out
//           </button>
//         </div>
//       </div>
//       <h2 style={{ color: "#004080", textAlign: "center", marginTop: "20px" }}>Project Director Dashboard</h2>

//       <h3 style={{ color: "#004080", marginTop: "20px" }}>Projects</h3>
//       {projects.map((project) => (
//         <div key={project.id} style={{ backgroundColor: "white", padding: "10px 20px", margin: "10px 0", borderRadius: "5px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" }}>
//           <h4 style={{ margin: "0", color: "#004080" }}>{project.title}</h4>
//           <p style={{ margin: "5px 0" }}>Manager: {project.manager}</p>
//           <p style={{ margin: "5px 0" }}>CP: {project.cp}%</p>
//         </div>
//       ))}

//       {showForm && (
//         <div style={{ backgroundColor: "white", padding: "20px", marginTop: "20px", borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", maxWidth: "500px", margin: "20px auto" }}>
//           <h3 style={{ color: "#004080" }}>Create New Project</h3>
//           <form onSubmit={handleCreateProject}>
//             <div className="form-group" style={{ marginBottom: "10px" }}>
//               <label>Project Manager</label>
//               <select
//                 name="manager"
//                 value={newProject.manager}
//                 onChange={handleNewProjectChange}
//                 className="form-control"
//                 style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
//               >
//                 <option value="">Select Manager</option>
//                 {managers.map((manager) => (
//                   <option key={manager.id} value={manager.name}>
//                     {manager.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group" style={{ marginBottom: "10px" }}>
//               <label>Project Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={newProject.title}
//                 onChange={handleNewProjectChange}
//                 className="form-control"
//                 style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
//                 required
//               />
//             </div>
//             <div className="form-group" style={{ marginBottom: "10px" }}>
//               <label>Number of Members</label>
//               <input
//                 type="number"
//                 name="numMembers"
//                 value={newProject.numMembers}
//                 onChange={handleNewProjectChange}
//                 className="form-control"
//                 style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
//                 required
//               />
//             </div>
//             <div className="form-group" style={{ marginBottom: "10px" }}>
//               <label>Select Members</label>
//               <select
//                 name="selectedMembers"
//                 value={newProject.selectedMembers}
//                 onChange={handleMemberSelection}
//                 className="form-control"
//                 style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
//                 multiple
//                 required
//               >
//                 {members.map((member) => (
//                   <option key={member.id} value={member.name}>
//                     {member.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#004080", borderColor: "#004080", padding: "10px 20px", borderRadius: "5px", color: "white", cursor: "pointer" }}>
//               Create Project
//             </button>
//           </form>
//         </div>
//       )}

//       {showQueries && (
//         <div style={{ marginTop: "20px" }}>
//           <h3 style={{ color: "#004080" }}>Queries</h3>
//           {queries.map((query) => (
//             <div key={query.id} style={{ backgroundColor: "white", padding: "10px 20px", margin: "10px 0", borderRadius: "5px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" }}>
//               <p>{query.text}</p>
//               <button onClick={() => handleQueryResolve(query.id)} style={{ backgroundColor: "#004080", color: "white", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer" }}>
//                 Resolve
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

export default function ProjectDirector({ userData }) {
  const [projects, setProjects] = useState([]);
  const [managers, setManagers] = useState([]);
  const [members, setMembers] = useState([]);
  const [newProject, setNewProject] = useState({
    manager: "",
    title: "",
    numMembers: 0,
    selectedMembers: [],
  });
  const [queries, setQueries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showQueries, setShowQueries] = useState(false);

  useEffect(() => {
    // Fetch existing projects
    fetch("http://localhost:5000/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));

    // Fetch list of project managers
    fetch("http://localhost:5000/managers")
      .then((response) => response.json())
      .then((data) => setManagers(data))
      .catch((error) => console.error("Error fetching managers:", error));

    // Fetch list of members
    fetch("http://localhost:5000/members")
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching members:", error));

    // Fetch queries
    fetch("http://localhost:5000/queries")
      .then((response) => response.json())
      .then((data) => setQueries(data))
      .catch((error) => console.error("Error fetching queries:", error));
  }, []);

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (newProject.selectedMembers.length > newProject.numMembers) {
      alert(
        "Number of selected members exceeds the specified number of members"
      );
      return;
    }
    fetch("http://localhost:5000/create-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects((prevState) => [...prevState, data]);
        alert("Project created successfully!");
        setNewProject({
          manager: "",
          title: "",
          numMembers: 0,
          selectedMembers: [],
        });
        setShowForm(false);
      })
      .catch((error) => console.error("Error creating project:", error));
  };

  const handleQueryResolve = (queryId) => {
    // Implement query resolution logic here
    alert(`Resolving query ${queryId}`);
  };

  const handleMemberSelection = (e) => {
    const options = Array.from(e.target.options);
    const selectedMembers = options
      .filter((option) => option.selected)
      .map((option) => option.value);

    if (selectedMembers.length <= newProject.numMembers) {
      setNewProject((prevState) => ({
        ...prevState,
        selectedMembers,
      }));
    } else {
      alert(`You can only select up to ${newProject.numMembers} members.`);
    }
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./auth/login";
  };

  return (
    <div className="bg-blueGray-100 min-h-screen p-6 font-sans px-3 py-3">
      <div className="bg-blueGray-800 text-white p-4 rounded flex justify-between items-center">
        <div>
          <p className="m-0">
            Name: <strong>{userData.fname}</strong>
          </p>
          <p className="m-0">
            Email: <strong>{userData.email}</strong>
          </p>
        </div>
        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blueGray-600 text-white px-4 py-2 rounded shadow hover:bg-blueGray-700 mr-2"
          >
            {showForm ? "Close Form" : "Create New Project"}
          </button>
          <button
            onClick={() => setShowQueries(!showQueries)}
            className="bg-blueGray-600 text-white px-4 py-2 rounded shadow hover:bg-blueGray-700 mr-2"
          >
            {showQueries ? "Hide Queries" : "Show Queries"}
          </button>
          <button
            onClick={logOut}
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      </div>
      <h1 className="text-blueGray-800 text-center mt-4">
        <b>Project Director Dashboard</b>
      </h1>

      <h3 className="text-blueGray-800 mt-4">Projects</h3>
      {projects.map((project) => (
        <div key={project.id} className="bg-white p-4 my-2 rounded shadow-md">
          <h4 className="m-0 text-blueGray-800">{project.title}</h4>
          <p className="m-0">Manager: {project.manager}</p>
          <p className="m-0">CP: {project.cp}%</p>
        </div>
      ))}

      {showForm && (
        <div className="bg-white p-6 mt-4 rounded shadow-md max-w-lg mx-auto px-4 ">
          <h1 className="text-blueGray-800">Create New Project</h1>
          <form onSubmit={handleCreateProject}>
            <div className="mb-4">
              <label className="block text-blueGray-600">Project Manager</label>
              <select
                name="manager"
                value={newProject.manager}
                onChange={handleNewProjectChange}
                className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
              >
                <option value="">Select Manager</option>
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.name}>
                    {manager.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-blueGray-600">Project Title</label>
              <input
                type="text"
                name="title"
                value={newProject.title}
                onChange={handleNewProjectChange}
                className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-blueGray-600">
                Number of Members
              </label>
              <input
                type="number"
                name="numMembers"
                value={newProject.numMembers}
                onChange={handleNewProjectChange}
                className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-blueGray-600">Select Members</label>
              <select
                name="selectedMembers"
                value={newProject.selectedMembers}
                onChange={handleMemberSelection}
                className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                multiple
                required
              >
                {members.map((member) => (
                  <option key={member.id} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            >
              Create Project
            </button>
          </form>
        </div>
      )}

      {showQueries && (
        <div className="mt-4">
          <h3 className="text-blueGray-800">Queries</h3>
          {queries.map((query) => (
            <div key={query.id} className="bg-white p-4 my-2 rounded shadow-md">
              <p>{query.text}</p>
              <button
                onClick={() => handleQueryResolve(query.id)}
                className="bg-blueGray-600 text-white px-4 py-2 rounded shadow hover:bg-blueGray-700"
              >
                Resolve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";

// export default function ProjectDirector({ userData }) {
//   const [projects, setProjects] = useState([]);
//   const [managers, setManagers] = useState([]);
//   const [members, setMembers] = useState([]);
//   const [newProject, setNewProject] = useState({
//     manager: "",
//     title: "",
//     numMembers: 0,
//     selectedMembers: [],
//   });
//   const [queries, setQueries] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showQueries, setShowQueries] = useState(false);

//   useEffect(() => {
//     // Fetch existing projects
//     fetch("http://localhost:5000/projects")
//       .then((response) => response.json())
//       .then((data) => setProjects(data))
//       .catch((error) => console.error("Error fetching projects:", error));

//     // Fetch list of project managers
//     fetch("http://localhost:5000/managers")
//       .then((response) => response.json())
//       .then((data) => setManagers(data))
//       .catch((error) => console.error("Error fetching managers:", error));

//     // Fetch list of members
//     fetch("http://localhost:5000/members")
//       .then((response) => response.json())
//       .then((data) => setMembers(data))
//       .catch((error) => console.error("Error fetching members:", error));

//     // Fetch queries
//     fetch("http://localhost:5000/queries")
//       .then((response) => response.json())
//       .then((data) => setQueries(data))
//       .catch((error) => console.error("Error fetching queries:", error));
//   }, []);

//   const handleNewProjectChange = (e) => {
//     const { name, value } = e.target;
//     setNewProject((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleCreateProject = (e) => {
//     e.preventDefault();
//     if (newProject.selectedMembers.length > newProject.numMembers) {
//       alert("Number of selected members exceeds the specified number of members");
//       return;
//     }
//     fetch("http://localhost:5000/create-project", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newProject),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setProjects((prevState) => [...prevState, data]);
//         alert("Project created successfully!");
//         setNewProject({
//           manager: "",
//           title: "",
//           numMembers: 0,
//           selectedMembers: [],
//         });
//         setShowForm(false);
//       })
//       .catch((error) => console.error("Error creating project:", error));
//   };

//   const handleQueryResolve = (queryId) => {
//     // Implement query resolution logic here
//     alert(`Resolving query ${queryId}`);
//   };

//   const handleMemberSelection = (e) => {
//     const options = Array.from(e.target.options);
//     const selectedMembers = options
//       .filter((option) => option.selected)
//       .map((option) => option.value);

//     if (selectedMembers.length <= newProject.numMembers) {
//       setNewProject((prevState) => ({
//         ...prevState,
//         selectedMembers,
//       }));
//     } else {
//       alert(`You can only select up to ${newProject.numMembers} members.`);
//     }
//   };

//   const logOut = () => {
//     window.localStorage.clear();
//     window.location.href = "./auth/login";
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-inner">
//         <h2>Project Director Dashboard</h2>
//         <p>
//           Name: <strong>{userData.fname}</strong>
//         </p>
//         <p>
//           Email: <strong>{userData.email}</strong>
//         </p>
//         <button onClick={logOut}>Log Out</button>

//         <h3>Projects</h3>
//         {projects.map((project) => (
//           <div key={project.id} className="project-card">
//             <h4>{project.title}</h4>
//             <p>Manager: {project.manager}</p>
//             <p>CP: {project.cp}%</p>
//           </div>
//         ))}

//         {showForm && (
//           <div className="form-container">
//             <h3>Create New Project</h3>
//             <form onSubmit={handleCreateProject}>
//               <div className="form-group">
//                 <label>Project Manager</label>
//                 <select
//                   name="manager"
//                   value={newProject.manager}
//                   onChange={handleNewProjectChange}
//                   className="form-control"
//                 >
//                   <option value="">Select Manager</option>
//                   {managers.map((manager) => (
//                     <option key={manager.id} value={manager.name}>
//                       {manager.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Project Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={newProject.title}
//                   onChange={handleNewProjectChange}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Number of Members</label>
//                 <input
//                   type="number"
//                   name="numMembers"
//                   value={newProject.numMembers}
//                   onChange={handleNewProjectChange}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Select Members</label>
//                 <select
//                   name="selectedMembers"
//                   value={newProject.selectedMembers}
//                   onChange={handleMemberSelection}
//                   className="form-control"
//                   multiple
//                   required
//                 >
//                   {members.map((member) => (
//                     <option key={member.id} value={member.name}>
//                       {member.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Create Project
//               </button>
//             </form>
//           </div>
//         )}

//         {showQueries && (
//           <div className="queries-container">
//             <h3>Queries</h3>
//             {queries.map((query) => (
//               <div key={query.id} className="query-card">
//                 <p>{query.text}</p>
//                 <button onClick={() => handleQueryResolve(query.id)}>
//                   Resolve
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="actions">
//           <button onClick={() => setShowForm(!showForm)} className="btn btn-secondary">
//             {showForm ? "Close Form" : "Create New Project"}
//           </button>
//           <button onClick={() => setShowQueries(!showQueries)} className="btn btn-secondary">
//             {showQueries ? "Hide Queries" : "Show Queries"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
