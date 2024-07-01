// import { useState, Fragment } from "react";
// // Material UI Components
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
// // Icons
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

// import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
// import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

// // Form Elements
// import { formEl } from "../constants";
// const TextFieldInput = ({
//   item,
//   handleValue,
//   deleteEl,
//   handleElType,
//   duplicateElement,
//   handleLabelChange, // Add handleLabelChange to props
// }) => (
//   <Fragment>
//     <Paper elevation={1}>
//       <Box sx={{ textAlign: "center" }}>
//         <DragIndicatorIcon
//           sx={{ transform: "rotate(-90deg)", cursor: "all-scroll" }}
//         />
//       </Box>
//       <Box sx={{ p: 3 }}>
//         <Grid container spacing={1}>
//           <Grid item xs={9}>
//             <TextField
//               value={item.label} // Bind to item.label
//               variant="outlined"
//               onChange={(e) => handleLabelChange(item.id, e.target.value)} // Call handleLabelChange
//               fullWidth
//               placeholder="Textfield Label"
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               value={item.value} // Bind to item.value
//               variant="outlined"
//               onChange={(e) => handleValue(item.id, e)}
//               fullWidth
//               required={item.required}
//               placeholder="Textfield Input Field"
//             />
//           </Grid>
//           <Grid item xs={3}>
//             <FormControl fullWidth>
//               <InputLabel id="el-type-label">Type</InputLabel>
//               <Select
//                 labelId="el-type-label"
//                 id="el-type"
//                 label="Type"
//                 value={item.type}
//                 onChange={(e) => handleElType(item.id, e.target.value)}
//               >
//                 {formEl &&
//                   formEl.map((el, key) => (
//                     <MenuItem key={key} value={el.value}>
//                       {el.label}
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//       </Box>
//       <Divider light />
//       <FormGroup row sx={{ alignItems: "center" }}>
//         <Tooltip title="Delete Element" aria-label="delete-element">
//           <IconButton
//             aria-label="delete-element"
//             onClick={() => deleteEl(item.id)}
//             sx={{ ml: 2 }}
//           >
//             <DeleteRoundedIcon sx={{ color: "#cf0000" }} />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Duplicate Element" aria-label="duplicate-element">
//           <IconButton
//             aria-label="duplicate-element"
//             onClick={() => duplicateElement(item.id, item.type)}
//             sx={{ ml: 2 }}
//           >
//             <FileCopyRoundedIcon sx={{ color: "#c1c1c1" }} />
//           </IconButton>
//         </Tooltip>
//         {/*<FormControlLabel
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
//       </FormGroup>
//     </Paper>
//   </Fragment>
// );

// export default TextFieldInput;



import { Fragment } from "react";
// Material UI Components
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
// Icons
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

// Form Elements
import { formEl } from "../constants";

const TextFieldInput = ({
  item,
  handleValue,
  deleteEl,
  handleElType,
  duplicateElement,
  handleLabelChange,
  disabled = false, // New prop to control disabled state
}) => (
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
              value={item.label || ""}
              variant="outlined"
              onChange={(e) => handleLabelChange(item.id, e.target.value)}
              fullWidth
              placeholder="Textfield Label"
              sx={{ mb: 2 }}
              disabled={disabled} // Disable the TextField if disabled prop is true
            />
            <TextField
              value={item.value || ""}
              variant="outlined"
              onChange={(e) => handleValue(item.id, e)}
              fullWidth
              required={item.required}
              placeholder="Textfield Input Field"
              disabled={disabled} // Disable the TextField if disabled prop is true
            />
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
                disabled={disabled} // Disable the Select if disabled prop is true
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
      <FormGroup row sx={{ alignItems: "center" }}>
        <Tooltip title="Delete Element" aria-label="delete-element">
          <IconButton
            aria-label="delete-element"
            onClick={() => deleteEl(item.id)}
            sx={{ ml: 2 }}
            disabled={disabled} // Disable the IconButton if disabled prop is true
          >
            <DeleteRoundedIcon sx={{ color: "#cf0000" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Duplicate Element" aria-label="duplicate-element">
          <IconButton
            aria-label="duplicate-element"
            onClick={() => duplicateElement(item.id, item.type)}
            sx={{ ml: 2 }}
            disabled={disabled} // Disable the IconButton if disabled prop is true
          >
            <FileCopyRoundedIcon sx={{ color: "#c1c1c1" }} />
          </IconButton>
        </Tooltip>
      </FormGroup>
    </Paper>
  </Fragment>
);

export default TextFieldInput;
