// import React, { Component, useState } from "react";
// // import "./styles/login.css"

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();

//     console.log(email, password);
//     fetch("http://localhost:5000/login-user", {
//       method: "POST",
//       crossDomain: true,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data, "userRegister");
//         if (data.status === "ok") {
//           alert("login successful");
//           window.localStorage.setItem("token", data.data);
//           window.localStorage.setItem("loggedIn", true);

//           window.location.href = "./userDetails";
//         }
//       });
//   }

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-inner">
//         <form onSubmit={handleSubmit}>
//           <h3>Sign In</h3>

//           <div className="mb-3">
//             <label>Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <div className="custom-control custom-checkbox">
//               <input
//                 type="checkbox"
//                 className="custom-control-input"
//                 id="customCheck1"
//               />
//               <label className="custom-control-label" htmlFor="customCheck1">
//                 Remember me
//               </label>
//             </div>
//           </div>

//           <div className="d-grid">
//             <button type="submit" className="btn btn-primary">
//               Submit
//             </button>
//           </div>
//           <p className="forgot-password text-right">
//             <a href="/sign-up">Sign Up</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          window.location.href = "./userDetails";
        } else {
          alert("Login Failed! Please Try Again");
        }
      });
  }

  const styles = {
    body: {
      backgroundColor: "#f0f8ff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: 0,
      fontFamily: "Arial, sans-serif",
    },
    authWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    authInner: {
      background: "rgb(255, 255, 255)",
      padding: "47px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "500px",
      width: "500px",
    },
    h3: {
      textAlign: "center",
      color: "#007bff",
    },
    mb3: {
      color: "#007bff",
      marginTop: "20px",
    },
    btnPrimary: {
      backgroundColor: "#007bff",
      borderColor: "#007bff",
    },
    btnPrimaryHover: {
      backgroundColor: "#0056b3",
      borderColor: "#004085",
    },
    customControlLabel: {
      color: "#007bff",
    },
    forgotPassword: {
      textAlign: "center",
      marginTop: "20px",
    },
    forgotPasswordLink: {
      color: "#007bff",
    },
    dropdownGroup: {
      marginTop: "20px",
    },
    dropdownGroupLabel: {
      color: "#007bff",
      display: "block",
      marginBottom: "5px",
    },
    formControl: {
      width: "100%",
      padding: "10px",
      marginBottom: "20px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.authWrapper}>
        <div style={styles.authInner}>
          <form onSubmit={handleSubmit}>
            <h3 style={styles.h3}>Sign In</h3>

            <div className="mb-3" style={styles.mb3}>
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                style={styles.formControl}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3" style={styles.mb3}>
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                style={styles.formControl}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3" style={styles.mb3}>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customCheck1"
                  style={styles.customControlLabel}
                >
                  Remember me
                </label>
              </div>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                style={styles.btnPrimary}
                onMouseOver={(e) => (e.target.style = styles.btnPrimaryHover)}
                onMouseOut={(e) => (e.target.style = styles.btnPrimary)}
              >
                Submit
              </button>
            </div>
            <p className="forgot-password" style={styles.forgotPassword}>
              <a href="/sign-up" style={styles.forgotPasswordLink}>
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
