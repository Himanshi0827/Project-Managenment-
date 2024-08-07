// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import mammoth from "mammoth";
// import { read, utils } from "xlsx";

// const ViewFile = () => {
//   const { id } = useParams();
//   const [fileContent, setFileContent] = useState("");
//   const [fileType, setFileType] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchFile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/files/${id}`, {
//           responseType: "blob",
//         });
//         const contentType = response.headers["content-type"];
//         setFileType(contentType);

//         if (
//           contentType === "application/pdf" ||
//           contentType.startsWith("image/") ||
//           contentType.startsWith("video/")
//         ) {
//           setFileContent(URL.createObjectURL(response.data));
//         } else if (
//           contentType ===
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//         ) {
//           const arrayBuffer = await response.data.arrayBuffer();
//           const result = await mammoth.convertToHtml({ arrayBuffer });
//           setFileContent(result.value);
//         } else if (
//           contentType ===
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//         ) {
//           const arrayBuffer = await response.data.arrayBuffer();
//           const workbook = read(arrayBuffer, { type: "array" });
//           const sheet = workbook.Sheets[workbook.SheetNames[0]];
//           const html = formatExcelToHTML(sheet);
//           setFileContent(html);
//         } else {
//           setFileContent(URL.createObjectURL(response.data));
//         }

//         setLoading(false);
//       } catch (fetchError) {
//         console.error("Error fetching file:", fetchError);
//         setError("Error fetching file");
//         setLoading(false);
//       }
//     };
//     fetchFile();
//   }, [id]);

//   const formatExcelToHTML = (sheet) => {
//     const htmlTable = [];
//     const range = utils.decode_range(sheet["!ref"]);

//     htmlTable.push("<table style='border-collapse: collapse;'>");

//     for (let row = range.s.r; row <= range.e.r; row++) {
//       htmlTable.push("<tr>");

//       for (let col = range.s.c; col <= range.e.c; col++) {
//         const cellRef = utils.encode_cell({ r: row, c: col });
//         const cell = sheet[cellRef] ? sheet[cellRef].v : "";
//         const style = sheet[cellRef] ? sheet[cellRef].s : "";

//         htmlTable.push(`<td style='border: 1px solid #ccc; padding: 5px;'>${cell}</td>`);
//       }

//       htmlTable.push("</tr>");
//     }

//     htmlTable.push("</table>");

//     return htmlTable.join("");
//   };

//   if (loading) {
//     return <p>Loading file...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   const renderFileContent = () => {
//     if (fileType.startsWith("image/")) {
//       return (
//         <img
//           src={fileContent}
//           alt="file content"
//           style={{ maxWidth: "100%" }}
//         />
//       );
//     } else if (fileType === "application/pdf") {
//       return (
//         <iframe
//           src={fileContent}
//           title="PDF Viewer"
//           width="100%"
//           height="600px"
//         />
//       );
//     } else if (fileType.startsWith("video/")) {
//       return (
//         <video controls width="100%">
//           <source src={fileContent} type={fileType} />
//         </video>
//       );
//     } else if (
//       fileType ===
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     ) {
//       return (
//         <div
//           dangerouslySetInnerHTML={{ __html: fileContent }}
//           style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}
//         />
//       );
//     } else if (
//       fileType ===
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     ) {
//       return (
//         <div
//           dangerouslySetInnerHTML={{ __html: fileContent }}
//           style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "4px", overflowX: "auto" }}
//         />
//       );
//     } else {
//       return (
//         <a href={fileContent} download>
//           Download File
//         </a>
//       );
//     }
//   };

//   return (
//     <div>
//       <h2>View File</h2>
//       {renderFileContent()}
//     </div>
//   );
// };

// export default ViewFile;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import mammoth from "mammoth";
import { read, utils } from "xlsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ViewFile = () => {
  const { id } = useParams();
  const [fileContent, setFileContent] = useState("");
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/files/${id}`, {
          responseType: "blob",
        });
        const contentType = response.headers["content-type"];
        setFileType(contentType);

        if (
          contentType === "application/pdf" ||
          contentType.startsWith("image/") ||
          contentType.startsWith("video/")
        ) {
          setFileContent(URL.createObjectURL(response.data));
        } else if (
          contentType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          const arrayBuffer = await response.data.arrayBuffer();
          const result = await mammoth.convertToHtml({ arrayBuffer });
          setFileContent(result.value);
        } else if (
          contentType ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          const arrayBuffer = await response.data.arrayBuffer();
          const workbook = read(arrayBuffer, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const html = formatExcelToHTML(sheet);
          setFileContent(html);
        } else {
          setFileContent(URL.createObjectURL(response.data));
        }

        setLoading(false);
      } catch (fetchError) {
        console.error("Error fetching file:", fetchError);
        setError("Error fetching file");
        setLoading(false);
      }
    };
    fetchFile();
  }, [id]);

  const formatExcelToHTML = (sheet) => {
    const htmlTable = [];
    const range = utils.decode_range(sheet["!ref"]);

    htmlTable.push("<table style='border-collapse: collapse;'>");

    for (let row = range.s.r; row <= range.e.r; row++) {
      htmlTable.push("<tr>");

      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellRef = utils.encode_cell({ r: row, c: col });
        const cell = sheet[cellRef] ? sheet[cellRef].v : "";
        const style = sheet[cellRef] ? sheet[cellRef].s : "";

        htmlTable.push(
          `<td style='border: 1px solid #ccc; padding: 5px;'>${cell}</td>`
        );
      }

      htmlTable.push("</tr>");
    }

    htmlTable.push("</table>");

    return htmlTable.join("");
  };

  if (loading) {
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
          marginTop: "40px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  const renderFileContent = () => {
    if (fileType.startsWith("image/")) {
      return (
        <img
          src={fileContent}
          alt="file content"
          style={{ maxWidth: "100%", borderRadius: "8px" }}
        />
      );
    } else if (fileType === "application/pdf") {
      return (
        <iframe
          src={fileContent}
          title="PDF Viewer"
          width="100%"
          height="600px"
          style={{ border: "1px solid #ccc", borderRadius: "8px" }}
        />
      );
    } else if (fileType.startsWith("video/")) {
      return (
        <video controls width="100%" style={{ borderRadius: "8px" }}>
          <source src={fileContent} type={fileType} />
        </video>
      );
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: fileContent }}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        />
      );
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: fileContent }}
          style=
          {{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            overflowX: "auto",
          }}
        />
      );
    } else {
      return (
        <a href={fileContent} download>
          Download File
        </a>
      );
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f6f8",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "800px",
        margin: "40px auto",
        textAlign: "center",
      }}
    >
      <h2>View File</h2>
      {renderFileContent()}
    </div>
  );
};

export default ViewFile;
