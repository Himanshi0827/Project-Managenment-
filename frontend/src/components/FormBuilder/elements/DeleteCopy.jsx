// Does Not called anywhere  For Now
// Just ignore this file

import React from "react";
import { Fragment } from "react";
//Material UI Components
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
//Icons
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FileCopyIcon from "@mui/icons-material/FileCopy";

//Form Elements
import { formEl } from "../constants";

const DeleteCopy = ({
  item,
  handleValue,
  deleteEl,
  handleRequired,
  handleElType,
  handleDate,
  duplicateElement,
  handleLabelChange,
}) => (
  <FormGroup row sx={{ alignItems: "center" }}>
    <Tooltip title="Delete Element" aria-label="delete-element">
      <IconButton
        aria-label="delete-element"
        onClick={() => deleteEl(item.id)}
        sx={{ ml: 2 }}
      >
        <DeleteOutlineOutlinedIcon color="secondary" />
      </IconButton>
    </Tooltip>
    <Tooltip title="Duplicate Element" aria-label="duplicate-element">
      <IconButton
        aria-label="duplicate-element"
        onClick={() => duplicateElement(item.id, item.type)}
        sx={{ ml: 2 }}
      >
        <FileCopyIcon color="secondary" />
      </IconButton>
    </Tooltip>
    <FormControlLabel
      control={
        <Switch
          checked={item.required}
          onChange={() => handleRequired(item.id)}
          name="required-field"
          color="secondary"
        />
      }
      label="Required"
      sx={{ ml: 2 }}
    />
  </FormGroup>
);

export default DeleteCopy;
