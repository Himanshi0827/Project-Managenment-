// import React, { useState } from "react";
// import { Link } from "react-router-dom";


// export default function Register() {
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userType, setUserType] = useState("");
//   const [secretKey, setSecretKey] = useState("");

//   const handleSubmit = (e) => {
//     if (userType === "Admin" && secretKey !== "Admin") {
//       e.preventDefault();
//       alert("Invalid Admin");
//     } else {
//       e.preventDefault();

//       console.log(fname, lname, email, password);
//       fetch("http://localhost:5000/register", {
//         method: "POST",
//         crossDomain: true,
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//           fname,
//           email,
//           lname,
//           password,
//           userType,
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data, "userRegister");
//           if (data.status === "ok") {
//             alert("Registration Successful");
//           } else {
//             alert("Something went wrong");
//           }
//         });
//     }
//   };

//   return (
//     <>
//       <div className="container mx-auto px-4 h-full">
//         <div className="flex content-center items-center justify-center h-full">
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
//               <div className="rounded-t mb-0 px-6 py-6">
//                 <div className="text-center mb-3">
//                   <h6 className="text-blueGray-500 text-sm font-bold">
//                     Sign up with
//                   </h6>
//                 </div>
//                 <div className="btn-wrapper text-center">
//                   <button
//                     className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
//                     type="button"
//                   >
//                     <img
//                       alt="..."
//                       className="w-5 mr-1"
//                       src={require("assets/img/github.svg").default}
//                     />
//                     Github
//                   </button>
//                   <button
//                     className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
//                     type="button"
//                   >
//                     <img
//                       alt="..."
//                       className="w-5 mr-1"
//                       src={require("assets/img/google.svg").default}
//                     />
//                     Google
//                   </button>
//                 </div>
//                 <hr className="mt-6 border-b-1 border-blueGray-300" />
//               </div>
//               <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
//                 <div className="text-blueGray-400 text-center mb-3 font-bold">
//                   <small>Or sign up with credentials</small>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                   <div className="relative w-full mb-3">
//                     <label
//                       htmlFor="role-select"
//                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                     >
//                       Select Role
//                     </label>
//                     <select
//                       id="role-select"
//                       className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                       value={userType}
//                       onChange={(e) => setUserType(e.target.value)}
//                     >
//                       <option value="">--Please choose an option--</option>
//                       <option name="UserType" value="Project Director">
//                         Project Director
//                       </option>
//                       <option name="UserType" value="Project Manager">
//                         Project Manager
//                       </option>
//                       <option name="UserType" value="Analyst">
//                         Analyst
//                       </option>
//                       <option name="UserType" value="Auditor">
//                         Auditor
//                       </option>
//                       <option name="UserType" value="Admin">
//                         Admin
//                       </option>
//                     </select>
//                   </div>
//                   {userType === "Admin" ? (
//                     <div className="relative w-full mb-3">
//                       <label
//                         className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                       >
//                         Secret Key
//                       </label>
//                       <input
//                         type="text"
//                         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         placeholder="Secret Key"
//                         onChange={(e) => setSecretKey(e.target.value)}
//                       />
//                     </div>
//                   ) : null}

//                   <div className="relative w-full mb-3">
//                     <label
//                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                       htmlFor="grid-password"
//                     >
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                       placeholder="First Name"
//                       onChange={(e) => setFname(e.target.value)}
//                     />
//                   </div>
//                   <div className="relative w-full mb-3">
//                     <label
//                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                       htmlFor="grid-password"
//                     >
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                       placeholder="Last Name"
//                       onChange={(e) => setLname(e.target.value)}
//                     />
//                   </div>

//                   <div className="relative w-full mb-3">
//                     <label
//                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                       htmlFor="grid-password"
//                     >
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                       placeholder="Email"
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>

//                   <div className="relative w-full mb-3">
//                     <label
//                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                       htmlFor="grid-password"
//                     >
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                       placeholder="Password"
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>

//                   <div>
//                     <label className="inline-flex items-center cursor-pointer">
//                       <input
//                         id="customCheckLogin"
//                         type="checkbox"
//                         className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
//                       />
//                       <span className="ml-2 text-sm font-semibold text-blueGray-600">
//                         I agree with the{" "}
//                         <a
//                           href="#pablo"
//                           className="text-lightBlue-500"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           Privacy Policy
//                         </a>
//                       </span>
//                     </label>
//                   </div>

//                   <div className="text-center mt-6">
//                     <button
//                       className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
//                       type="submit"
//                     >
//                       Create Account
//                     </button>
//                     <div className="w-1/3 text-right">
//                       <Link to="/auth/login" className="text-black-200">
//                         <small>Already have an account?</small>
//                       </Link>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/roles")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setRoles(data.roles);
        } else {
          alert("Failed to fetch roles");
        }
      })
      .catch((error) => {
        console.error('Error fetching roles:', error);
        alert("Failed to fetch roles");
      });
  }, []);

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

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  {/* <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/github.svg").default}
                    />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button> */}
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      htmlFor="role-select"
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    >
                      Select Role
                    </label>
                    <select
                      id="role-select"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role._id} value={role.userRole}>
                          {role.userRole}
                        </option>
                      ))}
                    </select>
                  </div>
                  {userType === "Admin" ? (
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      >
                        Secret Key
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Secret Key"
                        onChange={(e) => setSecretKey(e.target.value)}
                      />
                    </div>
                  ) : null}

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="First Name"
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Last Name"
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link
                  to="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/login" className="text-blueGray-200">
                  <small>Already have an account?</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
