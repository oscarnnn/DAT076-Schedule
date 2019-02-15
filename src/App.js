import React, { Component } from "react";
import SideNavBar from "./components/navbar/SideNavBar";
import Schedule from "./components/schedule/Schedule";

class App extends Component {
  render() {
    return (
      <div style={{height: "100%", display:"flex"}}>
        <div>
          <SideNavBar />
        </div>
        <div style={{width: "100%"}}>
          <Schedule/>
        </div>
      </div>
    );
  }
}

export default App;
