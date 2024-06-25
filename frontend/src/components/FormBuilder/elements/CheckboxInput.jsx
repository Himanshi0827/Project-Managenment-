// import React, { Fragment, useState } from "react";
// import uuid from "react-uuid";
// // Material UI Components
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import FormGroup from "@mui/material/FormGroup";
// import Tooltip from "@mui/material/Tooltip";
// import Grid from "@mui/material/Grid";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import Divider from "@mui/material/Divider";

// // Icons
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
// import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
// import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";

// // Form Elements
// import { formEl } from "../constants";

// const CheckboxInput = ({
//   item,
//   deleteEl,
//   handleElType,
//   addOption,
//   handleOptionValues,
//   deleteOption,
//   duplicateElement,
//   handleLabelChange,
// }) => {
//   const createNewOption = (id) => {
//     const data = {
//       id: uuid(),
//       value: "",
//     };
//     addOption(id, data);
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
//                 defaultValue={item.label}
//                 variant="outlined"
//                 onChange={(e) => handleLabelChange(item.id, e.target.value)}
//                 fullWidth
//                 required={item.required}
//                 placeholder="Checkbox Label"
//                 sx={{ mb: 2 }}
//               />
//               {item.options &&
//                 item.options.length > 0 &&
//                 item.options.map((opt, key) => (
//                   <Box sx={{ display: "flex" }} key={opt.id}>
//                     <TextField
//                       variant="outlined"
//                       fullWidth
//                       placeholder={`Checkbox Option ${key + 1}`}
//                       defaultValue={opt.value}
//                       sx={{ mb: 1 }}
//                       onBlur={(e) =>
//                         handleOptionValues(item.id, opt.id, e.target.value)
//                       }
//                     />
//                     <Tooltip title="Delete Option" aria-label="delete-option">
//                       <IconButton
//                         aria-label="delete-option"
//                         onClick={() => deleteOption(item.id, opt.id)}
//                         sx={{ ml: 2 }}
//                       >
//                         <DeleteRoundedIcon sx={{ color: "#cf0000" }} />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 ))}
//               <Button variant="text" onClick={() => createNewOption(item.id)}>
//                 Add Option
//               </Button>
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
//         <FormGroup row sx={{ alignItems: "center", justifyContent: "space-between" }}>
//           <Box>
//             <Tooltip title="Delete Element" aria-label="delete-element">
//               <IconButton
//                 aria-label="delete-element"
//                 onClick={() => deleteEl(item.id)}
//                 sx={{ ml: 2 }}
//               >
//                 <DeleteRoundedIcon sx={{ color: "#cf0000" }} />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Duplicate Element" aria-label="duplicate-element">
//               <IconButton
//                 aria-label="duplicate-element"
//                 onClick={() => duplicateElement(item.id, item.type)}
//                 sx={{ ml: 2 }}
//               >
//                 <FileCopyRoundedIcon sx={{ color: "#c1c1c1" }} />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </FormGroup>
//       </Paper>
//     </Fragment>
//   );
// };

// export default CheckboxInput;


import React, { Fragment } from "react";
import uuid from "react-uuid";
// Material UI Components
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// Icons
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";

import { formEl } from "../constants";
const CheckboxInput = ({
  item,
  deleteEl,
  handleElType,
  addOption,
  handleOptionValues,
  deleteOption,
  duplicateElement,
  handleLabelChange,
}) => {

  const createNewOption = (id) => {
    const data = {
      id: uuid(),
      value: "",
    };
    addOption(id, data);
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
                defaultValue={item.label}
                variant="outlined"
                onChange={(e) => handleLabelChange(item.id, e.target.value)}
                fullWidth
                required={item.required}
                placeholder="Checkbox Label"
                sx={{ mb: 2 }}
              />
              {item.options &&
                item.options.length > 0 &&
                item.options.map((opt, key) => (
                  <Box sx={{ display: "flex", alignItems: "center" }} key={opt.id}>
                    <Checkbox />
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder={`Checkbox Option ${key + 1}`}
                      defaultValue={opt.value}
                      sx={{ mb: 1 }}
                      onBlur={(e) =>
                        handleOptionValues(item.id, opt.id, e.target.value)
                      }
                    />
                    <Tooltip title="Delete Option" aria-label="delete-option">
                      <IconButton
                        aria-label="delete-option"
                        onClick={() => deleteOption(item.id, opt.id)}
                        sx={{ ml: 2 }}
                      >
                        <DeleteRoundedIcon sx={{ color: "#cf0000" }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ))}
              <Button variant="text" onClick={() => createNewOption(item.id)}>
                Add Option
              </Button>
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
        <Divider light />
        <FormGroup row sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Tooltip title="Delete Element" aria-label="delete-element">
              <IconButton
                aria-label="delete-element"
                onClick={() => deleteEl(item.id)}
                sx={{ ml: 2 }}
              >
                <DeleteRoundedIcon sx={{ color: "#cf0000" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Duplicate Element" aria-label="duplicate-element">
              <IconButton
                aria-label="duplicate-element"
                onClick={() => duplicateElement(item.id, item.type)}
                sx={{ ml: 2 }}
              >
                <FileCopyRoundedIcon sx={{ color: "#c1c1c1" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </FormGroup>
      </Paper>
    </Fragment>
  );
};

export default CheckboxInput;
