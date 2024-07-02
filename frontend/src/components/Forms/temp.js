// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';
// import PersonIcon from '@mui/icons-material/Person';
// import AddIcon from '@mui/icons-material/Add';
// import Typography from '@mui/material/Typography';
// import { blue } from '@mui/material/colors';
// import { useHistory } from "react-router-dom";

// export default function TaskSelector() {
//   const history = useHistory();
//   const [open, setOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState("");
//   const [taskNames, setTaskNames] = useState([]);

//   useEffect(() => {
//     const fetchTaskNames = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/templates");
//         const data = await response.json();
//         setTaskNames(data.map(template => template.templateName));
//       } catch (error) {
//         console.error("Error fetching task names:", error);
//       }
//     };

//     fetchTaskNames();
//   }, []);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     if (value) {
//       setSelectedValue(value);
//       showForm(value); // Navigate to form with selected template name
//     }
//   };

//   const handleListItemClick = (value) => {
//     handleClose(value);
//   };

//   const showForm = (templateName) => {
//     history.push("/form", { tempName: templateName });
//   };

//   return (
//     <div>
//       <Typography variant="subtitle1" component="div">
//         Selected: {selectedValue}
//       </Typography>
//       <br />
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Create Form
//       </Button>
//       <Dialog onClose={() => handleClose(null)} open={open}>
//         <DialogTitle>Select Template</DialogTitle>
//         <List sx={{ pt: 0 }}>
//           {taskNames.map((taskName) => (
//             <ListItem disableGutters key={taskName}>
//               <ListItemButton onClick={() => handleListItemClick(taskName)}>
//                 <ListItemText primary={taskName} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//           <ListItem disableGutters>
//             {/* Uncomment if you want to add functionality for "New Form" */}
//             {/* <ListItemButton onClick={() => handleListItemClick('addTask')}>
//               <ListItemAvatar>
//                 <Avatar>
//                   <AddIcon />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText primary="New Form" />
//             </ListItemButton> */}
//           </ListItem>
//         </List>
//       </Dialog>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, Typography, Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

// export default function TaskSelector() {
//   const history = useHistory();
//   const [open, setOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState("");
//   const [taskNames, setTaskNames] = useState([]);
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     const fetchTaskNames = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/templates");
//         const data = await response.json();
//         setTaskNames(data.map(template => template.templateName));
//       } catch (error) {
//         console.error("Error fetching task names:", error);
//       }
//     };

//     fetchTaskNames();

//     const fetchFiles = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/files");
//         const data = await response.json();
//         console.log('Fetched files:', data);
//         setFiles(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching files:", error);
//         setFiles([]);
//       }
//     };

//     fetchFiles();
//   }, []);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     if (value) {
//       setSelectedValue(value);
//       showForm(value)
//     }
//   };

//   const handleListItemClick = (value) => {
//     handleClose(value);
//   };
//   const showForm = (templateName) => {
//         history.push("/form", { tempName: templateName });
//       };

//   return (
//     <div>
//       <Typography variant="subtitle1" component="div">
//         Selected: {selectedValue}
//       </Typography>
//       <br />
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Create Form
//       </Button>
//       <Dialog onClose={() => handleClose(null)} open={open}>
//         <DialogTitle>Select Template</DialogTitle>
//         <List sx={{ pt: 0 }}>
//           {taskNames.map((taskName) => (
//             <ListItem disableGutters key={taskName}>
//               <ListItemButton onClick={() => handleListItemClick(taskName)}>
//                 <ListItemText primary={taskName} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Dialog>

//       <TableContainer component={Paper} sx={{ marginTop: 4 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Project Number</TableCell>
//               <TableCell>Project Name</TableCell>
//               <TableCell>Template Name</TableCell>
//               <TableCell>Created By</TableCell>
//               <TableCell>Date of Creation</TableCell>
//               <TableCell>Version</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {files.map((file) => (
//               <TableRow key={file._id}>
//                 <TableCell>{file.projectNumber}</TableCell>
//                 <TableCell>{file.projectName}</TableCell>
//                 <TableCell>{file.templateName}</TableCell>
//                 <TableCell>{file.createdBy}</TableCell>
//                 <TableCell>{new Date(file.createdAt).toLocaleDateString()}</TableCell>
//                 <TableCell>
//                   <Select defaultValue={file.versions[0].version}>
//                     {file.versions.map((version, index) => (
//                       <MenuItem key={index} value={version.version}>
//                         {version.version} - Created: {new Date(version.createdAt).toLocaleDateString()} - Updated: {version.updatedAt ? new Date(version.updatedAt).toLocaleDateString() : 'N/A'}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </TableCell>
//                 <TableCell>
//                   <Button variant="contained" onClick={() => alert(`Viewing file: ${file.fileName}`)}>View</Button>
//                   <Button variant="contained" onClick={() => alert(`Downloading file: ${file.fileName}`)}>Download</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// Working

