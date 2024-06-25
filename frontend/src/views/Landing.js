import React from "react";
import { Link } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Landing() {
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                  BISAG-N
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                  Bhaskaracharya National Institute for Space Applications and Geo-informatics
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
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
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Satelite Communication</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    To promote and facilitate the use of satelite 
                    broadcasting network for distant interactive training, education and extensions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Software Development</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    To provide low-cost Decision Support System, Geo-informatics 
                    applications (desktop as well as web based) to user for wider usage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Education, Research and Training</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    To provide education, research and training facilities to 
                    promote a number of end users through Academy for Geo-informatics.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Working with us is a pleasure
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Bhaskaracharya National Institute for Space Applications and Geo-informatics BISAG-N is an Autonomous Scientific Society registered under the Societies Registration
                
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                 Act, 1860 under the MeitY, Government of India to undertake technology development & management, research & development, 
                facilitate National & International cooperation, capacity building and support technology transfer & entrepreneurship development in area of geo-spatial technology.
                </p>
                <Link to="/" className="font-bold text-blueGray-700 mt-8">
                  Check about us
                </Link>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src="data:image/png;base64,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"
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
                    BISAG-N Domain 
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                    BISAG-N has three main domain areas: Satellite Communication, 
                    Geo-informatics and Geo-spatial technology.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
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
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://bisag-n.gov.in/images/b/2.jpg"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">Visions</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  To empower and serve the Nation through development of Space and Geo-spatial Technologies, its applications/solutions/services in accordance to governance principles for socio-economic welfare of the Society.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Carefully crafted components
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Amazing page examples
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="far fa-paper-plane"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Dynamic components
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">Here are our heroes</h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record maximum.
                </p>
              </div>
            </div>
            <div className="flex flex-row
            ">
              <div className="w-full md:w-1/3 lg:w-3/9 lg:mb-0 mb-12 px-4 px-4 text mx-5">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-1-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center px-4 text">
                    <h5 className="text-xl font-bold">Smit Patel</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                      <button
                        className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-2-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Romina Hadid</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Marketing Specialist
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="w-full md:w-1/3 lg:w-3/9 lg:mb-0 mb-12 px-4 px-4 text">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-3-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center px-4 text">
                    <h5 className="text-xl font-bold">Himanshi Singh</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      UI/UX Designer Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 lg:w-3/9 lg:mb-0 mb-12 px-4 px-4 text">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-4-470x470.png").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center px-4 text">
                    <h5 className="text-xl font-bold">Aditya Patel</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
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
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Build something
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                  Put the potentially record low maximum sea ice extent tihs
                  year down to low ice. According to the National Oceanic and
                  Atmospheric Administration, Ted, Scambos.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  Excelent Services
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Grow your market
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Launch time
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Want to work with us?
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                      Complete this form and we will get back to you in 24
                      hours.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
