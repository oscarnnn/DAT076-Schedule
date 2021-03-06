import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  isValidEmail,
  addOrganization
} from "../../store/actions/adminActions.js";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

//This component will render a page only for admins. There will be a input field to create an
//organization if the admin doesn't have one and an input field to add members to the admins
//organization

class AdminPage extends Component {
  state = {
    email: "",
    showMsg: false,
    organization: this.props.profile.organization,
    userid: this.props.auth.uid
  };

  componentWillMount() {
    console.log(this.state.userid);
    this.setState({
      showMsg: false
    });
  }

  //Updates the state of the input fields
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  //Handles the submitted values from the input field "email", 
  //it will dispatch the action "isValidEmail" and add
  //the email to the current admins organization
  handleSubmitUser = (email, org) => {
    this.props.checkValidEmail(email, org);
    this.setState({
      showMsg: true
    });
  };

  //Handles the submitted values from the input field "organization", 
  //it will call the action "addOrganization"
  //and add the current admin to the organization
  handleSubmitOrg = organization => {
    const userid = this.state.userid;
    this.props.addOrganization(
      {
        organization
      },
      userid
    );
  };

  render() {
    let msg;
    // Validation messages for adding members to your organization
    if (this.state.showMsg) {
      msg = (
        <div>
          <div className="center green-text">
            {this.props.adminMsg.successMsg ? (
              <p>{this.props.adminMsg.successMsg}</p>
            ) : null}
          </div>
          <div className="center red-text">
            {this.props.adminMsg.errorMsg ? (
              <p>{this.props.adminMsg.errorMsg}</p>
            ) : null}
          </div>
        </div>
      );
    }
    // So that you can't access this view unless you're authorized to do so.
    if (this.props.profile.authority !== 1) return <Redirect to="/signin" />;

    // If you're already a part of an organization then you can add members to it.
    if (this.props.profile.organization !== "")
      return (
        <div className="hide-scroll-container">
          <div className="container col s12">
            <h5 className="grey-text text-darken-3">
              Add Members to your organization
            </h5>
            <div className="input-field">
              <i className="material-icons prefix">email</i>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={this.handleChange}
                required
              />
              <button
                onClick={() =>
                  this.handleSubmitUser(
                    this.state.email,
                    this.props.profile.organization
                  )
                }
                className="btn blue lighten-1 z-depth-0"
              >
                {" "}
                Submit
              </button>
              {msg}
            </div>
          </div>
        </div>
      );
    // If you're not a part of an organization then you can create one.
    return (
      <div className="hide-scroll-container">
        <div className="container col s12">
          <h5 className="grey-text text-darken-3">Create your organization</h5>
          <div className="input-field">
            <i className="material-icons prefix">school</i>
            <input
              type="text"
              id="organization"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <button
              to="/"
              className="btn blue lighten-1 z-depth-0"
              onClick={() => this.handleSubmitOrg(this.state.organization)}
            >
              {" "}
              Create Organization
            </button>
          </div>
        </div>
      </div>
    );
  }
}

//This function will map the chosen states from the redux store to this components props
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile,
    adminMsg: state.admin
  };
};

//This function will dispatch the chosen actions to update db and redux store
const mapDispatchToProps = dispatch => {
  return {
    checkValidEmail: (email, org) => dispatch(isValidEmail(email, org)),
    addOrganization: (organization, userid) =>
      dispatch(addOrganization(organization, userid))
  };
};

//This function will connect the component with firestore and grab the collection "users" and also connect the
//component to the redux store
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }])
)(AdminPage);
