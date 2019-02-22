import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SideNavBar from "./components/navbar/SideNavBar";
import Schedule from "./components/schedule/Schedule";
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SideNavBar/>
          <Switch>
            <Route exact path='/'component={Schedule} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