// import React, { useEffect, useRef, useState } from "react";
// import { useHistory } from "react-router-dom";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Select,
//   MenuItem,
//   Button,
//   Typography,
//   Dialog,
//   DialogTitle,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   TextField,
//   TablePagination,
// } from "@mui/material";
// import axios from "axios";
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

// export default function TaskSelector() {
//   const history = useHistory();
//   const [open, setOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState("");
//   const [taskNames, setTaskNames] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   // const [title, setTitle] = useState("Untitled Form");
//   // const [description, setDescription] = useState("");
//   // const [data, setData] = useState([]);

//   let title = useRef("")
//   let description = useRef("")
//   let data = useRef([])

//   const location = useLocation();
//   // const projectNumber  = location.state.projectnum

//   //file props

//   useEffect(() => {
//     const fetchTaskNames = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/templates");
//         const data = await response.json();
//         setTaskNames(data.map((template) => template.templateName));
//       } catch (error) {
//         console.error("Error fetching task names:", error);
//       }
//     };

//     fetchTaskNames();

//     const fetchFiles = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/files");
//         const data = await response.json();
//         console.log("Fetched files:", data);
//         setFiles(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching files:", error);
//         setFiles([]);
//       }
//     };

//     fetchFiles();
//   }, []);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     if (value) {
//       setSelectedValue(value);
//       showForm(value);
//     }
//   };

//   const handleListItemClick = (value) => {
//     handleClose(value);
//   };

//   const showForm = (templateName) => {
//     history.push("/form", { tempName: templateName });
//   };
//   const showFormdata = (title, description, data) => {
//     history.push("/form", {
//       titlen: title,
//       descriptionn: description,
//       datan: data,
//     });
//   };

