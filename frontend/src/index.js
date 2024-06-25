import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";

// components and screens from the second project
import UserDetails from "components/userDetails/userDetails";
import Templates from "components/Forms/Templates";
import Grid from "components/Forms/grid";
import Temp from "components/Forms/temp";
import ABC from "ABC";
import FormBuilder from "components/FormBuilder";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Routes from the first project */}
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route path="/landing" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={Index} />

        {/* Forms */}
        <Route path="/template" exact component={Templates} />
        <Route path="/temp" exact component={Temp} />
        <Route path="/formGrid" exact component={Grid} />
        {/*<Route path="/form" exact component={ABC} />*/}
        <Route path="/form" exact component={FormBuilder} />
        
        {/* Routes from the second project */}
        <Route path="/userdetails" exact component={UserDetails} />

        {/* Combined landing page */}

        {/* Add redirect for any unmatched route */}
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
