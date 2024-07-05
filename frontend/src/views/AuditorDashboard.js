import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";

export default function AuditorDashboard({ userData }) {
  const [projects, setProjects] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [managers, setManagers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState({
    projectId: "",
    description: "",
    rating: "1",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Projects fetched:", data.projects); // Log fetched projects for debugging
        setProjects(data.projects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
    // Fetch list of project managers

    const fetchManagers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/project-managers"
        ); // Adjust the endpoint URL as necessary
        setManagers(response.data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };

    fetchManagers();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./auth/login";
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", feedback);
    // Post the feedback to the server or handle accordingly
    setShowFeedbackModal(false);
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = projects.filter((project) =>
    project.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rowsPerPage = 5;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProjects.slice(indexOfFirstRow, indexOfLastRow);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
            onClick={logOut}
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      </div>
      <h1 className="text-blueGray-800 text-center mt-4" style={{fontSize:'28px'}}>
        <b>Project Auditor</b>
      </h1>

      <div className="flex flex-col items-center mt-10">
        <div className="w-full max-w-7xl mb-4">
          <input
            type="text"
            placeholder="Search by Client Name"
            className="w-full px-4 py-2 border rounded shadow focus:outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="overflow-x-auto w-full max-w-7xl items-center">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <table
              component={Paper}
              className="w-full min-w-full leading-normal border-collapse border items-center"
            >
              <thead
                sx={{ minWidth: 650 }}
                className="bg-gray-900"
                style={{ borderRadius: "10px 10px 0 0" }}
              >
                <tr style={{ background: "#334155", textAlign: "center" }}>
                  <th
                    scope="col"
                    className="px-8 py-5 border border-gray-200 bg-gray-800 text-center text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    Project Id
                  </th>
                  <th
                    scope="col"
                    className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    Client Name
                  </th>
                  <th
                    scope="col"
                    className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    Project Title
                  </th>
                  <th
                    scope="col"
                    className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    Manager
                  </th>
                  <th
                    scope="col"
                    className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    No of Members
                  </th>
                  <th
                    scope="col"
                    className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    CP
                  </th>
                  {/* <th
                      scope="col"
                      className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider"
                    >
                      Form
                    </th> */}
                </tr>
              </thead>
              <tbody style={{ background: "white" }}>
                {currentRows.map((project) => (
                  <tr
                    key={project.projectNumber}
                    className="cursor-pointer hover:bg-gray-300 text-center"
                    // onClick={() => handleProjectSelect(project)}
                  >
                    <td className="px-8 py-5 border border-gray-200 bg-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap text-center">
                        {project.projectNumber}
                      </p>
                    </td>
                    <td className="px-8 py-5 border border-gray-200 bg-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap text-center">
                        {project.clientName}
                      </p>
                    </td>
                    <td className="px-8 py-5 border border-gray-200 bg-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap text-center">
                        {project.projectTitle}
                      </p>
                    </td>
                    <td className="px-8 py-5 border border-gray-200 bg-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap text-center">
                        {project.projectManagerName}
                      </p>
                    </td>
                    <td className="px-8 py-5 border border-gray-200 bg-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap text-center">
                        {project.projectDesc}
                      </p>
                    </td>
                    <td className="px-8 py-5 border border-gray-200 bg-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap text-center">
                        {formatDate(project.dateOfCreation)}
                      </p>
                    </td>
                    <td className="px-8 py-5 border border-gray-200 bg-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap text-center">
                        {project.projectStatus}
                      </p>
                    </td>
                    <td className="px-8 py-5 border border-gray-200 bg-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap text-center">
                        {project.numberOfmembers}
                      </p>
                    </td>
                    <td className="px-8 py-5 border border-gray-200 bg-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap text-center">
                        {project.CP}
                      </p>
                    </td>
                    {/* <td className="px-8 py-5 border border-gray-200 bg-gray-200 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">
                          <Link
                            to={{
                              pathname: "/temp",
                              state: {
                                projectNumber: project.projectNumber,
                                projectTitle: project.projectTitle,
                                createdBy: managerEmail
                              },
                            }}
                          >
                            <button
                              className="ml-auto  bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                              type="button"

                            >
                              Open
                            </button>
                          </Link>
                        </p>
                      </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between w-full max-w-7xl py-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded shadow"
          >
            &lt; Prev
          </button>
          <div>Page {currentPage}</div>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredProjects.length / rowsPerPage)
            }
            className="px-4 py-2 bg-gray-300 rounded shadow"
          >
            Next &gt;
          </button>
        </div>
      </div>

      <button
        onClick={() => setShowFeedbackModal(true)}
        style={{
          backgroundColor: "#004080",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        Feedback
      </button>
      {showFeedbackModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "300px",
            }}
          >
            <h4 style={{ color: "#004080" }}>Submit Feedback</h4>
            <form onSubmit={handleFeedbackSubmit}>
              <label>
                Project:
                <select
                  name="projectId"
                  value={feedback.projectId}
                  onChange={handleFeedbackChange}
                  style={{ display: "block", width: "100%", marginTop: "5px" }}
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option
                      key={project.projectNumber}
                      value={project.projectNumber}
                    >
                      {project.name}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ marginTop: "10px" }}>
                Description:
                <textarea
                  name="description"
                  value={feedback.description}
                  onChange={handleFeedbackChange}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "80px",
                    marginTop: "5px",
                  }}
                />
              </label>
              <label style={{ marginTop: "10px" }}>
                Rating:
                <select
                  name="rating"
                  value={feedback.rating}
                  onChange={handleFeedbackChange}
                  style={{ display: "block", width: "100%", marginTop: "5px" }}
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                style={{
                  marginTop: "10px",
                  backgroundColor: "#004080",
                  color: "white",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowFeedbackModal(false)}
                style={{
                  marginTop: "10px",
                  marginLeft: "5px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";

// export default function AuditorDashboard({ userData }) {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     // Fetch project data
//     fetch("http://localhost:5000/auditor-projects")
//       .then((response) => response.json())
//       .then((data) => setProjects(data))
//       .catch((error) => console.error("Error fetching projects:", error));
//   }, []);

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
//           <button onClick={logOut} style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer" }}>
//             Log Out
//           </button>
//         </div>
//       </div>
//       <h2 style={{ color: "#004080", textAlign: "center", marginTop: "20px" }}>Auditor Dashboard</h2>
//       <h3 style={{ color: "#004080", marginTop: "20px" }}>Project List</h3>
//       {projects.length > 0 ? (
//         projects.map((project) => (
//           <div key={project.projectNumber} style={{ backgroundColor: "white", padding: "10px 20px", margin: "10px 0", borderRadius: "5px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)", cursor: "pointer" }}>
//             <h4 style={{ margin: "0", color: "#004080" }}>{project.name}</h4>
//             <p style={{ margin: "5px 0" }}>Status: {project.projectStatus}</p>
//             <p>CP: {project.CP}%</p>
//           </div>
//         ))
//       ) : (
//         <p>No projects available.</p>
//       )}
//       <button onClick={() => alert("Feedback functionality to be implemented")} style={{ backgroundColor: "#004080", color: "white", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer", position: "fixed", bottom: "20px", right: "20px" }}>
//         Feedback
//       </button>
//     </div>
//   );
// }
