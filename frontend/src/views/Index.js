/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                BISAG-N - Project Management System.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Manage your client requirements efficiently and effectively.{" "}
                <a
                  href="https://tailwindcss.com/?ref=creativetim"
                  className="text-blueGray-600"
                  target="_blank"
                >
                  Project Management
                </a>
                . best for project Management and cp calculation
              </p>
              <div className="mt-12">
                <a
                  href="/auth/login"
                  target="_blank"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Login
                </a>
                <a
                  href="/auth/register"
                  className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  target="_blank"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/img/pattern_react.png").default}
          alt="..."
        />
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <img
                  alt="..."
                  src="data:image/jpeg;base64,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"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-lightBlue-500 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    BISAG-N Project Management System
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                    BISAG-N Project Management System is designed to streamline and enhance the efficiency of managing client requirements and project workflows. Built using the MERN stack (MongoDB, Express.js, React, Node.js), this system offers a comprehensive solution for project directors, managers, analysts, and auditors to collaborate and ensure successful project completion.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-sitemap"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Project Director Dashboard:
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Create and assign projects to project managers.
                        View all ongoing projects and their statuses.
                        Access CP (Critical Path) calculations for projects.
                        Monitor and oversee project progress.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-drafting-compass"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Project Manager Dashboard:
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        View and manage projects assigned by the project director.
                        Edit and update daily client requirement files.
                        Track project timelines and deliverables.
                        Communicate with the project team and stakeholders.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-newspaper"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Project Analyst Dashboard:</h6>
                      <p className="mb-4 text-blueGray-500">
                        Monitor different ongoing projects.
                        Analyze client requirements and project data.
                        Generate CP calculations based on project requirements.
                        Provide insights and recommendations to project directors and managers.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Auditor Dashboard:
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        View all projects and their current statuses.
                        Identify which managers are assigned to specific projects.
                        Ensure compliance with project management protocols.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto overflow-hidden pb-20">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-sitemap text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
              Efficient Requirement Management:
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
              Streamlined processes for managing and updating client requirements.
              </p>
              <ul>
              <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                          <i className="fab fa-html5"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-700 ">
                          <b>Enhanced Collaboration: </b>

                        </h4>
                        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                          Dashboards tailored for different roles facilitate
                          better communication and collaboration among team members.
                        </p>
                      </div>
                    </div>
                  </li>
              </ul>
              <div className="block pb-6">
                
              </div>
              {/* <a
                href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=nr-index"
                target="_blank"
                className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
              >
                View All{" "}
                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
              </a> */}
            </div>

            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-32">
              <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                <img
                  alt="..."
                  src={require("assets/img/component-btn.png").default}
                  className="w-full align-middle rounded absolute shadow-lg max-w-100-px z-3 left-145-px -top-29-px"
                />
                <img
                  alt="..."
                  src={require("assets/img/component-profile-card.png").default}
                  className="w-full align-middle rounded-lg absolute shadow-lg -top-160-px left-260-px max-w-210-px"
                />
                <img
                  alt="..."
                  src={require("assets/img/component-info-card.png").default}
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px -top-225-px left-40-px z-2"
                />
                <img
                  alt="..."
                  src={require("assets/img/component-info-2.png").default}
                  className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px"
                />
                {/* <img
                  alt="..."
                  src={require("assets/img/component-menu.png").default}
                  className="w-full align-middle rounded absolute shadow-lg max-w-580-px -left-20-px top-210-px"
                /> */}
                <img
                  alt="..."
                  src={require("assets/img/component-btn-pink.png").default}
                  className="w-full align-middle rounded absolute shadow-xl max-w-120-px left-195-px top-95-px"
                />
              </div>
            </div>
          </div>

          {/* <div className="flex flex-wrap items-center pt-32">
            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
              <div className="justify-center flex flex-wrap relative">
                <div className="my-4 w-full lg:w-6/12 px-4">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-red-600 shadow-lg rounded-lg text-center p-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/svelte.jpg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Svelte
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-lightBlue-500 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react.jpg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        ReactJS
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-blueGray-700 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nextjs.jpg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        NextJS
                      </p>
                    </div>
                  </a>
                </div>
                <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/js/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-yellow-500 shadow-lg rounded-lg text-center p-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/js.png"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        JavaScript
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/angular/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-red-700 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/angular.jpg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Angular
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/vue/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/vue.jpg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Vue.js
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-drafting-compass text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
              Technology Stack:
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
              MongoDB: Database for storing project data, user information, and logs.
Express.js: Backend framework for building the server-side application.
React: Frontend library for building dynamic and responsive user interfaces.
Node.js: Runtime environment for executing server-side code.
              </p>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                We created a set of Components that are dynamic and come to help
                you.
              </p>
              <div className="block pb-6">
               
              </div>
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=nr-index"
                target="_blank"
                className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
              >
                View all{" "}
                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
              </a>
            </div>
          </div> */}
        </div>

        <div className="container mx-auto px-4 pb-32 pt-48">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-5/12 ml-auto px-12 md:px-4">
              <div className="md:pr-12">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-file-alt text-xl"></i>
                </div>
                <h3 className="text-3xl font-semibold">
                  Advantages:
                </h3>
                {/* <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                
             

              
                
                
                Data-Driven Decisions: 
                Analysts provide critical insights and CP calculations
                 to aid in strategic decision-making.
                
               
                </p> */}
                <ul className="list-none mt-6">
                  {/* <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                          <i className="fas fa-fingerprint"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-700 ">
                          <b>Efficient Requirement Management:</b>

                        </h4>
                        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                          Streamlined processes for managing
                          and updating client requirements.
                        </p>
                      </div>
                    </div>
                  </li> */}
                
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                          <i className="fab fa-html5"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-700 ">
                          <b>Compliance and Oversight:</b>

                        </h4>
                        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                          Auditors can ensure projects adhere to established
                          protocols and standards.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                          <i className="fab fa-html5"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-700 ">
                          <b>Real-time Monitoring: </b>

                        </h4>
                        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                          Project directors and managers can monitor project
                          progress in real-time, ensuring timely interventions.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                          <i className="far fa-paper-plane"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-700 ">
                          <b>Data-Driven Decisions: </b>

                        </h4>
                        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                          Analysts provide critical insights and CP calculations
                          to aid in strategic decision-making.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-xl"
                style={{
                  transform:
                    "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                }}
                src={require("assets/img/documentation.png").default}
              />
            </div>
          </div>
        </div>

        <div className="justify-center text-center flex flex-wrap mt-24">
          <div className="w-full md:w-6/12 px-12 md:px-4">
            <h2 className="font-semibold text-4xl"> Pages</h2>
            <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-500">
              Project Management System
            </p>
          </div>
        </div>
      </section>

      <section className="block relative z-1 bg-blueGray-600">
        <div className="container mx-auto">
          <div className="justify-center flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4  -mt-24">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Login
                  </h5>
                  <Link to="/auth/login">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/login.jpg").default}
                      />
                    </div>
                  </Link>
                </div>

                {/* <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    About
                  </h5>
                  <Link to="/profile">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/profile.jpg").default}
                      />
                    </div>
                  </Link>
                </div> */}

                <div className="w-full lg:w-6/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Know more
                  </h5>
                  <Link to="/landing">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/landing.jpg").default}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blueGray-600 overflow-hidden">
        <div className="container mx-auto pb-64">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-64">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-code-branch text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                How It Works:
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400">
                {/*                 
                <a
                  href="https://tailwindcss.com/?ref=creativetim"
                  className="text-blueGray-300"
                  target="_blank"
                >
                  
                </a>{" "} */}
                <ol>
                  <li className="py-2">
                    User Registration and Login:

                    Users register and log in through the admin dashboard.
                    User roles (Project Director, Project Manager, Project Analyst, Auditor) are assigned.
                  </li>
                  <li className="py-2">Project Creation and Assignment:

                    Project directors create projects and assign them to project managers.
                    Project details and requirements are updated regularly.</li>
                  <li className="py-2">
                    Data Analysis and CP Calculation:

                    Project analysts monitor ongoing projects, analyze data, and generate CP calculations.
                    CP insights are shared with directors and managers for informed decision-making.
                  </li>
                  <li className="py-2">
                    Audit and Compliance:

                    Auditors review project statuses and manager assignments to ensure compliance.
                    Logs of all activities are maintained for transparency and accountability.
                  </li>
                </ol>


              </p>
              {/* <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-400">
                Get it free on Github and please help us spread the news with a
                Star!
              </p> */}
              {/* <a
                href="https://github.com/creativetimofficial/notus-react?ref=nr-index"
                target="_blank"
                className="github-star mt-4 inline-block text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
              >
                Github Star
              </a> */}
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative">
              <i className="fab fa-github text-blueGray-700 absolute -top-150-px -right-100 left-auto opacity-80 text-55"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
            <div className="w-full text-center lg:w-8/12">
              <p className="text-4xl text-center">
                <span role="img" aria-label="love">
                  😍
                </span>
              </p>
              <h3 className="font-semibold text-3xl">
                Conclusion:
              </h3>
              <p className="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
                The BISAG-N Project Management System is your all-in-one solution for managing projects efficiently and effectively. With specialized dashboards, real-time monitoring, and comprehensive data analysis, this system ensures that your projects are completed on time, within scope, and to the highest standards. Built with the robust and scalable MERN stack, it offers a seamless user experience and reliable performance.
              </p>
              <div className="sm:block flex flex-col mt-10">
                <a
                  href="/auth/login"
                  target="_blank"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Login
                </a>
                <a
                  href="/auth/register"
                  target="_blank"
                  className="github-star sm:ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                >
                  {/* <i className="fab fa-github text-lg mr-1"></i> */}
                  <span>Register</span>
                </a>
              </div>
              <div className="text-center mt-16"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
