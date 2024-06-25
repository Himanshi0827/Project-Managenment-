// import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import "./styles/landingpage.css";
// import Navbar from "../components/Navbar";

// const Landingpage = () => {
//   return (
//     <div fluid className="landingpage d-flex flex-column justify-content-center align-items-center">
//     <Navbar />
//       <h1 className="display-1 fw-bold mb-4">
//         Project Management Tool
//       </h1>
//       <p className="lead text-muted">
//         Manage your client requirements efficiently and effectively.
//       </p>

//       <div className="d-flex justify-content-center mt-4">
//         <button className="btn mx-3" href="/userDetails" >
//           Register
//         </button>
//         <button className="btn mx-3 " href="/auth/login">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Landingpage;

// import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import "./styles/landingpage.css";
// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom

// const Landingpage = () => {

//   return (
//     <div fluid className="landingpage d-flex flex-column justify-content-center align-items-center">
//       <Navbar />
//       <h1 className="display-1 fw-bold mb-4">
//         Project Management Tool
//       </h1>
//       <p className="lead text-muted">
//         Manage your client requirements efficiently and effectively.
//       </p>

//       <div className="d-flex justify-content-center mt-4">
//         <Link to="/sign-up" className="btn mx-3">  {/* Use Link component */}
//           Register
//         </Link>
//         <Link to="/auth/login" className="btn mx-3">  {/* Use Link component */}
//           Login
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Landingpage;

// import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import "./styles/landingpage.css";
// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom

// const Landingpage = () => {
//   const [projects, setProjects] = useState([
//     { id: 1, name: 'Project 1', client: 'Client 1', status: 'CP', due: '2023-06-15' },
//     { id: 2, name: 'Project 2', client: 'Client 2', status: 'CP', due: '2023-07-01' },
//     // Add more projects as needed
//   ]);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);

//   const handleEditClick = (project) => {
//     setSelectedProject(project);
//     setShowEditForm(true);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     setShowEditForm(false);
//   };

//   return (
//     <>
//       <div>
//       <h2>Project Manager</h2>
//       <div>
//         <h3>List of Projects</h3>
//         {projects.map((project) => (
//           <div key={project.projectNumber}>
//             <p>
//               {project.name} | {project.client} | {project.projectStatus} | CP{' '}
//               <button onClick={() => handleEditClick(project)}>Edit</button>
//             </p>
//             <button>Queries</button>
//           </div>
//         ))}
//         <button>Save to Excel</button>
//       </div>
//       {showEditForm && (
//         <div>
//           <h3>Edit Project: {selectedProject.name}</h3>
//           <form onSubmit={handleFormSubmit}>
//             <label>
//               Project Name:
//               <input type="text" defaultValue={selectedProject.name} />
//             </label>
//             <label>
//               Client:
//               <input type="text" defaultValue={selectedProject.client} />
//             </label>
//             <label>
//               Due Date:
//               <input type="date" defaultValue={selectedProject.due} />
//             </label>
//             <label>
//               Requirements:
//               <textarea />
//             </label>
//             <button type="submit">Save</button>
//             <button type="button" onClick={() => setShowEditForm(false)}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </div>

//     <div fluid className="landingpage d-flex flex-column justify-content-center align-items-center">
//       <Navbar />
//       <h1 className="display-1 fw-bold mb-4">
//         Project Management Tool
//       </h1>
//       <p className="lead text-muted">
//         Manage your client requirements efficiently and effectively.
//       </p>

//       <div className="d-flex justify-content-center mt-4">
//         <Link to="/sign-up" className="btn mx-3">  {/* Use Link component */}
//           Register
//         </Link>
//         <Link to="/auth/login" className="btn mx-3">  {/* Use Link component */}
//           Login
//         </Link>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Landingpage;

import Navbar from "../components/Navbar";
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/landingpage.css";

//import './Landingpage.css'; // Add your custom styles

