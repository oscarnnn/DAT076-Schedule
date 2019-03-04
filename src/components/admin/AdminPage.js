import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import { isValidEmail } from "../../store/actions/adminActions.js"
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class AdminPage extends Component {
  state = {
    email: "",
    showMsg: false
  }

  componentWillMount() {
    this.setState({
      showMsg: false
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (email, org) => {
    this.props.checkValidEmail(email, org)
    this.setState({
      showMsg: true
    })
  }

  render() {
    let msg;
    if (this.state.showMsg) {
      msg = <div>
        <div className="center green-text">
          {this.props.adminMsg.successMsg ? <p>{this.props.adminMsg.successMsg}</p> : null}
        </div>
        <div className="center red-text">
          {this.props.adminMsg.errorMsg ? <p>{this.props.adminMsg.errorMsg}</p> : null}
        </div>
      </div>
    }
    if (this.props.profile.authority !== 1) return <Redirect to="/signin" />;
    return (
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
              onClick={() => this.handleSubmit(this.state.email, this.props.profile.organization)}
              className="btn blue lighten-1 z-depth-0"> Submit
              </button>
            {msg}
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
    profile: state.firebase.profile,
    adminMsg: state.admin
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
