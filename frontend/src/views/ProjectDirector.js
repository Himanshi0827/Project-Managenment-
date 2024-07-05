import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function ProjectDirector({ userData }) {
  const [projects, setProjects] = useState([]);
  const [managers, setManagers] = useState([]);
  const [members, setMembers] = useState([]);
  const [newProject, setNewProject] = useState({
    projectNumber: "",
    projectManagerName: "",
    clientName: "",
    projectTitle: "",
    projectDesc: "",
    projectStatus: "",
    email: "",
    dateOfCreation: "",
    numberOfmembers: 0,
    priority: "",
    CP: 0,
  });
  const [queries, setQueries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showQueries, setShowQueries] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    // Fetch existing projects
    // fetch("http://localhost:5000/projects")
    //   .then((response) => response.json())
    //   .then((data) => setProjects(data))
    //   .catch((error) => console.error("Error fetching projects:", error));
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

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevState) => ({
      ...prevState,
      [name]: value,
      [name]: name === "numberOfMembers" ? Number(value) : value,
    }));
  };
  const handleCreateProject = (e) => {
    e.preventDefault();
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
          projectNumber: "",
          projectManagerName: "",
          clientName: "",
          projectTitle: "",
          projectDesc: "",
          projectStatus: "",
          email: "",
          dateOfCreation: "",
          numberOfmembers: "",
          priority: "",
          CP: 0,
        });
        setShowForm(false);
      })
      .catch((error) => console.error("Error creating project:", error));
  };
  // const handleCreateProject = (e) => {
  //   e.preventDefault();
  //   if (newProject.selectedMembers.length > newProject.numMembers) {
  //     alert(
  //       "Number of selected members exceeds the specified number of members"
  //     );
  //     return;
  //   }
  //   fetch("http://localhost:5000/create-project", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newProject),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProjects((prevState) => [...prevState, data]);
  //       alert("Project created successfully!");
  //       setNewProject({
  //         manager: "",
  //         title: "",
  //         numMembers: 0,
  //         selectedMembers: [],
  //       });
  //       setShowForm(false);
  //     })
  //     .catch((error) => console.error("Error creating project:", error));
  // };

  const handleQueryResolve = (queryId) => {
    // Implement query resolution logic here
    alert(`Resolving query ${queryId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JavaScript
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
  //project

  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = projects.filter((project) =>
    project.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rowsPerPage = 5;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProjects.slice(indexOfFirstRow, indexOfLastRow);
  //const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const [selectedRequirements, setSelectedRequirements] = useState([]);

  const handleCheckboxChange = (event, requirementId) => {
    if (event.target.checked) {
      // Add the requirement ID to the selectedRequirements array
      setSelectedRequirements([...selectedRequirements, requirementId]);
    } else {
      // Remove the requirement ID from the selectedRequirements array
      setSelectedRequirements(
        selectedRequirements.filter((id) => id !== requirementId)
      );
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div
      className="bg-blueGray-100 min-h-screen p-6 font-sans px-3 py-3"
    >
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
      <h1
        className="text-blueGray-800 text-center mt-4"
        style={{ fontFamily: "Rubik", fontSize: "28px" }}
      >
        <b>Project Director</b>
      </h1>

      <h3 className="text-blueGray-800 mt-4">Projects</h3>

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
      {/* {showForm && (
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
           
            <button
              type="submit"
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            >
              Create Project
            </button>
          </form>
        </div>
      )} */}
      {showForm && (
        <div className="bg-white p-6 mt-4 rounded shadow-md max-w-lg mx-auto px-4 ">
          <div
            className="w-1/2  px-6 justify-items"
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "315px",
            }}
          >
            <h1 className="text-blueGray-600 text-xl font-bold mb-1 text-center">
              Create New Project
            </h1>
            <form
              onSubmit={handleCreateProject}
              className="mt-4 bg-blueGray-50 p-4 rounded shadow-inner"
              style={{ borderRadius: "30px" }}
            >
              <div className="mb-4">
                <label className="block text-blueGray-600">
                  Project Number
                </label>
                <input
                  type="number"
                  name="projectNumber"
                  value={newProject.projectNumber}
                  onChange={handleNewProjectChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  style={{ borderRadius: "15px" }}
                  required
                />
              </div>

              {/*<div className="mb-4">
              <label className="block text-blueGray-600">
                Project Manager
              </label>
              <select
                name="projectManagerName"
                value={newProject.projectManagerName}
                onChange={handleNewProjectChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                style={{ borderRadius: "15px" }}
              >
                <option value="">Select Manager</option>
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.name}>
                    {manager.name}
                  </option>
                ))}
              </select>
            </div>*/}

              <div className="mb-4">
                <label className="block text-blueGray-600">
                  Project Manager
                </label>
                <select
                  name="projectManagerName"
                  value={newProject.projectManagerName}
                  onChange={handleNewProjectChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  style={{ borderRadius: "15px" }}
                >
                  <option value="">Select Manager</option>
                  {managers.map((manager) => (
                    <option key={manager._id} value={manager.fname}>
                      {manager.fname} {manager.lname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-blueGray-600">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={newProject.clientName}
                  onChange={handleNewProjectChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  style={{ borderRadius: "15px" }}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-blueGray-600">Project Title</label>
                <input
                  type="text"
                  name="projectTitle"
                  value={newProject.projectTitle}
                  onChange={handleNewProjectChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  style={{ borderRadius: "15px" }}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-blueGray-600">Description</label>
                <input
                  type="text"
                  name="projectDesc"
                  value={newProject.projectDesc}
                  onChange={handleNewProjectChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  style={{ borderRadius: "15px" }}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="projectStatus"
                  value={newProject.projectStatus}
                  onChange={handleNewProjectChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  style={{ borderRadius: "15px" }}
                >
                  <option value="">Select Status</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Waiting">Waiting</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-blueGray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newProject.email}
                  onChange={handleNewProjectChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  style={{ borderRadius: "15px" }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-blueGray-600">
                  Date of Creation
                </label>
                <input
                  type="date"
                  name="dateOfCreation"
                  value={newProject.dateOfCreation}
                  onChange={handleNewProjectChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  style={{ borderRadius: "15px" }}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-blueGray-600">
                  Number of Members
                </label>
                <input
                  type="number"
                  name="numberOfmembers"
                  value={newProject.numberOfmembers}
                  onChange={handleNewProjectChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  style={{ borderRadius: "15px" }}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={newProject.priority}
                  onChange={handleNewProjectChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  style={{ borderRadius: "15px" }}
                >
                  <option value="">Select priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-4"
              >
                Create Project
              </button>
            </form>
          </div>
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
