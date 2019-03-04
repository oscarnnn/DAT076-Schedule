import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SideNavBar from "./components/navbar/SideNavBar";
import Schedule from "./components/schedule/Schedule";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Members from "./components/members/Members";
import AdminPage from "./components/admin/AdminPage";
import "./styles/App.css"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <SideNavBar/>
          <main style={{height: "100vh"}}>
            <Switch>
              <Route exact path="/" component={Schedule} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/members" component={Members} />
              <Route path="/admin" component={AdminPage} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
