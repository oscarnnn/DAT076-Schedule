import React, { Component } from "react";
import Schedule from "./components/schedule/Schedule";

class App extends Component {
  render() {
    return (
      <div style={{height:500}}>
        <Schedule />
      </div>
    );
  }
}

export default App;