const Landingpage = () => {
  return (
    <div className="main-wrapper">
      <header className="header">
        <div className="container">
          <div className="header-main d-flex justify-content-between align-items-center">
            <div className="header-logo">
              <Link to="/">
                Project Management <span>Portal</span>
              </Link>
            </div>
            <button
              type="button"
              className="header-hamburger-btn js-header-manu-toggler"
            >
              <span></span>
            </button>
            <div className="header-backdrop js-header-backdrop"></div>
            <nav className="header-menu js-header-manu">
              <button
                type="button"
                className="header-close-btn js-header-manu-toggler"
              >
                <i className="fas fa-times"></i>
              </button>
              <ul className="menu">
                <li className="menu-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="menu-item">
                  <Link to="/auth/login">Login</Link>
                </li>
                <li className="menu-item">
                  <Link to="/sign-up">Registration</Link>
                </li>
                <li className="menu-item">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <section className="banner-section d-flex align-items-center position-relative">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="banner-text">
                <h2 className="mb-3">Project Management System.</h2>
                <h1 className="mb-3 text-capitalize">
                  best for project Management and cp calculation
                </h1>
                <p className="mb-4">
                  Manage your client requirements efficiently and effectively.
                </p>
                <Link to="/auth/login" className="btn btn-theme">
                  Login
                </Link>

                <Link to="/sign-up" className="btn btn-theme mx-5">
                  Register
                </Link>
              </div>
            </div>
            <div className="col-md-6 order-first order-md-last mb-5 mb-md-0">
              <div className="banner-img">
                <div className="circular-img">
                  <div className="circular-img-inner">
                    <div className="circular-img-circle">
                      <img
                        src="./img/downloisag-nad-removebg-preview.png"
                        alt="banner img"
                        className="centered-logo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="fun-facts-section">
        <div className="container">
          <div className="box py-2">
          <div fluid className="landingpage d-flex flex-column justify-content-center align-items-center">
       <Navbar />
       <h1 className="display-1 fw-bold mb-4">
         Project Management Tool
       </h1>
       <p className="lead text-muted">
         Manage your client requirements efficiently and effectively.
       </p>

       <div className="d-flex justify-content-center mt-4">
         <Link to="/sign-up" className="btn mx-3">  
           Register
         </Link>
         <Link to="/auth/login" className="btn mx-3"> 
           Login
         </Link>
       </div>
     </div>
             
          </div>
        </div>
      </section> */}

      <section className="testimonials-section section-padding position-relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="section-title text-center">
                <h2 className="title">Guide feedback</h2>
                <p className="sub-title">what our guides say</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="img-box rounded-circle position-relative">
                <img
                  src="./img/testimonial/1.png"
                  className="w-100 js-testimonial-img rounded-circle"
                  alt="testimonial img"
                />
              </div>
              <div
                id="carouselOne"
                className="carousel slide text-center"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner mb-4">
                  <div
                    className="carousel-item active"
                    data-js-testimonial-img="img/testimonial/1.png"
                  >
                    <div className="testimonials-item">
                      <p className="text-1">
                        The team had done the great work in the backend also in
                        the frontend and also completed the project in less
                        time.
                      </p>
                      <h3>Dr. Yagnesh Vyas</h3>
                      <p className="text-2">Project Manager</p>
                    </div>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselOne"
                  data-bs-slide="prev"
                >
                  <i className="fas fa-arrow-left"></i>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselOne"
                  data-bs-slide="next"
                >
                  <i className="fas fa-arrow-right"></i>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bai-section section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-25">
              <div className="box">
                <div className="row align-items-center">
                  <div className="col-md-17 align-items-center">
                    <div className="section-title m-0">
                      <h2 className="title">Organization contact here</h2>
                      <p className="sub-title">Become Program Organizer</p>
                      <h2 className="title">Which includes the</h2>
                    </div>
                    <Link to="/sign-up" className="btn btn-theme">
                      apply now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="section-title text-center">
                <h2 className="title">Team Members</h2>
                <p className="sub-title">Introduction to Team Members</p>
              </div>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-md-6 col-lg-4">
              <div className="team-member">
                <div className="img-box">
                  <img
                    src="./img/team/1.jpg"
                    className="img-fluid"
                    alt="Team member"
                  />
                </div>
                <h3>Himanshi Singh</h3>
                <p>Developer</p>
              </div>
            </div>
            <br></br>
            <div className="col-md-6 col-lg-4">
              <div className="team-member">
                <div className="img-box">
                  <img
                    src="./img/team/3.jpg"
                    className="img-fluid"
                    alt="Team member"
                  />
                </div>
                <h3>Smit Patel</h3>
                <p>Developer</p>
              </div>
            </div>
            <br></br>
            <div className="col-md-6 col-lg-4">
              <div className="team-member">
                <div className="img-box">
                  <img
                    src="./img/team/4.jpg"
                    className="img-fluid"
                    alt="Team member"
                  />
                </div>
                <h3>Aditya Patel</h3>
                <p>Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="row justify-content-between">
              <div className="col-md-3">
                <div className="footer-logo">
                  <a href="/">
                    Project Management<span>Portal</span>
                  </a>
                </div>
                <p className="footer-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Iusto, dolorum!
                </p>
              </div>
              <div className="col-md-3">
                <h4>Contact</h4>
                <ul className="footer-list">
                  <li>
                    <a href="#">info@example.com</a>
                  </li>
                  <li>
                    <a href="#">+1 234 567 890</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <h4>Follow us</h4>
                <ul className="footer-list">
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">LinkedIn</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;
