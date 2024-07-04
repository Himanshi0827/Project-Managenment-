import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const MainContent = ({ content, userData }) => {
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
    impactOfNewRequirementsOrChanges: "",
    dependency: "",
    requirementAcceptance: "yes",
    status: "ongoing",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [queryForms, setQueryForms] = useState({});
  const [queryInputs, setQueryInputs] = useState({});
  const [showQueries, setShowQueries] = useState(false);

  const requirementRefs = useRef({});
  const managerEmail = `${userData.email}`; // Replace with the email of the signed-in user

  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/${managerEmail}`)
      .then((response) => response.json())
      .then((data) => setProjects(data.projects)) // Access the projects array from the response
      .catch((error) => console.error("Error fetching projects:", error));
  }, [managerEmail]);
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

  const handleCalculateCP = () => {
    setShowCPForm(true);
  };
  //change
  const [selectedRequirementId, setSelectedRequirementId] = useState("");
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
          console.log(newRequirementNumber);
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
  const handleRequirementSelect = (e) => {
    setSelectedRequirementId(e.target.value);
  };
  const handleRmInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // setRmInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    setFormData((prevInputs) => ({ ...prevInputs, [name]: value }));
  };
  //change

  const handleManageRequirements = (requirementNumber) => {
    setSelectedRequirementId(requirementNumber);
    setShowRMForm(true);
    setShowCPForm(false);
  };
  // const handleManageRequirements = () => {
  //   setShowRMForm(true);
  //   setShowCPForm(false);
  // };
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "/auth/login";
  };

  const handleCpInputChange = (e) => {
    const { name, value } = e.target;
    setCpInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };
  // const handleRmInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setRmInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  // };

  const handleCpFormSubmit = (e) => {
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
    console.log("Calculated CP:", cp);
  };
  const handleRmFormSubmit = (e) => {
    e.preventDefault();
    console.log("Requirement Management details:", rmInputs);
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
    // backgroundColor: "#1e293b",
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

  //upload file
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [rNumber, setRNumber] = useState("");

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setRNumber(selectedRequirementId);
    if (!selectedRequirementId) {
      console.log(rNumber)
      const generateRequirementNumber = async () => {
        const projectNumber = selectedProject.projectNumber; // You can set this dynamically as needed
        const count = requirements.filter(
          (req) => req.projectNumber === projectNumber
        ).length;

        const requirementCount = count + 1;
        const mainPart = `R${String(projectNumber).padStart(2, "0")}.00.`;
        const lastPart = String(requirementCount % 100).padStart(2, "0");
        const middlePart = String(Math.floor(requirementCount / 100)).padStart(
          2,
          "0"
        );
        const newRequirementNumber = `${mainPart}${middlePart}.${lastPart}`;
        console.log(newRequirementNumber);
        setRNumber(newRequirementNumber);
      };

      generateRequirementNumber();
    } else {
      console.log("else" + rNumber)
      setRNumber(selectedRequirementId);
    }
  };

  // const onFileUpload = async () => {
  //   if (!selectedFile) {
  //     setUploadStatus("Please select a file first.");
  //     return;
  //   }

  //   const formData1 = new FormData();
  //   formData1.append("file", selectedFile);

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/upload",
  //       formData1,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     alert("File Uploaded");
  //     setUploadStatus(response.data.message);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     setUploadStatus("Error uploading file.");
  //   }
  // };

  const onFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const formData1 = new FormData();
    formData1.append("file", selectedFile);
    if (rNumber) formData1.append("rNumber", rNumber); // Add rNumber to FormData

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File Uploaded");
      setUploadStatus(response.data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file.");
    }
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
          <div className="text-blueGray-700 text-2xl font-bold text-center">
            <h2 className="text-blueGray-700 text-2xl font-bold text-center">
              Project Manager
            </h2>
            <h3 className="text-blueGray-600 text-xl font-bold mt-4">
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
                  <table className="w-full min-w-full leading-normal border-collapse border items-center">
                    <thead className="bg-gray-900" tyle={linkStyle2}>
                      <tr style={{ background: "#334155" }}>
                        <th
                          className="px-8 py-5 border border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
                          style={{ minWidth: "100px" }}
                        >
                          Select
                        </th>

                        <th
                          scope="col"
                          className="px-8 py-5 border border-gray-200 bg-gray-900 text-center text-xs font-semibold text-white uppercase tracking-wider"
                          style={linkStyle2}
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
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((project) => (
                        <tr
                          key={project.projectNumber}
                          className="cursor-pointer hover:bg-gray-300"
                          onClick={() => handleProjectSelect(project)}
                        >
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
                              {project.CP}
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
                            <th className="px-9 py-5 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                              Uploads
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

                                {/* <br></br>
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
                                </button> */}
                              </td>
                              <td
                                className="px-8 py-5 border border-gray-200 bg-white text-sm"
                                key={requirement.requirementNumber}
                              >
                                <Link
                                  to={{
                                    pathname: "/files",
                                    state: {
                                      requirementNumber:
                                        requirement.requirementNumber,
                                    },
                                  }}
                                >
                                  <button
                                    className="ml-auto  bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                                    type="button"
                                  >
                                    View
                                  </button>
                                </Link>
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
                {/* {requirements.length > -1 && (
                  <div className="w-full  px-4 items-center">
                    <h3 className="text-blueGray-600 text-xl font-bold mt-4">
                      Requirements for {selectedProject.projectTitle}
                    </h3>
                    <div className="mt-4">
                      <label className="block text-blueGray-600 text-sm font-bold mb-2">
                        Select Date:
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                      />
                      
                    </div>
                    <div className="table-container mt-3 mr-3 ml-3 max-w-full overflow-x-auto shadow-lg rounded-lg overflow-hidden">
                      <table
                        className="w-full  px-8 items-center"
                        style={{ width: "1500px" }}
                      >
                        <thead>
                          <tr
                            square={false}
                            className="px-8 mt-3 mr-3 ml-3"
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
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
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
                                  {
                                    requirement.impactOfNewRequirementsOrChangesOrChanges
                                  }
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {requirement.remarks}
                                </p>
                              </td>
                              <td className="px-8 py-5 border border-gray-200 bg-white text-sm">
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
                )} */}
                {showRMForm && (
                  <div
                    className="w-1/2  px-6 justify-items"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "315px",
                    }}
                  >
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
                            value={formData.impactOfNewRequirements}
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
                            onChange={onFileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          />
                          <button onClick={onFileUpload}>Upload</button>
                          <p>{uploadStatus}</p>
                          {/* <input
                            type="file"
                            id="fileUpload"
                            name="fileUpload"
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "15px" }}
                          /> */}
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
                {/* {showRMForm && (
                  <div className="w-full  px-4">
                    <form
                      onSubmit={handleRmFormSubmit}
                      className="mt-4 bg-blueGray-50 p-4 rounded shadow-inner"
                    >
                      <h3 className="text-blueGray-600 text-lg font-bold">
                        Requirements Management
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="requirementDate"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Requirement Date
                          </label>
                          <input
                            type="date"
                            id="requirementDate"
                            name="requirementDate"
                            value={rmInputs.requirementDate}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="requirementChangeNumber"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Requirement Change No.
                          </label>
                          <input
                            type="text"
                            id="requirementChangeNumber"
                            name="requirementChangeNumber"
                            value={rmInputs.requirementChangeNumber}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="changeDate"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Change Date
                          </label>
                          <input
                            type="date"
                            id="changeDate"
                            name="changeDate"
                            value={rmInputs.changeDate}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            value={rmInputs.description}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="requirementGatheredBy"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Requirement Gathered By
                          </label>
                          <input
                            type="text"
                            id="requirementGatheredBy"
                            name="requirementGatheredBy"
                            value={rmInputs.requirementGatheredBy}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="providedBy"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Provided By
                          </label>
                          <input
                            type="text"
                            id="providedBy"
                            name="providedBy"
                            value={rmInputs.providedBy}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="remarks"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Remarks
                          </label>
                          <input
                            type="text"
                            id="remarks"
                            name="remarks"
                            value={rmInputs.remarks}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="priority"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Priority
                          </label>
                          <select
                            id="priority"
                            name="priority"
                            value={rmInputs.priority}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="modeOfReceipt"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Mode of Receipt
                          </label>
                          <select
                            id="modeOfReceipt"
                            name="modeOfReceipt"
                            value={rmInputs.modeOfReceipt}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                            className="block text-sm font-medium text-gray-700"
                          >
                            Actions to be taken
                          </label>
                          <input
                            type="text"
                            id="actionsToBeTaken"
                            name="actionsToBeTaken"
                            value={rmInputs.actionsToBeTaken}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="completionDate"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Completion Date
                          </label>
                          <input
                            type="date"
                            id="completionDate"
                            name="completionDate"
                            value={rmInputs.completionDate}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="responsibility"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Responsibility
                          </label>
                          <input
                            type="text"
                            id="responsibility"
                            name="responsibility"
                            value={rmInputs.responsibility}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="changeDate2"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Change Date
                          </label>
                          <input
                            type="date"
                            id="changeDate2"
                            name="changeDate2"
                            value={rmInputs.changeDate2}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="impactOfNewRequirements"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Impact of new requirements/changes
                          </label>
                          <input
                            type="text"
                            id="impactOfNewRequirements"
                            name="impactOfNewRequirements"
                            value={rmInputs.impactOfNewRequirements}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="requirementOutputName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Requirement output name
                          </label>
                          <input
                            type="text"
                            id="requirementOutputName"
                            name="requirementOutputName"
                            value={rmInputs.requirementOutputName}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="dependency"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Dependency
                          </label>
                          <input
                            type="text"
                            id="dependency"
                            name="dependency"
                            value={rmInputs.dependency}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="requirementAcceptance"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Requirement Acceptance (Yes/No)
                          </label>
                          <select
                            id="requirementAcceptance"
                            name="requirementAcceptance"
                            value={rmInputs.requirementAcceptance}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Status
                          </label>
                          <select
                            id="status"
                            name="status"
                            value={rmInputs.status}
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="Waiting">Waiting</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="fileUpload"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Upload File
                          </label>
                          <input
                            type="file"
                            id="fileUpload"
                            name="fileUpload"
                            onChange={handleRmInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                )} */}
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
