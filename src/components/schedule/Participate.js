import React, { Component } from "react";

//Component that will render the participants for a selected event in the schedule and a button to participate or leave
class Participate extends Component {
  //onClick for the "LEAVE" button
  participate = () => {
    this.props.onParticipate();
  };

  //onClick for the "PARTICIPATE" button
  leave = () => {
    this.props.onLeave();
  };

  render() {
    return (
      <div>
        <div className="center-align">
          {/*Map the participants from the state in schedule*/}
          {this.props.participants &&
            Object.entries(this.props.participants).map(([key, value]) => (
              <div key={key} className="chip">
                {value}
              </div>
            ))}
        </div>
        <br />
        <div className="center-align">
          {/*If the current user is already participating in an event, show the "LEAVE" button
              otherwise show the "PARTICIPATE" button */}
          {this.props.participants &&
          Object.keys(this.props.participants).includes(this.props.uid) ? (
            <button
              className="btn blue lighten-1 z-depth-0"
              onClick={this.leave}
            >
              Leave
            </button>
          ) : (
            <button
              className="btn blue lighten-1 z-depth-0"
              onClick={this.participate}
            >
              Participate
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Participate;
