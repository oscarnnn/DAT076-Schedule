import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Participate extends Component {
  constructor() {
    super();

    this.state = {
      children: [],
      eventid: ""
    };
  }

  componentWillMount() {
    this.setState({
      eventid: this.props.eventid
    });
  }

  appendChild = () => {
    this.setState({
      children: [
        ...this.state.children,
        <div key={this.props.uid} className="chip">
          {this.props.profile.firstName + " " + this.props.profile.lastName}
        </div>
      ]
    });
  };

  render() {
    return (
      <div>
        {this.state.children}
        <br />
        <div className="center-align">
          <button
            className="btn pink lighten-1 z-depth-0"
            onClick={() => {
              this.appendChild();
            }}
          >
            Participate
          </button>
        </div>
      </div>
    );
  }
}

export default Participate;
