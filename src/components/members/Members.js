import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom"


class Members extends Component {

  render () {
    let display = this.props.users;

    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />
    }
    return (
      <div>
        <table className="centered highlight">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
              {display.map(item => <tr key={item.id}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                   </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  if (state.firestore.ordered.users) {
    return {
      users: state.firestore.ordered.users,
      auth: state.firebase.auth
    };
  } else {
    return {
      users: [],
      auth: state.firebase.auth
    };
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }])
)(Members);
