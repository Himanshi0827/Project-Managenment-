// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
// import { ClassRounded } from "@mui/icons-material";

// const FileList = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { state } = useLocation();
//   const requirementNumber = state.requirementNumber;

//   // useEffect(() => {
//   //   const fetchFiles = async () => {
//   //     try {

//   //       console.log(requirementNumber);
//   //       const response = await axios.get('http://localhost:5000/files');

//   //       setFiles(response.data);
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error('Error fetching files:', error);
//   //       setError('Error fetching files');
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchFiles();
//   // }, []);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         console.log(requirementNumber);
//         const response = await axios.get("http://localhost:5000/files", {
//           params: { requirementNumber }, // Pass requirementNumber as query parameter
//         });

//         setFiles(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching files:", error);
//         setError("Error fetching files");
//         setLoading(false);
//       }
//     };

//     if (requirementNumber) {
//       // Fetch files only if requirementNumber is available
//       fetchFiles();
//     }
//   }, [requirementNumber]); // Depend on requirementNumber to trigger the useEffect

//   if (loading) {
//     return <p>Loading files...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h2>Uploaded Files</h2>
//       <ul>
//         {files.map((file) => (
//           <li key={file._id}>
//             <Link to={`/view/${file._id}`}>
//               <button>View</button>
//             </Link>
//             <a
//               href={`http://localhost:5000/files/${file._id}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{ color: "white" }}
//             >
//               {file.filename}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FileList;













import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { state } = useLocation();
  const requirementNumber = state.requirementNumber;

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
    <div
      style={{
        padding: "20px",
        backgroundColor: "#e2e8f0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1><b>Uploaded Files</b></h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "12px 15px",
                border: "1px solid #ddd",
                backgroundColor: "#1e293b",
                color: "white",
                textAlign: "left",
              }}
            >
              Filename
            </th>
            <th
              style={{
                padding: "12px 15px",
                border: "1px solid #ddd",
                backgroundColor: "#1e293b",
                color: "white",
                textAlign: "left",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file._id}>
              <td
                style={{
                  padding: "12px 15px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                {/* <a
                  href={`http://localhost:5000/files/${file._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#007bff", textDecoration: "none" }}
                > */}
                  {file.filename}
                {/* </a> */}
              </td>
              <td
                style={{
                  padding: "12px 15px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                <Link to={`/view/${file._id}`}>
                  <button
                    className="ml-auto  bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                   
                  
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
  );
};

export default FileList;
