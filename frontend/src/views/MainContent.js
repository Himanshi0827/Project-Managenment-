import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

// const navigate = useNavigate();

const MainContent = ({ content, userData }) => {
  const history = useHistory();

  const showForm = (projectNumber) => {
    history.push("/temp", { projectNumber: projectNumber });
  };

  const containerStyle = {
    padding: "20px",
    backgroundColor: "white",
    color: "#334155",
  };

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [showCPForm, setShowCPForm] = useState(false);
  const [showRMForm, setShowRMForm] = useState(false);
  const [cpInputs, setCpInputs] = useState({
    requirementNo: "",
    task: "",
    inputElements: "Low",
    tableViews: "Low",
    interfaceClass: "Low",
    functionsLogic: "Low",
    rAndDComponent: "Low",
  });
  const [rmInputs, setRmInputs] = useState({
    requirementDate: "",
    requirementChangeNo: "",
    changeDate: "",
    description: "",
    requirementGatheredBy: "",
    providedBy: "",
    remarks: "",
    priority: "Low",
    modeOfReceipt: "videocall",
    actionsToBeTaken: "",
    completionDate: "",
    responsibility: "",
    impactOfNewRequirement: "",
    dependency: "",
    requirementAcceptance: "yes",
    status: "ongoing",
  });

  // changes
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    file: null,
    requirementDate: "",
    requirementChangeNumber: "",
    changeDate: "",
    description: "",
    requirementGatheredBy: "",
    providedBy: "",
    remarks: "",
    priority: "Low",
    modeOfReceipt: "videocall",
    actionsToBeTaken: "",
    completionDate: "",
    responsibility: "",
    requirementOutputName: "",
    impactOfNewRequirementsOrChanges: "",
    dependency: "",
    requirementAcceptance: "yes",
    status: "ongoing",
  });
  // const [requirements, setRequirements] = useState([]);
  const [selectedRequirementId, setSelectedRequirementId] = useState("");

  useEffect(() => {
    fetchRequirements();
  }, []);

  useEffect(() => {
    if (selectedRequirementId) {
      const selectedRequirement = requirements.find(
        (req) => req.requirementNumber === selectedRequirementId
      );
      if (selectedRequirement) {
        setFormData({
          projectNumber: selectedRequirement.projectNumber || "",
          requirementNumber: selectedRequirement.requirementNumber || "",
          requirementDate: selectedRequirement.requirementDate || "",
          requirementChangeNumber:
            selectedRequirement.requirementChangeNumber || "null",
          changeDate: selectedRequirement.changeDate || "",
          description: selectedRequirement.description || "",
          requirementGatheredBy:
            selectedRequirement.requirementGatheredBy || "",
          providedBy: selectedRequirement.providedBy || "",
          remarks: selectedRequirement.remarks || "",
          priority: selectedRequirement.priority || "Low",
          modeOfReceipt: selectedRequirement.modeOfReceipt || "videocall",
          actionsToBeTaken: selectedRequirement.actionsToBeTaken || "",
          completionDate: selectedRequirement.completionDate || "",
          responsibility: selectedRequirement.responsibility || "",
          impactOfNewRequirementsOrChanges:
            selectedRequirement.impactOfNewRequirementsOrChanges || "",
          dependency: selectedRequirement.dependency || "",
          requirementOutputName:
            selectedRequirement.requirementOutputName || "",
          requirementAcceptance:
            selectedRequirement.requirementAcceptance || "Yes",
          status: selectedRequirement.status || "ongoing",
        });
      } else {
        const generateRequirementNumber = async () => {
          const projectNumber = selectedProject.projectNumber; // You can set this dynamically as needed
          const count = requirements.filter(
            (req) => req.projectNumber === projectNumber
          ).length;

          const requirementCount = count + 1;
          const mainPart = `R${String(projectNumber).padStart(2, "0")}.00.`;
          const lastPart = String(requirementCount % 100).padStart(2, "0");
          const middlePart = String(
            Math.floor(requirementCount / 100)
          ).padStart(2, "0");
          const newRequirementNumber = `${mainPart}${middlePart}${lastPart}`;

          setFormData((prevData) => ({
            ...prevData,
            requirementNumber: newRequirementNumber,
          }));
        };

        generateRequirementNumber();

        setFormData({
          projectNumber: selectedProject.projectNumber,
          requirementDate: "",
          requirementChangeNumber: "null",
          changeDate: "",
          description: "",
          requirementGatheredBy: "",
          providedBy: "",
          remarks: "",
          priority: "Low",
          modeOfReceipt: "videocall",
          actionsToBeTaken: "",
          completionDate: "",
          responsibility: "",
          impactOfNewRequirementsOrChanges: "",
          requirementOutputName: "",
          dependency: "",
          requirementAcceptance: "Yes",
          status: "ongoing",
        });
      }
    }
  }, [selectedRequirementId, requirements]);

  const fetchRequirements = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-requirements");
      const data = await response.json();
      setRequirements(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRequirementSelect = (e) => {
    setSelectedRequirementId(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  //change
  const [selectedDate, setSelectedDate] = useState("");
  const [queryForms, setQueryForms] = useState({});
  const [queryInputs, setQueryInputs] = useState({});
  const [showQueries, setShowQueries] = useState(false);

  const requirementRefs = useRef({});

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
        // Optionally, you can set a default empty array or handle the error state
        // setProjects([]); // Set empty array if needed
      });
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setShowCPForm(false);

    fetch(`http://localhost:5000/api/requirements/${project.projectNumber}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok" && Array.isArray(data.requirements)) {
          setRequirements(data.requirements);
          requirementRefs.current = data.requirements.reduce(
            (acc, requirement) => {
              acc[requirement.requirementNumber] = React.createRef();
              return acc;
            },
            {}
          );
        } else {
          console.error("Invalid data format received for requirements:", data);
        }
      })
      .catch((error) => console.error("Error fetching requirements:", error));
  };

  const handleCalculateCP = (requirementNumber) => {
    setSelectedRequirementId(requirementNumber);
    setShowCPForm(true);
  };

  const handleManageRequirements = (requirementNumber) => {
    setSelectedRequirementId(requirementNumber);
    setShowRMForm(true);
    setShowCPForm(false);
  };
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "/auth/login";
  };

  const handleCpInputChange = (e) => {
    const { name, value } = e.target;
    setCpInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };
  const handleRmInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // setRmInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    setFormData((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleCpFormSubmit = async (e) => {
    e.preventDefault();

    const cpValues = {
      Low: 0.25,
      Medium: 0.5,
      High: 1,
    };

    const cp =
      cpValues[cpInputs.inputElements] +
      cpValues[cpInputs.tableViews] +
      cpValues[cpInputs.interfaceClass] +
      cpValues[cpInputs.functionsLogic] +
      cpValues[cpInputs.rAndDComponent];
    console.log(cp);

    const formData = {
      projectNumber: selectedProject.projectNumber, // Set the project number appropriately
      requirementNumber: selectedRequirementId,
      task: cpInputs.task,
      numberOfInputElements: cpInputs.inputElements,
      numberOfTablesViews: cpInputs.tableViews,
      interfaceClass: cpInputs.interfaceClass,
      functionsLogic: cpInputs.functionsLogic,
      rndComponent: cpInputs.rAndDComponent,
      CP: cp, // The calculated CP value
    };

    try {
      const response = await fetch("http://localhost:5000/api/calculate-cp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("CP calculated and saved successfully");
        console.log("Saved CP:", result.data);
      } else {
        alert("Error calculating and saving CP");
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert("Submited Successfully");
      await axios.post("http://localhost:5000/api/requirements", formData);
    } catch (error) {
      alert("Not Submitted");
      console.error(error);
    }
  };
  //change
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formDataToSend = new FormData();
  //   for (const key in formData) {
  //     formDataToSend.append(key, formData[key]);
  //   }

  //   try {
  //     const response = await fetch("http://localhost:5000/api/submit-form", {
  //       method: "POST",
  //       body: formDataToSend,
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     fetchRequirements();
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  //change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    scrollToRequirement(selectedDate);
  };

  const scrollToRequirement = (date) => {
    const requirement = requirements.find((req) => req.date === date);

    if (requirement && requirementRefs.current[requirement.requirementNumber]) {
      requirementRefs.current[
        requirement.requirementNumber
      ].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      alert("No requirement found for the selected date.");
    }
  };

  const toggleQueryForm = (requirementId) => {
    setQueryForms((prevForms) => ({
      ...prevForms,
      [requirementId]: !prevForms[requirementId],
    }));
  };
  const linkStyle2 = {
    margin: "10px 32px",
    padding: " 8px",
    backgroundColor: "#1e293b",
  };
  const handleQueryInputChange = (e, requirementId) => {
    const { name, value } = e.target;
    setQueryInputs((prevInputs) => ({
      ...prevInputs,
      [requirementId]: {
        ...prevInputs[requirementId],
        [name]: value,
      },
    }));
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
  //hello

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currPage, setCurrPage] = useState(1);

  const rowsPerPage = 8;

  const filteredProjects = projects.filter((project) =>
    project.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProjects.slice(indexOfFirstRow, indexOfLastRow);

  // const handleProjectSelect = (project) => {
  //   console.log("Selected project:", project);
  // };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginate1 = (pageNumber) => setCurrPage(pageNumber);
  //hello
  const handleQueryFormSubmit = (e, requirementId) => {
    e.preventDefault();
    console.log("Query submitted for requirement:", requirementId);
    console.log("Query details:", queryInputs[requirementId]);
    // Handle query form submission logic here
  };

  const renderContent = () => {
    switch (content) {
      case "AboutUs":
        return <p>This is the About Us section.</p>;
      case "Services":
        return <p>This is the Services section.</p>;
      case "Events":
        return <p>This is the Events section.</p>;
      case "Contact":
        return <p>This is the Contact section.</p>;
      case "Support":
        return <p>This is the Support section.</p>;
      case "Aim":
        return <p>This is the Our Aim section.</p>;
      case "Vision":
        return <p>This is the Our Vision section.</p>;
      case "Service1":
        return <p>This is the Service 1 section.</p>;
      case "Service2":
        return <p>This is the Service 2 section.</p>;
      case "Service3":
        return <p>This is the Service 3 section.</p>;
      default:
        return (
          <div className="text-blueGray-700 text-2xl font-bold">
            <h2 className="text-blueGray-700 text-2xl font-bold text-center">
              Project Analyst
            </h2>
            <h3 className="text-blueGray-600 text-xl font-bold mt-4 text-center">
              Ongoing Projects
            </h3>

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
                      <tr
                        style={{ background: "#334155", textAlign: "center" }}
                      >
                        <th
                          className="px-8 py-5 border border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                          style={{ minWidth: "100px" }}
                        >
                          Select
                        </th>
                        {/* <th
            scope="col"
            className="px-8 py-5 border border-gray-200 bg-gray-800 text-center text-xs font-semibold text-white uppercase tracking-wider"
          >
          </th> */}
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
                          Form
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((project) => (
                        <tr
                          key={project.projectNumber}
                          className="cursor-pointer hover:bg-gray-300 text-center"
                          onClick={() => handleProjectSelect(project)}
                        >
                          {/* <td className="px-8 py-5 border border-gray-200 bg-gray-200 text-sm">
              <p className="text-gray-900 whitespace-no-wrap text-center">vjjffjri</p>
            </td> */}
                          <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleCheckboxChange(e, project.projectNumber)
                              }
                              checked={selectedRequirements.includes(
                                project.projectNumber
                              )}
                            />
                          </td>
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
                              {project.dateOfCreation}
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
                              <Link
                                to={{
                                  pathname: "/temp",
                                  state: {
                                    projectNumber: project.projectNumber,
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
                          </td>
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
                    currentPage ===
                    Math.ceil(filteredProjects.length / rowsPerPage)
                  }
                  className="px-4 py-2 bg-gray-300 rounded shadow"
                >
                  Next &gt;
                </button>
              </div>
            </div>

            {selectedProject && (
              <div className="flex flex-wrap mt-4">
                {requirements.length > -1 && (
                  <div className="w-full items-center">
                    <h3 className="text-blueGray-600 text-xl font-bold mt-4 text-center">
                      Requirements for {selectedProject.projectTitle}
                    </h3>
                    <div
                      className="mt-4"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div className="">
                        <label className="block text-blueGray-600 text-sm font-bold mb-2">
                          Select Date:
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={handleDateChange}
                          className="form-control w-1/4 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                        />
                      </div>
                      <button
                        className="ml-auto mt-6 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleManageRequirements}
                      >
                        New Requirement
                      </button>
                    </div>

                    <div className="table-container mt-3  max-w-full overflow-x-auto shadow-lg rounded-lg overflow-hidden text-center">
                      <table
                        className="w-full  px-8 items-center  text-center"
                        style={{ width: "1500px" }}
                      >
                        <thead>
                          <tr
                            square={false}
                            className="px-8 mt-3 mr-3 ml-3 "
                            style={{
                              background: "#334155",
                              color: "white",
                              textAlign: "center",
                              padding: "10px",
                            }}
                          >
                            <th
                              className="px-8 py-5 border border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                              style={{ minWidth: "100px" }}
                            >
                              Select
                            </th>
                            <th
                              className="px-8 py-5 border border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                              style={{ minWidth: "100px" }}
                            >
                              Requirement No
                            </th>
                            <th
                              className="px-8 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                              style={{ minWidth: "100px" }}
                            >
                              Requirement Date
                            </th>

                            <th
                              className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                              style={{ minWidth: "100px" }}
                            >
                              Requirement Change No
                            </th>
                            <th
                              className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                              style={{ minWidth: "100px" }}
                            >
                              Change Date
                            </th>
                            <th
                              className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                              style={{ minWidth: "100px" }}
                            >
                              Description
                            </th>
                            <th
                              className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                              style={{ minWidth: "100px" }}
                            >
                              Priority
                            </th>
                            <th
                              className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                              style={{ minWidth: "100px" }}
                            >
                              Requirement Gathered By
                            </th>
                            <th className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center mt-3 mr-3 ml-3">
                              Mode Of Receipt
                            </th>
                            <th className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                              Provided By
                            </th>
                            <th className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                              Requirement Acceptance
                            </th>
                            <th className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                              Actions To Be Taken
                            </th>
                            <th className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                              Responsibility
                            </th>
                            <th className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                              Expected Date Of Delivery
                            </th>
                            <th className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                              Status
                            </th>
                            <th className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                              Requirement Output Name
                            </th>
                            <th className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                              Dependency
                            </th>
                            <th className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                              Impact Of New Requirements
                            </th>
                            <th className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                              Remarks
                            </th>
                            <th className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {requirements.map((requirement) => (
                            <tr
                              key={requirement.requirementNumber}
                              ref={
                                requirementRefs.current[
                                  requirement.requirementNumber
                                ]
                              }
                            >
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm  text-center">
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e,
                                      requirement.requirementNumber
                                    )
                                  }
                                  checked={selectedRequirements.includes(
                                    requirement.requirementNumber
                                  )}
                                />
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.requirementNumber}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.requirementDate}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.requirementChangeNumber}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.changeDate}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.description}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.priority}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.requirementGatheredBy}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.modeOfReceipt}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.providedBy}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.requirementAcceptance}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.actionsToBeTaken}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.responsibility}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.expectedDateOfDelivery}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.status}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.requirementOutputName}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.dependency}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.impactOfNewRequirementsOrChanges}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.remarks}
                                </p>
                              </td>
                              <td
                                className="px-8 py-5 border border-gray-200 bg-white text-sm"
                                key={requirement.requirementNumber}
                              >
                                <button
                                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() =>
                                    handleManageRequirements(
                                      requirement.requirementNumber
                                    )
                                  }
                                >
                                  Requirements Management
                                </button>
                                <br></br>
                                <br></br>
                                <button
                                  onClick={() =>
                                    handleCalculateCP(
                                      requirement.requirementNumber
                                    )
                                  }
                                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                                >
                                  Calculate CP
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-between w-full max-w-7xl py-4">
                      <button
                        onClick={() => paginate1(currPage - 1)}
                        disabled={currPage === 1}
                        className="px-4 py-2 bg-gray-300 rounded shadow"
                      >
                        &lt; Prev
                      </button>
                      <div>Page {currPage}</div>
                      <button
                        onClick={() => paginate1(currPage + 1)}
                        disabled={
                          currPage ===
                          Math.ceil(filteredProjects.length / rowsPerPage)
                        }
                        className="px-4 py-2 bg-gray-300 rounded shadow"
                      >
                        Next &gt;
                      </button>
                    </div>
                  </div>
                )}

                {/*{showCPForm && (
                  <div className="w-1/2 px-6">
                    <form
                      onSubmit={handleCpFormSubmit}
                      className="mt-4 bg-blueGray-50 p-4 rounded shadow-inner max-w-lg mx-auto"
                      style={{ borderRadius: "30px" }}
                    >
                      <h4 className="text-blueGray-600 text-xl font-bold mb-4 text-center">
                        Calculate CP
                      </h4>
        
                      <div className="form-group mb-4">
                        <label className="block text-blueGray-600 text-sm font-bold mb-2">
                          Requirement No:
                        </label>

                        <select
                          value={selectedRequirementId}
                          onChange={handleRequirementSelect}
                          style={{ borderRadius: "15px" }}
                        >
                          <option value="">Select Requirement</option>
                          {requirements.map((requirement) => (
                            <option
                              key={requirement.requirementNumber}
                              value={requirement.requirementNumber}
                            >
                              {requirement.requirementNumber}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mb-4 ">
                        <label className="block text-blueGray-600 text-sm font-bold mb-2">
                          Task:
                        </label>
                        <input
                          type="text"
                          name="task"
                          value={cpInputs.task}
                          onChange={handleCpInputChange}
                          className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                          style={{ borderRadius: "15px" }}
                        />
                      </div>
              
                      {Object.keys(cpInputs)
                        .slice(2)
                        .map((inputName) => (
                          <div key={inputName} className="form-group mb-4">
                            <label className="block text-blueGray-600 text-sm font-bold mb-2">
                              {inputName.charAt(0).toUpperCase() +
                                inputName.slice(1)}
                              :
                            </label>
                            <select
                              name={inputName}
                              value={cpInputs[inputName]}
                              onChange={handleCpInputChange}
                              className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                              style={{ borderRadius: "15px" }}
                            >
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                            </select>
                          </div>
                        ))}
                      <div className="text-center mt-6">
                        <button
                          type="submit"
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                        >
                          Calculate CP
                        </button>
                      </div>
                    </form>
                  </div>
                )} */}

                {showCPForm && (
                  <div className="w-1/2 px-4 ">
                    <form
                      onSubmit={handleCpFormSubmit}
                      className="mt-4 bg-blueGray-50 p-4 rounded shadow-inner max-w-lg mx-auto"
                    >
                      <h4 className="text-blueGray-600 text-xl font-bold mb-4">
                        Calculate CP
                      </h4>
                      {/* Render the input fields for requirementNo and task as text inputs */}
                      <div className="form-group mb-4">
                        <label className="block text-blueGray-600 text-sm font-bold mb-2">
                          Requirement No:
                        </label>
                        <h2>Select Requirement</h2>
                        <select
                          value={selectedRequirementId}
                          onChange={handleRequirementSelect}
                        >
                          <option value="">Select Requirement</option>
                          {requirements.map((requirement) => (
                            <option
                              key={requirement.requirementNumber}
                              value={requirement.requirementNumber}
                            >
                              {requirement.requirementNumber}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mb-4">
                        <label className="block text-blueGray-600 text-sm font-bold mb-2">
                          Task:
                        </label>
                        <input
                          type="text"
                          name="task"
                          value={cpInputs.task}
                          onChange={handleCpInputChange}
                          className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                        />
                      </div>
                      {/* Render dropdowns for the remaining inputs */}
                      {Object.keys(cpInputs)
                        .slice(2)
                        .map((inputName) => (
                          <div key={inputName} className="form-group mb-4">
                            <label className="block text-blueGray-600 text-sm font-bold mb-2">
                              {inputName.charAt(0).toUpperCase() +
                                inputName.slice(1)}
                              :
                            </label>
                            <select
                              name={inputName}
                              value={cpInputs[inputName]}
                              onChange={handleCpInputChange}
                              className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                            >
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                            </select>
                          </div>
                        ))}
                      <div className="text-center mt-6">
                        <button
                          type="submit"
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                        >
                          Calculate CP
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {showRMForm && (
                  <div className="w-1/2  px-6">
                    <form
                      onSubmit={handleSubmit}
                      className="mt-4 bg-blueGray-50 p-4 rounded shadow-inner"
                      style={{ borderRadius: "30px" }}
                    >
                      <h3 className="text-blueGray-600 text-xl font-bold mb-1 text-center">
                        Requirement Management
                      </h3>
                      <label className="block text-blueGray-700 text-sm font-bold mb-2 mt-6">
                        Requirement No:
                      </label>
                      <select
                        value={selectedRequirementId}
                        onChange={handleRequirementSelect}
                        style={{ borderRadius: "15px" }}
                      >
                        <option value="">Select Requirement</option>
                        {requirements.map((requirement) => (
                          <option
                            key={requirement.requirementNumber}
                            value={requirement.requirementNumber}
                          >
                            {requirement.requirementNumber}
                          </option>
                        ))}
                      </select>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="requirementDate"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Requirement Date
                          </label>
                          <input
                            type="date"
                            id="requirementDate"
                            name="requirementDate"
                            value={formData.requirementDate}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="requirementChangeNumber"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Requirement Change No.
                          </label>
                          <input
                            type="text"
                            id="requirementChangeNumber"
                            name="requirementChangeNumber"
                            value={formData.requirementChangeNumber}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="changeDate"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Change Date
                          </label>
                          <input
                            type="date"
                            id="changeDate"
                            name="changeDate"
                            value={formData.changeDate}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="requirementGatheredBy"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Requirement Gathered By
                          </label>
                          <input
                            type="text"
                            id="requirementGatheredBy"
                            name="requirementGatheredBy"
                            value={formData.requirementGatheredBy}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="providedBy"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Provided By
                          </label>
                          <input
                            type="text"
                            id="providedBy"
                            name="providedBy"
                            value={formData.providedBy}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="remarks"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Remarks
                          </label>
                          <input
                            type="text"
                            id="remarks"
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
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
                            value={formData.priority}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="modeOfReceipt"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Mode of Receipt
                          </label>
                          <select
                            id="modeOfReceipt"
                            name="modeOfReceipt"
                            value={formData.modeOfReceipt}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          >
                            <option value="VideoCall">Video Call</option>
                            <option value="Call">Call</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Email">Email</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="actionsToBeTaken"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Actions to be taken
                          </label>
                          <input
                            type="text"
                            id="actionsToBeTaken"
                            name="actionsToBeTaken"
                            value={formData.actionsToBeTaken}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="completionDate"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Completion Date
                          </label>
                          <input
                            type="date"
                            id="completionDate"
                            name="completionDate"
                            value={formData.completionDate}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="responsibility"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Responsibility
                          </label>
                          <input
                            type="text"
                            id="responsibility"
                            name="responsibility"
                            value={formData.responsibility}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="impactOfNewRequirements"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Impact of new requirements/changes
                          </label>
                          <input
                            type="text"
                            id="impactOfNewRequirements"
                            name="impactOfNewRequirements"
                            value={formData.impactOfNewRequirementsOrChanges}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="requirementOutputName"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Requirement output name
                          </label>
                          <input
                            type="text"
                            id="requirementOutputName"
                            name="requirementOutputName"
                            value={formData.requirementOutputName}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="dependency"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Dependency
                          </label>
                          <input
                            type="text"
                            id="dependency"
                            name="dependency"
                            value={formData.dependency}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="requirementAcceptance"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Requirement Acceptance (Yes/No)
                          </label>
                          <select
                            id="requirementAcceptance"
                            name="requirementAcceptance"
                            value={formData.requirementAcceptance}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
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
                            name="status"
                            value={formData.status}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          >
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="Waiting">Waiting</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="fileUpload"
                            className="block text-sm font-medium text-gray-700 mt-3 mb-3"
                          >
                            Upload File
                          </label>
                          <input
                            type="file"
                            id="fileUpload"
                            name="fileUpload"
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-4"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto" style={containerStyle}>
      {renderContent()}
    </div>
  );
};

export default MainContent;