//   const handleSearch = (event) => {
//     setSearch(event.target.value);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleView = async (formId) => {
//     if (formId) {
//       console.log(`form id is : ${formId}`);
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/getForm/${formId}`
//         );
//         if (response.data) {
//           title = response.data.title;
//           description = response.data.description;
//           data = response.data.data;
//           console.log(response.data.title);
//           console.log(response.data.description);
//           console.log(response.data.data);
//         }
//         showFormdata(title,description,data)

//         console.log(title);
//         console.log(description);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching form:", error);
//         alert("Error fetching form data");
//       }
//     }
//   };

//   const filteredFiles = files.filter((file) =>
//     file.templateName.toLowerCase().includes(search.toLowerCase())

//   );

//   return (
//     <div
//       style={{ padding: "20px", backgroundColor: "#1e293b", color: "white" }}
//     >
//       <Typography variant="subtitle1" component="div">
//         Selected: {selectedValue}
//       </Typography>
//       <br />
//       <Button
//         variant="outlined"
//         onClick={handleClickOpen}
//         style={{ color: "white", borderColor: "white" }}
//       >
//         Create Form
//       </Button>
//       <Dialog onClose={() => handleClose(null)} open={open}>
//         <DialogTitle>Select Template</DialogTitle>
//         <List sx={{ pt: 0 }}>
//           {taskNames.map((taskName) => (
//             <ListItem disableGutters key={taskName}>
//               <ListItemButton onClick={() => handleListItemClick(taskName)}>
//                 <ListItemText primary={taskName} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Dialog>
//       <TextField
//         label="Search by Template Name"
//         variant="outlined"
//         value={search}
//         onChange={handleSearch}
//         sx={{ marginTop: 2, marginBottom: 2, backgroundColor: "white" }}
//         fullWidth
//       />
//       <TableContainer component={Paper} sx={{ marginTop: 4 }}>
//         <Table>
//           <TableHead>
//             <TableRow style={{ color: "white", backgroundColor: "#334155" }}>
//               <TableCell style={{ color: "white" }}>File Number</TableCell>
//               <TableCell style={{ color: "white" }}>Project Number</TableCell>
//               <TableCell style={{ color: "white" }}>Project Name</TableCell>
//               <TableCell style={{ color: "white" }}>Template Name</TableCell>
//               <TableCell style={{ color: "white" }}>Created By</TableCell>
//               <TableCell style={{ color: "white" }}>Date of Creation</TableCell>
//               <TableCell style={{ color: "white" }}>Version</TableCell>
//               {/* <TableCell style={{ color: 'white' }}>Actions</TableCell> */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredFiles
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((file) => (
//                 <TableRow key={file._id} style={{ backgroundColor: "white" }}>
//                   <TableCell style={{ color: "#334155" }}>
//                     {file.fileNumber}
//                   </TableCell>
//                   <TableCell style={{ color: "#334155" }}>
//                     {file.projectNumber}
//                   </TableCell>
//                   <TableCell style={{ color: "#334155" }}>
//                     {file.projectTitle}
//                   </TableCell>
//                   <TableCell style={{ color: "#334155" }}>
//                     {file.templateName}
//                   </TableCell>
//                   <TableCell style={{ color: "#334155" }}>
//                     {file.createdBy}
//                   </TableCell>
//                   <TableCell style={{ color: "#334155" }}>
//                     {new Date(file.createdAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     <Select
//                       defaultValue={file.versions[0].version}
//                       style={{ color: "#334155" }}
//                     >
//                       {file.versions.map((version, index) => (
//                         <MenuItem
//                           key={index}
//                           value={version.version}
//                           style={{ color: "#1e293b" }}
//                         >
//                           {version.version} - Created:{" "}
//                           {new Date(version.createdAt).toLocaleDateString()} -
//                           Updated:{" "}
//                           {version.updatedAt
//                             ? new Date(version.updatedAt).toLocaleDateString()
//                             : "N/A"}
//                           <br></br>
//                           <Button
//                             variant="outlined"
//                             onClick={() =>
//                               alert(`Viewing file: ${version.version}`)
//                             }
//                             style={{
//                               color: "white",
//                               borderColor: "white",
//                               marginRight: "3px",
//                               marginLeft: "3px",
//                               backgroundColor: "#1e293b",
//                             }}
//                           >
//                             View
//                           </Button>
//                           <Button
//                             variant="outlined"
//                             onClick={() => handleView(`${version.version}`)}
//                             style={{
//                               color: "white",
//                               borderColor: "white",
//                               backgroundColor: "#1e293b",
//                             }}
//                           >
//                             Edit
//                           </Button>
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </TableCell>
//                   {/* <TableCell>
//                 {file.versions.map((version, index) => (
//                   <Button variant="contained" onClick={() => alert(`Viewing file: ${file.versions.version}`)}>View</Button>
//                   <Button variant="contained" onClick={() => alert(`Downloading file: ${file.versions.version}`)}>Download</Button>
//                 </TableCell> */}
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 15]}
//           component="div"
//           count={filteredFiles.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{ color: "#334155" }}
//         />
//       </TableContainer>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  TablePagination,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function TaskSelector(props) {
  // project Number from Projects
  const { state } = useLocation();
  const projectNumber = state.projectNumber;
  const projectTitle = state.projectTitle;
  const createdBy = state.createdBy;

  const history = useHistory();
  const [openDia, setOpenDia] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [taskNames, setTaskNames] = useState([]);
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // let title = useRef("");
  // let description = useRef("");
  // let data = useRef([]);

  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const dataRef = useRef([]);
  const projectNumberRef = useRef("");
  const fileNumberRef = useRef("");
  const projectTitleRef = useRef("");
  const templateNameRef = useRef("");
  const createdByRef = useRef("");
  const createdAtRef = useRef("");
  const versionNumRef = useRef("");
  const disable = useRef(false);

  useEffect(() => {
    const fetchTaskNames = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/templates");
        const data = await response.json();
        setTaskNames(data.map((template) => template.templateName));
      } catch (error) {
        console.error("Error fetching task names:", error);
      }
    };
    console.log(disable.current)
    fetchTaskNames();

    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/files");
        const data = await response.json();
        console.log("Fetched files:", data);
        setFiles(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching files:", error);
        setFiles([]);
      }
    };

    fetchFiles();
  }, []);
  console.log(createdBy);
  // Version Dialogbox

  const handleClickOpenDia = () => {
    setOpenDia(true);
  };

  const handleCloseDia = () => {
    setOpenDia(false);
  };

  // templates
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    if (value) {
      handleClickOpenDia();
      setSelectedValue(value);
      showForm(value,projectNumber,projectTitle,createdBy);
    }
  };

  const handleListItemClick = (value) => {
    handleClose(value);
  };

  const showForm = (templateName,projectNumber,projectTitle,createdBy) => {
    if (templateName) history.push("/form", { tempName: templateName, projectNumber : projectNumber,projectTitle:projectTitle, createdBy:createdBy });
  };

  // const showFormdata = (title, description, data) => {
  //   history.push("/form", {
  //     titlen: title.current,
  //     descriptionn: description.current,
  //     datan: data.current
  //   });
  // };

  const showFormdata = (
    titleRef,
    descriptionRef,
    dataRef,
    projectNumberRef,
    fileNumberRef,
    projectTitleRef,
    templateNameRef,
    createdByRef,
    createdAtRef,
    versionNumRef,
    disable
  ) => {
    history.push("/form", {
      titlen: titleRef.current,
      descriptionn: descriptionRef.current,
      datan: dataRef.current,
      projectNumber: projectNumberRef.current,
      fileNumber: fileNumberRef.current,
      // projectTitle: projectTitleRef.current,
      projectTitle : projectTitle,
      templateName: templateNameRef.current,
      // createdBy: createdByRef.current,
      createdBy: createdBy,
      createdAt: createdAtRef.current,
      versionNum : versionNumRef.current,
      disable: disable.current,
    });
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleView = async (formId) => {
  //   if (formId) {
  //     console.log(`form id is : ${formId}`);
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/getForm/${formId}`
  //       );
  //       if (response.data) {
  //         title.current = response.data.title;
  //         description.current = response.data.description;
  //         data.current = response.data.data;
  //         console.log(response.data.title);
  //         console.log(response.data.description);
  //         console.log(response.data.data);
  //       }
  //       showFormdata(title, description, data);

  //       console.log(title.current);
  //       console.log(description.current);
  //       console.log(data.current);
  //     } catch (error) {
  //       console.error("Error fetching form:", error);
  //       alert("Error fetching form data");
  //     }
  //   }
  // };

  // const handleView = async (version) => {
  //   if (version) {
  //     console.log(`form id is : ${version}`);
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/getForm/${version}`
  //       );
  //       if (response.data) {
  //         const {
  //           title,
  //           description,
  //           data,
  //           projectNumber,
  //           fileNumber,
  //           projectTitle,
  //           templateName,
  //           createdBy,
  //           createdAt,
  //         } = response.data;

  //         // Or if using useRef
  //         titleRef.current = title;
  //         descriptionRef.current = description;
  //         dataRef.current = data;
  //         projectNumberRef.current = projectNumber;
  //         fileNumberRef.current = fileNumber;
  //         projectTitleRef.current = projectTitle;
  //         templateNameRef.current = templateName;
  //         createdByRef.current = createdBy;
  //         createdAtRef.current = createdAt;

  //         // Update the state or DOM elements with the fetched data
  //         showFormdata({
  //           titleRef,
  //           descriptionRef,
  //           dataRef,
  //           projectNumberRef,
  //           fileNumberRef,
  //           projectTitleRef,
  //           templateNameRef,
  //           createdByRef,
  //           createdAtRef,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching form:", error);
  //       alert("Error fetching form data");
  //     }
  //   }
  // };

  const handleEdit = async (version) => {
    if (version) {
      console.log(`Fetching form data for version: ${version}`);
      try {
        disable.current = false;
        const response = await axios.get(
          `http://localhost:5000/api/getForm/${version}`
        );
        if (response.data) {
          // Assuming useRef for storing DOM element references
          titleRef.current = response.data.title;
          descriptionRef.current = response.data.description;
          dataRef.current = response.data.data;
          // projectNumberRef.current = response.data.projectNumber;
          projectNumberRef.current = projectNumber;
          fileNumberRef.current = response.data.fileNumber;
          projectTitleRef.current = response.data.projectTitle;
          templateNameRef.current = response.data.templateName;
          createdByRef.current = createdBy;
          createdAtRef.current = response.data.createdAt;
          versionNumRef.current = response.data.versionNum;
          

          console.log(response.data.fileNumber);
          console.log("disable" + disable.current);

          // Update the state or DOM elements with the fetched data
          showFormdata(
            titleRef,
            descriptionRef,
            dataRef,
            projectNumberRef,
            fileNumberRef,
            projectTitleRef,
            templateNameRef,
            createdByRef,
            createdAtRef,
            versionNumRef,
            disable
          );
        }
      } catch (error) {
        console.error("Error fetching form:", error);
        alert("Error fetching form data");
      }
    }
  };

  const handleView = async (version) => {
    if (version) {
      console.log(`Fetching form data for version: ${version}`);
      try {
        disable.current = true;
        const response = await axios.get(
          `http://localhost:5000/api/getForm/${version}`
        );
        if (response.data) {
          // Assuming useRef for storing DOM element references
          titleRef.current = response.data.title;
          descriptionRef.current = response.data.description;
          dataRef.current = response.data.data;
          // projectNumberRef.current = response.data.projectNumber;
          projectNumberRef.current = projectNumber;
          fileNumberRef.current = response.data.fileNumber;
          projectTitleRef.current = response.data.projectTitle;
          templateNameRef.current = response.data.templateName;
          createdByRef.current = createdBy;
          createdAtRef.current = response.data.createdAt;
          versionNumRef.current = response.data.versionNum;
          
          console.log("disable:" + disable.current);
          console.log(response.data.fileNumber);

          // Update the state or DOM elements with the fetched data
          showFormdata(
            titleRef,
            descriptionRef,
            dataRef,
            projectNumberRef,
            fileNumberRef,
            projectTitleRef,
            templateNameRef,
            createdByRef,
            createdAtRef,
            versionNumRef,
            disable
          );
        }
      } catch (error) {
        console.error("Error fetching form:", error);
        alert("Error fetching form data");
      }
    }
  };

  const filteredFiles = files
    .filter((file) => file.projectNumber === projectNumber)
    .filter((file) =>
      file.templateName.toLowerCase().includes(search.toLowerCase())
    );
  console.log("Project Number: " + projectNumber);

  return (
    <div
      style={{ padding: "20px", backgroundColor: "#1e293b", color: "white" }}
    >
      <br />
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ color: "white", borderColor: "white" }}
      >
        Create Form
      </Button>
      <Dialog onClose={() => handleClose(null)} open={open}>
        <DialogTitle>Select Template</DialogTitle>
        <List sx={{ pt: 0 }}>
          {taskNames.map((taskName) => (
            <ListItem disableGutters key={taskName}>
              <ListItemButton onClick={() => handleListItemClick(taskName)}>
                <ListItemText primary={taskName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
      <TextField
        label="Search by Template Name"
        variant="outlined"
        value={search}
        onChange={handleSearch}
        sx={{ marginTop: 2, marginBottom: 2, backgroundColor: "white" }}
        fullWidth
      />
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow style={{ color: "white", backgroundColor: "#334155" }}>
              <TableCell style={{ color: "white" }}>File Number</TableCell>
              <TableCell style={{ color: "white" }}>Project Number</TableCell>
              <TableCell style={{ color: "white" }}>Project Name</TableCell>
              <TableCell style={{ color: "white" }}>Template Name</TableCell>
              <TableCell style={{ color: "white" }}>Created By</TableCell>
              <TableCell style={{ color: "white" }}>Date of Creation</TableCell>
              <TableCell style={{ color: "white" }}>Version</TableCell>
              {/* <TableCell style={{ color: 'white' }}>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFiles
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((file) => (
                <TableRow key={file._id} style={{ backgroundColor: "white" }}>
                  <TableCell style={{ color: "#334155" }}>
                    {file.fileNumber}
                  </TableCell>
                  <TableCell style={{ color: "#334155" }}>
                    {file.projectNumber}
                  </TableCell>
                  <TableCell style={{ color: "#334155" }}>
                    {file.projectTitle}
                  </TableCell>
                  <TableCell style={{ color: "#334155" }}>
                    {file.templateName}
                  </TableCell>
                  <TableCell style={{ color: "#334155" }}>
                    {file.createdBy}
                  </TableCell>
                  <TableCell style={{ color: "#334155" }}>
                    {new Date(file.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={file.versions[0].versionNum}
                      style={{ color: "#334155" }}
                    >
                      {file.versions.map((version, index) => (
                        <MenuItem
                          key={index}
                          value={version.versionNum}
                          style={{ color: "#1e293b" }}
                        >
                          {version.versionNum} - Created:{" "}
                          {new Date(version.createdAt).toLocaleDateString()} -
                          Updated:{" "}
                          {version.updatedAt
                            ? new Date(version.updatedAt).toLocaleDateString()
                            : "N/A"}
                          <br></br>
                          <Button
                            variant="outlined"
                            onClick={() => handleView(`${version.version}`)}
                            style={{
                              color: "white",
                              borderColor: "white",
                              marginRight: "3px",
                              marginLeft: "3px",
                              backgroundColor: "#1e293b",
                            }}
                          >
                            View
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => handleEdit(`${version.version}`)}
                            style={{
                              color: "white",
                              borderColor: "white",
                              backgroundColor: "#1e293b",
                            }}
                          >
                            Edit
                          </Button>
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredFiles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: "#334155" }}
        />
      </TableContainer>
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';
// import Typography from '@mui/material/Typography';
// import { blue } from '@mui/material/colors';
// import { useHistory } from 'react-router-dom';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';

// export default function TaskSelector() {

//   const history = useHistory();
//   const handleListItemClick = (value) => {
//     handleClose(value);
//   };

//   const showForm = (templateName) => {
//     history.push("/form", { tempName: templateName });
//   };
//   const [open, setOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState("");
//   const [taskNames, setTaskNames] = useState([]);
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     const fetchTaskNames = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/templates");
//         const data = await response.json();
//         setTaskNames(data.map(template => template.templateName));
//       } catch (error) {
//         console.error("Error fetching task names:", error);
//       }
//     };

//     fetchTaskNames();

//     const fetchFiles = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/files");
//         const data = await response.json();
//         console.log('Fetched files:', data);
//         setFiles(Array.isArray(data) ? data : []); // Ensure data is an array
//       } catch (error) {
//         console.error("Error fetching files:", error);
//         setFiles([]); // Set files to empty array on error
//       }
//     };

//     fetchFiles();
//   }, []);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     if (value) {
//       setSelectedValue(value);
//       showForm(value);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="subtitle1" component="div">
//         Selected: {selectedValue}
//       </Typography>
//       <br />
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Create Form
//       </Button>
//       <Dialog onClose={() => handleClose(null)} open={open}>
//         <DialogTitle>Select Template</DialogTitle>
//         <List sx={{ pt: 0 }}>
//           {taskNames.map((taskName) => (
//             <ListItem disableGutters key={taskName}>
//               <ListItemButton onClick={() => handleListItemClick(taskName)}>
//                 <ListItemText primary={taskName} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Dialog>

//       {/* Add the table here */}
//       <TableContainer component={Paper} sx={{ marginTop: 4 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Project Number</TableCell>
//               <TableCell>Project Name</TableCell>
//               <TableCell>Template Name</TableCell>
//               <TableCell>Created By</TableCell>
//               <TableCell>Date of Creation</TableCell>
//               <TableCell>Version</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {files.map((file) => (
//               <TableRow key={file._id}>
//                 <TableCell>{file.projectNumber}</TableCell>
//                 <TableCell>{file.projectName}</TableCell>
//                 <TableCell>{file.templateName}</TableCell>
//                 <TableCell>{file.createdBy}</TableCell>
//                 <TableCell>{new Date(file.createdAt).toLocaleDateString()}</TableCell>
//                 <TableCell>
//                   <Select defaultValue={file.versions[0].version}>
//                     {file.versions.map((version, index) => (
//                       <MenuItem key={index} value={version.version}>
//                         {version.version} - Created: {new Date(version.createdAt).toLocaleDateString()} - Updated: {version.updatedAt ? new Date(version.updatedAt).toLocaleDateString() : 'N/A'}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </TableCell>
//                 <TableCell>
//                   <Button variant="contained" onClick={() => alert(`Viewing file: ${file.fileName}`)}>View</Button>
//                   <Button variant="contained" onClick={() => alert(`Downloading file: ${file.fileName}`)}>Download</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }
