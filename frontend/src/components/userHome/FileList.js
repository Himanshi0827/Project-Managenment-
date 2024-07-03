import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { ClassRounded } from "@mui/icons-material";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { state } = useLocation();
  const requirementNumber = state.requirementNumber;

  // useEffect(() => {
  //   const fetchFiles = async () => {
  //     try {

  //       console.log(requirementNumber);
  //       const response = await axios.get('http://localhost:5000/files');

  //       setFiles(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching files:', error);
  //       setError('Error fetching files');
  //       setLoading(false);
  //     }
  //   };

  //   fetchFiles();
  // }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        console.log(requirementNumber);
        const response = await axios.get("http://localhost:5000/files", {
          params: { requirementNumber }, // Pass requirementNumber as query parameter
        });

        setFiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
        setError("Error fetching files");
        setLoading(false);
      }
    };

    if (requirementNumber) {
      // Fetch files only if requirementNumber is available
      fetchFiles();
    }
  }, [requirementNumber]); // Depend on requirementNumber to trigger the useEffect

  if (loading) {
    return <p>Loading files...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <Link to={`/view/${file._id}`}>
              <button>View</button>
            </Link>
            <a
              href={`http://localhost:5000/files/${file._id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              {file.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
