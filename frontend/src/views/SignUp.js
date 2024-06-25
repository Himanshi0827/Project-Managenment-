import React, { useState } from "react";

export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleSubmit = (e) => {
    if (userType === "Admin" && secretKey !== "Admin") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();

      console.log(fname, lname, email, password);
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          email,
          lname,
          password,
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status === "ok") {
            alert("Registration Successful");
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  const styles = {
    body: {
      backgroundColor: '#f0f8ff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 30,
      fontFamily: 'Arial, sans-serif',
    },
    authWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    authInner: {
      background: 'rgb(255, 255, 255)',
      padding: '47px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '500px',
      width: '500px',
    },
    h3: {
      textAlign: 'center',
      color: '#007bff',
    },
    mb3: {
      color: '#007bff',
      marginTop: '20px',
    },
    btnPrimary: {
      backgroundColor: '#007bff',
      borderColor: '#007bff',
    },
    btnPrimaryHover: {
      backgroundColor: '#0056b3',
      borderColor: '#004085',
    },
    customControlLabel: {
      color: '#007bff',
    },
    forgotPassword: {
      textAlign: 'center',
      marginTop: '20px',
    },
    forgotPasswordLink: {
      color: '#007bff',
    },
    dropdownGroup: {
      marginTop: '20px',
    },
    dropdownGroupLabel: {
      color: '#007bff',
      display: 'block',
      marginBottom: '5px',
    },
    formControl: {
      width: '100%',
      padding: '10px',
      marginBottom: '20px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
  };

  return (
    <div>
    <div style={styles.body}>
   
      <div style={styles.authWrapper}>
      
        <div style={styles.authInner}>
          <form onSubmit={handleSubmit}>
            <h3 style={styles.h3}>Sign Up</h3>
            <div className="dropdown-group" style={styles.dropdownGroup}>
              <label htmlFor="role-select" style={styles.dropdownGroupLabel}>Select Role</label>
              <select
                id="role-select"
                className="form-control"
                style={styles.formControl}
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="">--Please choose an option--</option>
                <option name="UserType" value="Project Director">Project Director</option>
                <option name="UserType" value="Project Manager">Project Manager</option>
                <option name="UserType" value="Analyst">Analyst</option>
                <option name="UserType" value="Auditor">Auditor</option>
                <option name="UserType" value="Admin">Admin</option>
              </select>
            </div>
            {userType === "Admin" ? (
              <div className="mb-3" style={styles.mb3}>
                <label>Secret Key</label>
                <input
                  type="text"
                  className="form-control"
                  style={styles.formControl}
                  placeholder="Secret Key"
                  onChange={(e) => setSecretKey(e.target.value)}
                />
              </div>
            ) : null}

            <div className="mb-3" style={styles.mb3}>
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                style={styles.formControl}
                placeholder="First name"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>

            <div className="mb-3" style={styles.mb3}>
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                style={styles.formControl}
                placeholder="Last name"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>

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

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                style={styles.btnPrimary}
                onMouseOver={(e) => (e.target.style = styles.btnPrimaryHover)}
                onMouseOut={(e) => (e.target.style = styles.btnPrimary)}
              >
                Sign Up
              </button>
            </div>
            <p className="forgot-password" style={styles.forgotPassword}>
              Already registered <a href="/auth/login" style={styles.forgotPasswordLink}>sign in?</a>
            </p>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}
