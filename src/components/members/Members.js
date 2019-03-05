import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

class Members extends Component {
  render() {
    let display = this.props.users;

    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div>
        <table className="centered highlight">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Organization</th>
            </tr>
          </thead>
          <tbody>
            {display.map(item => (
              <tr key={item.id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.organization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.firestore.ordered.users && state.firebase.profile.organization) {
    return {
      users: state.firestore.ordered.users,
      auth: state.firebase.auth,
      org: state.firebase.profile.organization
    };
  } else {
    return {
      users: [],
      auth: state.firebase.auth,
      org: ""
    };
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect( props => [
    {
       collection: 'users' ,
       where: [['organization', '==', props.org]]
    }
  ])
)(Members);
