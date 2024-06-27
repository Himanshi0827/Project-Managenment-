import React, { Fragment, useState, useRef, useEffect } from "react";
import uuid from "react-uuid";
import Nestable from "react-nestable";
import axios from "axios";
// Material UI Components
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import mammoth from "mammoth";
// Form Elements
import {
  TextFieldInput,
  TextArea,
  NumberInput,
  RadioInput,
  UploadFile,
  CheckboxInput, // Import CheckboxInput component
} from "./elements";
import Layout from "./elements/layout/index.jsx";
import { formEl } from "./constants.js";
// Components
import Header from "./Header";
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Margin } from "@mui/icons-material";

const FormBuilder = () => {
  // Form

  const initVal = formEl[0]?.value;
  const fileInputRef = useRef();

  // State
  const [title, setTitle] = useState("Untitled Form");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState("text");
  const [images, setImages] = useState([]);

  const items = data;

  const location = useLocation();
  const tName = location.state.tempName;

  // setTitle(location.state.titlen);
  // setDescription(location.state.descriptionn);
  // setData(location.state.datan);

  useEffect(() => {
    setTitle(location.state.titlen);
    setDescription(location.state.descriptionn);
    setData(location.state.datan);
  }, []);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageData = {
        id: uuid(),
        data: reader.result,
      };
      setImages((prevState) => [...prevState, imageData]);
    };
  };

  // Function to add new element
  // const addElement = () => {
  //   const data = {
  //     id: uuid(),
  //     label: "",
  //     value: "",
  //     date: "",
  //     type: formData,
  //     required: false,
  //   };
  //   console.log("New Element:", data);
  //   setData((prevState) => [...prevState, data]);
  //   setFormData(initVal);
  // };

  const addElement = () => {
    const newElement = {
      id: uuid(),
      label: "",
      value: "",
      date: "",
      type: formData,
      required: false,
    };
    console.log("New Element:", newElement);
  
    setData((prevState) => {
      // Ensure prevState is an array before spreading it
      if (Array.isArray(prevState)) {
        return [...prevState, newElement];
      } else {
        console.error("prevState is not an array:", prevState);
        return [newElement];
      }
    });
  
    setFormData(initVal);
  };

  // Function to delete element
  const deleteEl = (id) => {
    setData((prevState) => prevState.filter((val) => val.id !== id));
  };

  // Function to add element at specific pos and return arr
  const addAfter = (elArray, index, newEl) => {
    return [...elArray.slice(0, index + 1), newEl, ...elArray.slice(index + 1)];
  };

  // Function to duplicate element
  const duplicateElement = (elId, elType) => {
    let elIdx = data.findIndex((el) => el.id === elId);
    let newEl = {
      id: uuid(),
      value: null,
      type: elType,
      required: false,
    };
    let newArr = addAfter(data, elIdx, newEl);
    setData(newArr);
  };

  // Function to handle sorting of elements
  const handleOnChangeSort = ({ items }) => {
    setData(items);
  };

  // Function to Handle Input Values
  const handleValue = (id, e) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, value: e.target.value };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const handleLabelChange = (id, newLabel) => {
    setData((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, label: newLabel } : item
      )
    );
  };

  // Function to Handle Required
  const handleRequired = (id) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, required: !el.required };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Function to Handle Element Type
  const handleElType = (id, type) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, type: type };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Function to Handle Options
  const addOption = (id, newOption) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        const objVal = "options" in el ? el?.options : [];
        return { ...el, options: [...objVal, newOption] };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Function to Handle Date
  const handleDate = (id, dateVal) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, date: dateVal };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Function to Handle Time
  const handleTime = (id, dateVal) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, time: dateVal };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Function to Change Option Values
  const handleOptionValues = (elId, optionId, optionVal) => {
    let newArr = data.map((el) => {
      if (el.id === elId) {
        el?.options &&
          el?.options.map((opt) => {
            if (opt.id === optionId) {
              opt.value = optionVal;
            }
          });
        return el;
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // Function to Delete Option
  const deleteOption = (elId, optionId) => {
    let newArr = data.map((el) => {
      if (el.id === elId) {
        let newOptions =
          el?.options && el?.options.filter((opt) => opt.id !== optionId);
        return { ...el, options: newOptions };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const handleDownload = () => {
    const formMetadata = btoa(
      unescape(encodeURIComponent(JSON.stringify({ title, description, data })))
    );
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: title,
                  bold: true,
                  size: 52,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: description,
                  size: 38,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Form Metadata: ${formMetadata}`,
                  size: 0, // Hide the metadata text
                }),
              ],
              spacing: {
                after: 1200,
              },
            }),
            ...data.flatMap((item) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: item.label || "",
                    bold: true,
                    size: 32,
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              ...(item.options
                ? item.options.map(
                    (opt, index) =>
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `Option ${index + 1}: ${opt.value}`,
                            size: 28,
                          }),
                        ],
                        spacing: {
                          after: 100,
                        },
                      })
                  )
                : [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text:
                            item.value ||
                            (item.date
                              ? item.date.toString().slice(0, 10)
                              : "") ||
                            "",
                          size: 28,
                        }),
                      ],
                      spacing: {
                        after: 200,
                      },
                    }),

                    // change
                  ]),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "--------------------------------------------------------------------------------------------------------------------------------------",
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
            ]),
            ...images.flatMap((image) => [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: image.data,
                    type: "image/png/jpg/jpeg",
                    transformation: {
                      width: 400,
                      height: 300,
                    },
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
            ]),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "form_data.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px',
    //height: '100vh' // Full viewport height
  };

  const centeredDivStyle = {
    width: '65%',
    border: '1px solid #ccc', // Optional: for visibility
    padding: '5px', // Optional: for content padding
    boxSizing: 'border-box' // Ensures padding and border are included in the total width and height
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const metadata = await extractMetadataFromDoc(arrayBuffer);
      if (metadata) {
        setTitle(metadata.title || "Untitled Form");
        setDescription(metadata.description || "");
        setData(metadata.data || []);
      }
    }
  };

  const extractMetadataFromDoc = async (arrayBuffer) => {
    const doc = await mammoth.extractRawText({ arrayBuffer });
    const rawText = doc.value;
    const metadataMatch = rawText.match(/Form Metadata: (.*)/);

    if (metadataMatch && metadataMatch[1]) {
      try {
        const decodedMetadata = decodeURIComponent(
          escape(atob(metadataMatch[1]))
        );
        const formMetadata = JSON.parse(decodedMetadata);
        return formMetadata;
      } catch (error) {
        console.error("Error extracting metadata from DOCX:", error);
        throw error;
      }
    } else {
      throw new Error("Metadata not found in DOCX");
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/saveForm", {
        title,
        description,
        data,
      });
      if (response.data.id) {
        alert(`Form saved! ID: ${response.data.id}`);
      }
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Error saving form data");
    }
  };

  // const handleView = async () => {
  //   try {
  //     if (location.state) {
  //       setTitle(location.state.titlen);
  //       console.log(location.state.titlen);
  //       setDescription(location.state.descriptionn);
  //       console.log(location.state.descriptionn);
  //       setData(location.state.datan);
  //       console.log(location.state.datan);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching form:", error);
  //     alert("Error fetching form data");
  //   }
  // };

  // const handleView = async () => {
  //   const formId = prompt("Enter the Form ID to view:");
  //   if (formId) {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/getForm/${formId}`
  //       );
  //       if (response.data) {
  //         setTitle(response.data.title);
  //         setDescription(response.data.description);
  //         setData(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching form:", error);
  //       alert("Error fetching form data");
  //     }
  //   }
  // };

  const renderElements = ({ item }) => {
    switch (item.type) {
      case "text":
        return (
          <TextFieldInput 
          style={{margin: "5px",}}
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
            handleLabelChange={handleLabelChange}
          />
        );
      case "textarea":
        return (
          <TextArea
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
            handleLabelChange={handleLabelChange}
          />
        );
      case "number":
        return (
          <NumberInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
            handleLabelChange={handleLabelChange}
          />
        );
      case "radio":
        return (
          <RadioInput
            item={item}
            deleteEl={deleteEl}
            handleElType={handleElType}
            addOption={addOption}
            handleOptionValues={handleOptionValues}
            deleteOption={deleteOption}
            duplicateElement={duplicateElement}
            handleLabelChange={handleLabelChange}
          />
        );
      case "checkbox":
        return (
          <CheckboxInput
            item={item}
            deleteEl={deleteEl}
            handleElType={handleElType}
            addOption={addOption}
            handleOptionValues={handleOptionValues}
            deleteOption={deleteOption}
            duplicateElement={duplicateElement}
            handleLabelChange={handleLabelChange}
          />
        );
      // case "date":
      //   return (
      //     <DateInput
      //       item={item}
      //       deleteEl={deleteEl}
      //       handleElType={handleElType}
      //       handleDate={handleDate}
      //       duplicateElement={duplicateElement}
      //       handleLabelChange={handleLabelChange}
      //     />
      //   );
      // case "time":
      // return (
      //   <TimeInput
      //     item={item}
      //     handleValue={handleValue}
      //     deleteEl={deleteEl}
      //     handleElType={handleElType}
      //     handleTime={handleTime}
      //     duplicateElement={duplicateElement}
      //   />
      // );
      case "uploadfile":
        return (
          <UploadFile
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
            handleImageUpload={handleImageUpload}
          />
        );
      default:
        return <Fragment></Fragment>;
    }
  };

  console.log(data);

  return (
    <div  style={{
      color: "1e293b",
      borderColor: "white",
      backgroundColor: "#e0e6ee",
      height: '100vh',
    }} >
    <div style={containerStyle}>
    <div className="bg-blueGray-50 m-1 rounded" style={centeredDivStyle}>
      <Fragment style={{
                              color: "1e293b",
                              borderColor: "white",
                              backgroundColor: "#334155",
                            }}>
        <Grid container spacing={1} direction="row" justifyContent="center">
          <Grid item md={6}>
            <h1
              style={{
                fontSize: "30px",
                marginBottom: "12px",
                marginTop: "12px",
                fontFamily: "sans-serif",
              }}
            >
              {tName}
            </h1>
            <Header
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
            />
            <Nestable
              items={items}
              renderItem={renderElements}
              maxDepth={1}
              onChange={handleOnChangeSort}
            />
          </Grid>
          <Grid item md={1}>
            <Tooltip title="Add Element" aria-label="add-element">
              <IconButton
                aria-label="add-element"
                onClick={addElement}
                sx={{ position: "sticky", top: 30 }}
              >
                <AddCircleOutlineOutlinedIcon color="#c8c7c7" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Fragment>
     
      
      <Box display="flex" justifyContent="center" mt={2} mr={9}>
        <Button
          variant="outlined"
          startIcon={<DownloadRoundedIcon />}
          onClick={handleDownload}
          sx={{ fontFamily: "JetBrains Mono", ml: 2 }}
          style={{
                              color: "white",
                              borderColor: "white",
                              backgroundColor: "#1e293b",
                            }}
        >
          Save as Doc
        </Button>
        <Tooltip title="Upload Word File" placement="top">
          <Button component="label"  variant="outlined" sx={{ fontFamily: "JetBrains Mono", ml: 2 }} style={{
                              color: "white",
                              borderColor: "white",
                              backgroundColor: "#1e293b",
                            }}>
            Upload A Doc
            <input
              type="file"
              accept=".docx"
              hidden
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </Button>
        </Tooltip>
        <Button
          variant="outlined"
          startIcon={<ArchiveIcon />}
          onClick={handleSave}
          sx={{ fontFamily: "JetBrains Mono", ml: 2 }}
          style={{
                              color: "white",
                              borderColor: "white",
                              backgroundColor: "#1e293b",
                            }}
        >
          Save
        </Button>
        {/*<Button
          variant="contained"
          startIcon={<UnarchiveIcon />}
          onClick={handleView}
          sx={{ fontFamily: "JetBrains Mono", ml: 2 }}
        >
          View
        </Button>*/}
      </Box>
      </div>
      </div>
    </div>
  );
};

export default FormBuilder;
