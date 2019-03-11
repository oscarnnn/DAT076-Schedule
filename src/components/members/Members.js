import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

//This component will render a page with a table to show all the members in the current users organization

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

//This function will map the chosen states from the redux store to this components props
const mapStateToProps = state => {
  return {
    users: state.firestore.ordered.users ? state.firestore.ordered.users : [],
    auth: state.firebase.auth ? state.firebase.auth : {},
    org: state.firebase.profile.organization
      ? state.firebase.profile.organization
      : ""
  };
};

//This function will connect the component with firestore and grab the collection "users" where
//the organization is the same as the current users and also connect the component to the redux store
export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: "users",
      where: [["organization", "==", props.org]]
    }
  ])
)(Members);
