import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Participate extends Component {
  constructor() {
    super();

    this.state = {
      children: []
    };
  }

  appendChild = () => {
    
    this.setState({
      children: [...this.state.children, <div key={this.props.auth.uid} className="chip"></div>]
    });
  };

  render() {
    return (
      <div>
        {this.state.children}
        <br />
        <button
          className="btn pink lighten-1 z-depth-0"
          style={{ marginBottom: "10px" }}
          onClick={() => {
            this.appendChild();
          }}
        >
          Participate
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
    console.log(state);
    return {
      users: state.firestore.ordered.users,
      auth: state.firebase.auth
    };
  };

  export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "users" }])
  )(Participate);
