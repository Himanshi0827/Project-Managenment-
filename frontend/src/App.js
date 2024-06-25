import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Landingpage from "./screens/Landingpage";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import UserDetails from "./components/userDetails";
import Landing from "views/Landing";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Profile from "views/Profile.js";
import Index from "views/Index.js";

import Templates from "./Templates";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/template" element={<Templates />} />
          <Route path="/admin" component={Admin} />
          {/* add routes without layouts */}
          <Route path="/profile" exact component={Profile} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
