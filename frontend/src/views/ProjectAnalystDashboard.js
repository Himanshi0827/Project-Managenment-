// // this is the ui figma try
// import React, { useEffect, useState, useRef } from "react";

// export default function Dashboard({ userData }) {
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [requirements, setRequirements] = useState([]);
//   const [showQueries, setShowQueries] = useState(false);
//   const [showCPForm, setShowCPForm] = useState(false);
//   const [cpInputs, setCpInputs] = useState({
//     requirementNo: "",
//     task: "",
//     inputElements: "Low",
//     tableViews: "Low",
//     interfaceClass: "Low",
//     functionsLogic: "Low",
//     rAndDComponent: "Low",
//   });
//   const [selectedDate, setSelectedDate] = useState("");
//   const [queries, setQueries] = useState([]);
//   const [queryForms, setQueryForms] = useState({});
//   const [queryInputs, setQueryInputs] = useState({});
//   const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
//   const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

//   const requirementRefs = useRef({});

//   useEffect(() => {
//     fetch("http://localhost:5000/analyst-projects")
//       .then((response) => response.json())
//       .then((data) => setProjects(data))
//       .catch((error) => console.error("Error fetching projects:", error));

// // Fetch queries
// fetch("http://localhost:5000/queries")
// .then((response) => response.json())
// .then((data) => setQueries(data))
// .catch((error) => console.error("Error fetching queries:", error));
// }, []);
//   const handleProjectSelect = (project) => {
//     setSelectedProject(project);
//     setShowCPForm(false);

//     fetch(`http://localhost:5000/requirements?projectId=${project.projectNumber}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setRequirements(data);
//         requirementRefs.current = data.reduce((acc, requirement) => {
//           acc[requirement.requirementNumber] = React.createRef();
//           return acc;
//         }, {});
//       })
//       .catch((error) => console.error("Error fetching requirements:", error));
//   };

//   const handleCalculateCP = () => {
//     setShowCPForm(true);
//   };
//   const handleQueryResolve = (queryId) => {
//     // Implement query resolution logic here
//     alert(`Resolving query ${queryId}`);
//   };

//   const logOut = () => {
//     window.localStorage.clear();
//     window.location.href = "/auth/login";
//   };

//   const handleCpInputChange = (e) => {
//     const { name, value } = e.target;
//     setCpInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
//   };

//   const handleCpFormSubmit = (e) => {
//     e.preventDefault();
//     const cpValues = {
//       Low: 0.25,
//       Medium: 0.5,
//       High: 1,
//     };
//     const cp =
//       cpValues[cpInputs.inputElements] +
//       cpValues[cpInputs.tableViews] +
//       cpValues[cpInputs.interfaceClass] +
//       cpValues[cpInputs.functionsLogic] +
//       cpValues[cpInputs.rAndDComponent];
//     console.log("Calculated CP:", cp);
//     };

//     const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setSelectedDate(selectedDate);
//     scrollToRequirement(selectedDate);
//     };

//     const scrollToRequirement = (date) => {
//     const requirement = requirements.find((req) => req.date === date);

//     if (requirement && requirementRefs.current[requirement.requirementNumber]) {
//     requirementRefs.current[requirement.requirementNumber].current.scrollIntoView({
//     behavior: "smooth",
//     block: "start",
//     });
//     } else {
//     alert("No requirement found for the selected date.");
//     }
//     };

//     const toggleQueryForm = (requirementId) => {
//     setQueryForms((prevForms) => ({
//     ...prevForms,
//     [requirementId]: !prevForms[requirementId],
//     }));
//     };

//     const handleQueryInputChange = (e, requirementId) => {
//     const { name, value } = e.target;
//     setQueryInputs((prevInputs) => ({
//     ...prevInputs,
//     [requirementId]: {
//     ...prevInputs[requirementId],
//     [name]: value,
//     },
//     }));
//     };

//     const handleQueryFormSubmit = (e, requirementId) => {
//     e.preventDefault();
//     console.log("Query submitted for requirement:", requirementId);
//     console.log("Query details:", queryInputs[requirementId]);
//     // Handle query form submission logic here
//     };

//     return (
//     <>
//       <div className="flex flex-wrap mt-4">
//         <div className={`fixed top-0 left-3 h-full bg-blueGray-800 transition-width duration-300 ${isLeftSidebarOpen ? 'w-64' : 'w-16'}`}>
//           <div className="flex flex-col h-full">
//             <div className="flex items-center justify-between p-4">
//               <h1 className="text-white text-2xl font-bold"></h1>
//               <button
//                 onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
//                 className="text-white focus:outline-none"
//               >
//                 {isLeftSidebarOpen ? 'Close' : 'Open'}
//               </button>
//             </div>
//             {isLeftSidebarOpen && (
//               <div className="flex flex-col p-4">
//                 <p className="text-white">Name: <strong>{userData.fname}</strong></p>
//                 <p className="text-white">Email: <strong>{userData.email}</strong></p>
//                 <button
//                   className="mt-4 p-2 text-left text-white bg-blueGray-600 hover:bg-blueGray-500 rounded"
//                 >
//                   Projects
//                 </button>
//                 <button
//                   className="mt-2 p-2 text-left text-white bg-blueGray-600 hover:bg-blueGray-500 rounded"
//                 >
//                   Form1
//                 </button>
//                 <button
//                   className="mt-2 p-2 text-left text-white bg-blueGray-600 hover:bg-blueGray-500 rounded"
//                 >
//                   Form2
//                 </button>
//                 <button
//                   className="mt-2 p-2 text-left text-white bg-blueGray-600 hover:bg-blueGray-500 rounded"
//                 >
//                   SRS/Plan Doc
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className={`relative flex-grow ml-12 ${isLeftSidebarOpen ? "md:ml-64" : "ml-30"} `}>
//         <div className=" relative ml-20 mr-16">
//           <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
//             <div className="rounded-t mb-0 px-6 py-6">
//               <h2 className="text-blueGray-700 text-2xl font-bold text-center">
//                 Project Analyst Dashboard
//               </h2>
//             </div>
//             <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
//               <h3 className="text-blueGray-600 text-xl font-bold mt-4">
//                 Ongoing Projects
//               </h3>
//               <table className="min-w-full bg-white">
//                 <thead>
//                   <tr>
//                   <th className="py-2 px-4 border-b border-blueGray-300"> Project Id </th>
//                     <th className="py-2 px-4 border-b border-blueGray-300">Title</th>
//                     <th className="py-2 px-4 border-b border-blueGray-300">Manager</th>
//                     <th className="py-2 px-4 border-b border-blueGray-300">Description</th>
//                     <th className="py-2 px-4 border-b border-blueGray-300">Date</th>
//                     <th className="py-2 px-4 border-b border-blueGray-300">Client Name</th>

//                     <th className="py-2 px-4 border-b border-blueGray-300">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {projects.map((project) => (
//                     <tr
//                       key={project.projectNumber}
//                       onClick={() => handleProjectSelect(project)}
//                       className="cursor-pointer hover:bg-blueGray-50 transition duration-150 ease-in-out"
//                     >
//                       <td className="py-2 px-4 border-b border-blueGray-300">{project.Projectid}</td>
//                       <td className="py-2 px-4 border-b border-blueGray-300">{project.projectTitle}</td>
//                       <td className="py-2 px-4 border-b border-blueGray-300">{project.projectManagerName}</td>

