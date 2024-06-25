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
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

//Form Elements
import { formEl } from "../constants";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

// NumberInput Component
const NumberInput = ({
  item,
  handleValue,
  deleteEl,

  handleElType,
  duplicateElement,
  handleLabelChange,
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
              value={item.label}
              variant="outlined"
              onChange={(e) => handleLabelChange(item.id, e.target.value)}
              fullWidth
              required={item.required}
              placeholder="Number Label"
              sx={{ mb: 2 }}
            />
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Number Input Field"
              type="number"
              value={item.value}
              onChange={(e) => handleValue(item.id, e)}
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
      </FormGroup>
    </Paper>
  </Fragment>
);
export default NumberInput;
