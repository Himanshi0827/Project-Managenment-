// import { Fragment } from "react";
// //Material UI Components
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import Grid from "@mui/material/Grid";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import Button from "@mui/material/Button";
// //Icons
// import React, { useState } from "react";
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
// import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
// import { Typography } from "@mui/material";
// import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
// import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

// //Form Elements
// import { formEl } from "../constants";

// const UploadFile = ({
//   item,
//   handleValue,
//   deleteEl,

//   handleElType,
//   duplicateElement,
// }) => {
//   const [fileName, setFileName] = useState("");

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFileName(file.name);
//       handleValue(item.id, { target: { value: file.name } });
//     }
//   };
//   return (
//     <Fragment>
//       <Paper elevation={1}>
//         <Box sx={{ textAlign: "center" }}>
//           <DragIndicatorIcon
//             sx={{ transform: "rotate(-90deg)", cursor: "all-scroll" }}
//           />
//         </Box>
//         <Box sx={{ p: 3 }}>
//           <Grid container spacing={1}>
//             <Grid item xs={9}>
//               <TextField
//                 defaultValue={item.value}
//                 variant="outlined"
//                 onBlur={(e) => handleValue(item.id, e)}
//                 fullWidth
//                 required={item.required}
//                 placeholder="Upload File Label"
//                 sx={{ mb: 2 }}
//               />
//               {/*<Button
//                 variant="contained"
//                 component="label"
//                 fullWidth
//                 startIcon={<UploadFileRoundedIcon />}
//               >
//                 Upload File
//                 <input type="file" hidden />
//               </Button>*/}
//               <Grid container spacing={2} direction="column">
//                 {fileName && (
//                   <Grid item>
//                     <Typography variant="body2">{fileName}</Typography>
//                   </Grid>
//                 )}
//                 <Grid item>
//                   <input
//                     accept="*/*"
//                     style={{ display: "none" }}
//                     id={`upload-button-${item.id}`}
//                     type="file"
//                     onChange={handleFileChange}
//                   />
//                   <label htmlFor={`upload-button-${item.id}`}>
//                     <Button
//                       variant="contained"
//                       component="span"
//                       startIcon={<UploadFileRoundedIcon />}
//                     >
//                       Upload File
//                     </Button>
//                   </label>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={3}>
//               <FormControl fullWidth>
//                 <InputLabel id="el-type-label">Type</InputLabel>
//                 <Select
//                   labelId="el-type-label"
//                   id="el-type"
//                   label="Type"
//                   value={item.type}
//                   onChange={(e) => handleElType(item.id, e.target.value)}
//                 >
//                   {formEl &&
//                     formEl.map((el, key) => (
//                       <MenuItem key={key} value={el.value}>
//                         {el.label}
//                       </MenuItem>
//                     ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </Box>
//         <Divider light />
//         <FormGroup row sx={{ alignItems: "center" }}>
//           <Tooltip title="Delete Element" aria-label="delete-element">
//             <IconButton
//               aria-label="delete-element"
//               onClick={() => deleteEl(item.id)}
//               sx={{ ml: 2 }}
//             >
//               <DeleteRoundedIcon sx={{ color: "#cf0000" }} />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Duplicate Element" aria-label="duplicate-element">
//             <IconButton
//               aria-label="duplicate-element"
//               onClick={() => duplicateElement(item.id, item.type)}
//               sx={{ ml: 2 }}
//             >
//               <FileCopyRoundedIcon sx={{ color: "#c1c1c1" }} />
//             </IconButton>
//           </Tooltip>

//           {/*<FormControlLabel
//           control={
//             <Switch
//               checked={item.required}
//               onChange={() => handleRequired(item.id)}
//               name="required-field"
//               color="secondary"
//             />
//           }
//           label="Required"
//           sx={{ ml: 2 }}
//         />*/}
//         </FormGroup>
//       </Paper>
//     </Fragment>
//   );
// };

// export default UploadFile;








import { Divider, FormGroup, IconButton } from "@mui/material";


import { Fragment, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { formEl } from "../constants";

const UploadFile = ({
  item,
  handleValue,
  deleteEl,
  handleElType,
  duplicateElement,
  handleImageUpload, // Added handleImageUpload prop
}) => {
  const [fileName, setFileName] = useState("");
  const [imageData, setImageData] = useState(null); // State to store image data

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      handleValue(item.id, { target: { value: file.name } });

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageData(reader.result); 
        };
        reader.readAsDataURL(file);
        handleImageUpload(file);
      }
    }
  };

  return (
    <Fragment>
      <Paper elevation={1}>
        <Box sx={{ textAlign: "center" }}>
          <DragIndicatorIcon
            sx={{ transform: "rotate(-90deg)", cursor: "all-scroll" }}
          />
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <TextField
                defaultValue={item.value}
                variant="outlined"
                onBlur={(e) => handleValue(item.id, e)}
                fullWidth
                required={item.required}
                placeholder="Upload File Label"
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2} direction="column">
                {fileName && (
                  <Grid item>
                    <Typography variant="body2">{fileName}</Typography>
                  </Grid>
                )}
                <Grid item>
                  <input
                    accept="image/png, image/jpeg"
                    style={{ display: "none" }}
                    id={`upload-button-${item.id}`}
                    type="file"
                    onChange={handleFileChange}
  
                  />
                  <label htmlFor={`upload-button-${item.id}`}>
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<UploadFileRoundedIcon />}
                    >
                      Upload Image
                    </Button>
                  </label>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="el-type-label">Type</InputLabel>
                <Select
                  labelId="el-type-label"
                  id="el-type"
                  label="Type"
                  value={item.type}
                  onChange={(e) => handleElType(item.id, e.target.value)}
                >
                  {formEl &&
                    formEl.map((el, key) => (
                      <MenuItem key={key} value={el.value}>
                        {el.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        {/* Display uploaded image */}
        {imageData && (
          <Box sx={{ p: 3 }}>
            <img src={imageData} alt="Uploaded" style={{ maxWidth: "100%" }} />
          </Box>
        )}
        <Divider light />
        <FormGroup row sx={{ alignItems: "center" }}>
          <IconButton
            aria-label="delete-element"
            onClick={() => deleteEl(item.id)}
            sx={{ ml: 2 }}
          >
            <DeleteRoundedIcon sx={{ color: "#cf0000" }} />
          </IconButton>
          <IconButton
            aria-label="duplicate-element"
            onClick={() => duplicateElement(item.id, item.type)}
            sx={{ ml: 2 }}
          >
            <FileCopyRoundedIcon sx={{ color: "#c1c1c1" }} />
          </IconButton>
        </FormGroup>
      </Paper>
    </Fragment>
  );
};

export default UploadFile;