//                       <td className="py-2 px-4 border-b border-blueGray-300">{project.projectDesc}</td>
//                       <td className="py-2 px-4 border-b border-blueGray-300">{project.dateOfCreation}</td>
//                       <td className="py-2 px-4 border-b border-blueGray-300">{project.clientName}</td>
//                       <td className="py-2 px-4 border-b border-blueGray-300">{project.projectStatus}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {selectedProject && (
//                 <div className="flex flex-wrap mt-4">
//                   {requirements.length > 0 && (
//                     <div className="w-full xl:w-6/12 px-4">
//                       <h3 className="text-blueGray-600 text-xl font-bold mt-4">
//                         Requirements for {selectedproject.projectTitle}
//                       </h3>
//                       <div className="mt-4">
//                         <label className="block text-blueGray-600 text-sm font-bold mb-2">
//                           Select Date:
//                         </label>
//                         <input
//                           type="date"
//                           value={selectedDate}
//                           onChange={handleDateChange}
//                           className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
//                         />
//                       </div>
//                       {requirements.map((requirement) => (
//                         <div
//                           key={requirement.requirementNumber}
//                           ref={requirementRefs.current[requirement.requirementNumber]}
//                           className="bg-white p-6 my-2 rounded shadow-md"
//                         >
//                           <div className="bg-white p-4 rounded shadow-md">
//                             <h4 className="text-blueGray-700 font-bold">{requirement.title}</h4>
//                             <p className="text-blueGray-500">{requirement.description}</p>
//                             <p className="text-blueGray-500">{requirement.date}</p>
//                             <h4 className="text-blueGray-700 font-bold">{requirement.requirementNumber}</h4>
//                             <p className="text-blueGray-500">{requirement.projectname}</p>
//                             <p className="text-blueGray-500">{requirement.lastdate}</p>
//                             <button
//                               onClick={() => toggleQueryForm(requirement.requirementNumber)}
//                               className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150 mb-3"
//                             >
//                               Create Query
//                             </button>
//                             <button
//                              onClick={handleCalculateCP}
//                              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                           >
//                             Calculate CP
//                           </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                   {showCPForm && (
//                     <div className="w-full xl:w-6/12 px-4">
//                       <form
//                         onSubmit={handleCpFormSubmit}
//                         className="mt-4 bg-blueGray-50 p-4 rounded shadow-inner"
//                       >
//                         <h4 className="text-blueGray-600 text-xl font-bold mb-4">
//                           Calculate CP
//                         </h4>
//                         {Object.keys(cpInputs).map((inputName) => (
//                           <div key={inputName} className="form-group mb-4">
//                             <label className="block text-blueGray-600 text-sm font-bold mb-2">
//                               {inputName.charAt(0).toUpperCase() + inputName.slice(1)}:
//                             </label>
//                             <select
//                               name={inputName}
//                               value={cpInputs[inputName]}
//                               onChange={handleCpInputChange}
//                               className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
//                             >
//                               <option value="Low">Low</option>
//                               <option value="Medium">Medium</option>
//                               <option value="High">High</option>
//                             </select>
//                           </div>
//                         ))}
//                         <div className="text-center mt-6">
//                           <button
//                             type="submit"
//                             className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                           >
//                             Calculate CP
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

// </div>

//         <div className={`fixed top-0 right-0 h-full bg-blueGray-800 transition-width duration-300 ${isLeftSidebarOpen ? 'w-64' : 'w-16'}`}>
//           <div className="flex flex-col h-full">
//             <div className="flex items-center justify-between p-4">
//               <h1 className="text-white text-2xl font-bold"></h1>
//               <button
//                 onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
//                 className="text-white focus:outline-none"
//               >
//                 {isLeftSidebarOpen ? 'Close' : 'Open'}
//               </button>
//             </div>
//             {isLeftSidebarOpen && (
//               <div className="flex flex-col p-4">
//                 <p className="text-white">Name: <strong>{userData.fname}</strong></p>
//                 <p className="text-white">Email: <strong>{userData.email}</strong></p>
//                 <button
//                   onClick={() => toggleQueryForm(null)}
//                   className="mt-2 p-2 text-left text-white bg-blueGray-600 hover:bg-blueGray-500 rounded"
//                 >
//                   Create Query
//                 </button>
//                 <br></br>
//                 <button onClick={() => setShowQueries(!showQueries)} className="bg-blueGray-600 text-white px-4 py-2 rounded shadow hover:bg-blueGray-700 mr-2">
//             {showQueries ? "Hide Queries" : "Show Queries"}
//           </button>
//           {showQueries && (
//         <div className="mt-4">
//           <h3 className="text-blueGray-800">Queries</h3>
//           {queries.map((query) => (
//             <div key={query.id} className="bg-white p-4 my-2 rounded shadow-md">
//               <p>{query.text}</p>
//               <button onClick={() => handleQueryResolve(query.id)} className="bg-blueGray-600 text-white px-4 py-2 rounded shadow hover:bg-blueGray-700">
//                 Resolve
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//               </div>
//             )}
//           </div>
//         </div>

//       </div>

//       {/* {showQueries && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full">
//             <h4 className="text-blueGray-600 text-xl font-bold mb-4">
//               All Queries
//             </h4>
//             <button
//               onClick={() => setShowQueries(false)}
//               className="absolute top-4 right-4 bg-red-500 text-white active:bg-red-700 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
//             >
//               Close
//             </button>
//             <ul>
//               {requirements.map((requirement) => (
//                 <li key={requirement.requirementNumber} className="bg-white p-4 my-2 rounded shadow-md">
//                   <h4 className="text-blueGray-700 font-bold">
//                     {requirement.title}
//                   </h4>
//                   <p className="text-blueGray-500">{requirement.description}</p>
//                   <p className="text-blueGray-500">{requirement.date}</p>
//                   <div className="bg-blueGray-50 p-4 rounded shadow-inner mt-4">
//                     <h5 className="text-blueGray-600 font-bold mb-2">Queries:</h5>

//                     <p className="text-blueGray-500">Example query for {requirement.title}</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )} */}
//     </>
//     );
//     }

// // this is the code without sir seeing works well

// import React, { useEffect, useState, useRef } from "react";

// export default function Dashboard({ userData }) {
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [requirements, setRequirements] = useState([]);
//   const [showQueries, setShowQueries] = useState(false);
//   const [showCPForm, setShowCPForm] = useState(false);
//   const [cpInputs, setCpInputs] = useState({
//     requirementNo: "",
//     task: "",
//     inputElements: "Low",
//     tableViews: "Low",
//     interfaceClass: "Low",
//     functionsLogic: "Low",
//     rAndDComponent: "Low",
//   });
//   const [selectedDate, setSelectedDate] = useState("");
//   const [queryForms, setQueryForms] = useState({});
//   const [queryInputs, setQueryInputs] = useState({});

//   const requirementRefs = useRef({});

//   useEffect(() => {
//     fetch("http://localhost:5000/analyst-projects")
//       .then((response) => response.json())
//       .then((data) => setProjects(data))
//       .catch((error) => console.error("Error fetching projects:", error));
//   }, []);

//   const handleProjectSelect = (project) => {
//     setSelectedProject(project);
//     setShowCPForm(false);

//     fetch(`http://localhost:5000/requirements?projectId=${project.projectNumber}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setRequirements(data);
//         requirementRefs.current = data.reduce((acc, requirement) => {
//           acc[requirement.requirementNumber] = React.createRef();
//           return acc;
//         }, {});
//       })
//       .catch((error) => console.error("Error fetching requirements:", error));
//   };

//   const handleCalculateCP = () => {
//     setShowCPForm(true);
//   };

//   const logOut = () => {
//     window.localStorage.clear();
//     window.location.href = "/auth/login";
//   };

//   const handleCpInputChange = (e) => {
//     const { name, value } = e.target;
//     setCpInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
//   };

//   const handleCpFormSubmit = (e) => {
//     e.preventDefault();
//     const cpValues = {
//       Low: 0.25,
//       Medium: 0.5,
//       High: 1,
//     };
//     const cp =
//       cpValues[cpInputs.inputElements] +
//       cpValues[cpInputs.tableViews] +
//       cpValues[cpInputs.interfaceClass] +
//       cpValues[cpInputs.functionsLogic] +
//       cpValues[cpInputs.rAndDComponent];
//     console.log("Calculated CP:", cp);
//   };

//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setSelectedDate(selectedDate);
//     scrollToRequirement(selectedDate);
//   };

//   const scrollToRequirement = (date) => {
//     const requirement = requirements.find((req) => req.date === date);

//     if (requirement && requirementRefs.current[requirement.requirementNumber]) {
//       requirementRefs.current[requirement.requirementNumber].current.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     } else {
//       alert("No requirement found for the selected date.");
//     }
//   };

//   const toggleQueryForm = (requirementId) => {
//     setQueryForms((prevForms) => ({
//       ...prevForms,
//       [requirementId]: !prevForms[requirementId],
//     }));
//   };

//   const handleQueryInputChange = (e, requirementId) => {
//     const { name, value } = e.target;
//     setQueryInputs((prevInputs) => ({
//       ...prevInputs,
//       [requirementId]: {
//         ...prevInputs[requirementId],
//         [name]: value,
//       },
//     }));
//   };

//   const handleQueryFormSubmit = (e, requirementId) => {
//     e.preventDefault();
//     console.log("Query submitted for requirement:", requirementId);
//     console.log("Query details:", queryInputs[requirementId]);
//     // Handle query form submission logic here
//   };

//   return (
//     <>
//       <div className="flex flex-wrap mt-4">
//         <div className="w-full xl:w-12/12 px-4">
//           <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
//             <div className="rounded-t mb-0 px-6 py-6">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-blueGray-600">
//                     Name: <strong>{userData.fname}</strong>
//                   </p>
//                   <p className="text-blueGray-600">
//                     Email: <strong>{userData.email}</strong>
//                   </p>
//                 </div>
//                 <div>
//                   <button
//                     onClick={() => setShowQueries(!showQueries)}
//                     className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                   >
//                     {showQueries ? "Hide Queries" : "Show Queries"}
//                   </button>
//                   <button
//                     onClick={logOut}
//                     className="bg-red-500 text-white active:bg-red-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                   >
//                     Log Out
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
//               <h2 className="text-blueGray-700 text-2xl font-bold text-center">
//                 Project Analyst Dashboard
//               </h2>
//               <h3 className="text-blueGray-600 text-xl font-bold mt-4">
//                 Ongoing Projects
//               </h3>
//               {projects.map((project) => (
//                 <div
//                   key={project.projectNumber}
//                   onClick={() => handleProjectSelect(project)}
//                   className="bg-white p-4 my-2 rounded shadow-md cursor-pointer hover:bg-blueGray-50 transition duration-150 ease-in-out"
//                 >
//                   <h4 className="text-blueGray-700 font-bold">{project.projectTitle}</h4>
//                   <p className="text-blueGray-500">Manager: {project.projectManagerName}</p>
//                 </div>
//               ))}
//               {selectedProject && (
//                 <div className="flex flex-wrap mt-4">
//                   {requirements.length > 0 && (
//                     <div className="w-full xl:w-6/12 px-4">
//                       <h3 className="text-blueGray-600 text-xl font-bold mt-4">
//                         Requirements for {selectedproject.projectTitle}
//                       </h3>
//                       <div className="mt-4">
//                         <label className="block text-blueGray-600 text-sm font-bold mb-2">
//                           Select Date:
//                         </label>
//                         <input
//                           type="date"
//                           value={selectedDate}
//                           onChange={handleDateChange}
//                           className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
//                         />
//                       </div>
//                       {requirements.map((requirement) => (
//                         <div
//                           key={requirement.requirementNumber}
//                           ref={requirementRefs.current[requirement.requirementNumber]}
//                           className="bg-white p-6 my-2 rounded shadow-md"
//                         >
//                           <div className="bg-white p-4 rounded shadow-md">
//                             <h4 className="text-blueGray-700 font-bold">{requirement.title}</h4>
//                             <p className="text-blueGray-500">{requirement.description}</p>
//                             <p className="text-blueGray-500">{requirement.date}</p>
//                             <button
//                               onClick={() => toggleQueryForm(requirement.requirementNumber)}
//                               className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150 mb-3"
//                             >
//                               Create Query
//                             </button>
//                             <br></br>
//                             <button
//                               onClick={handleCalculateCP}
//                               className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                             >
//                               Calculate CP
//                             </button>

//                             {queryForms[requirement.requirementNumber] && (
//                               <form
//                                 onSubmit={(e) => handleQueryFormSubmit(e, requirement.requirementNumber)}
//                                 className="mt-4 bg-blueGray-50 p-4 rounded shadow-inner"
//                               >
//                                 <div className="form-group mb-4">
//                                   <label className="block text-blueGray-600 text-sm font-bold mb-2">
//                                     Enter your query:
//                                   </label>
//                                   <textarea
//                                     name="query"
//                                     value={queryInputs[requirement.requirementNumber]?.query || ""}
//                                     onChange={(e) => handleQueryInputChange(e, requirement.requirementNumber)}
//                                     className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
//                                   />
//                                 </div>
//                                 <div className="form-group mb-4">
//                                   <label className="block text-blueGray-600 text-sm font-bold mb-2">
//                                     Choose priority:
//                                   </label>
//                                   <select
//                                     name="priority"
//                                     value={queryInputs[requirement.requirementNumber]?.priority || ""}
//                                     onChange={(e) => handleQueryInputChange(e, requirement.requirementNumber)}
//                                     className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
//                                   >
//                                     <option value="low">Low</option>
//                                     <option value="medium">Medium</option>
//                                     <option value="high">High</option>
//                                   </select>
//                                 </div>
//                                 <div className="text-center mt-6">
//                                   <button
//                                     type="submit"
//                                     className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                                   >
//                                     Submit Query
//                                   </button>
//                                 </div>
//                               </form>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                   {showCPForm && (
//                     <div className="w-full xl:w-6/12 px-4">
//                       <form
//                         onSubmit={handleCpFormSubmit}
//                         className="mt-4 bg-blueGray-50 p-4 rounded shadow-inner"
//                       >
//                         <h4 className="text-blueGray-600 text-xl font-bold mb-4">
//                           Calculate CP
//                         </h4>
//                         {Object.keys(cpInputs).map((inputName) => (
//                           <div key={inputName} className="form-group mb-4">
//                             <label className="block text-blueGray-600 text-sm font-bold mb-2">
//                               {inputName.charAt(0).toUpperCase() + inputName.slice(1)}:
//                             </label>
//                             <select
//                               name={inputName}
//                               value={cpInputs[inputName]}
//                               onChange={handleCpInputChange}
//                               className="form-control w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
//                             >
//                               <option value="Low">Low</option>
//                               <option value="Medium">Medium</option>
//                               <option value="High">High</option>
//                             </select>
//                           </div>
//                         ))}
//                         <div className="text-center mt-6">
//                           <button
//                             type="submit"
//                             className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                           >
//                             Calculate CP
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       {showQueries && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full">
//             <h4 className="text-blueGray-600 text-xl font-bold mb-4">
//               All Queries
//             </h4>
//             <button
//               onClick={() => setShowQueries(false)}
//               className="absolute top-4 right-4 bg-red-500 text-white active:bg-red-700 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
//             >
//               Close
//             </button>
//             <ul>
//               {requirements.map((requirement) => (
//                 <li key={requirement.requirementNumber} className="bg-white p-4 my-2 rounded shadow-md">
//                   <h4 className="text-blueGray-700 font-bold">
//                     {requirement.title}
//                   </h4>
//                   <p className="text-blueGray-500">{requirement.description}</p>
//                   <p className="text-blueGray-500">{requirement.date}</p>
//                   <div className="bg-blueGray-50 p-4 rounded shadow-inner mt-4">
//                     <h5 className="text-blueGray-600 font-bold mb-2">Queries:</h5>
//                     {/* Example query, replace with actual query data */}
//                     <p className="text-blueGray-500">Example query for {requirement.title}</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// dashboard try from figma

import React from "react";

import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div>
      <Sidebar />
    </div>
  );
}
