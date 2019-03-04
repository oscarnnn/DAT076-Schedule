import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import { isValidEmail } from "../../store/actions/adminActions.js"
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class AdminPage extends Component {
  state = {
    email: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (email,org) => {
    this.props.checkValidEmail(email,org)
  }

  render() {
    if (this.props.profile.authority !== 1 ) return <Redirect to="/signin" />;
    return(
      <div>
        <div className="container col s12">
            <h5 className="grey-text text-darken-3">Add Members to your organization</h5>
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
                onClick={() => this.handleSubmit(this.state.email,this.props.profile.organization)}
                className="btn blue lighten-1 z-depth-0"> Submit
              </button>
            </div>
        </div>
      </div>
    )
  }


}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkValidEmail: (email, org) => dispatch(isValidEmail(email, org))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "users" }])
)(AdminPage);
