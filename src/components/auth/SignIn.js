import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

//This component handles the sign in. It will render a page with sign in form 
//After the user submitted email and password, they will be checked in the db 
//and if they are valid the user will be redirected to the schedule-page

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  //Updates the states with the values from the input fields "email" and "password"
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  //Fires the action "signIn" with the current state when user submits the input fields
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="hide-scroll-container">
        <div className="container">
          <form className="white" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Log In</h5>
            <div className="input-field">
              <i className="material-icons prefix">email</i>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="material-icons prefix">lock</i>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="input-field">
              <button className="btn blue lighten-1 z-depth-0">Log In</button>
              <div className="center red-text">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

//This function will map the chosen states from the redux store to this components props
const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

//This function handles dispatches of the chosen actions to update db and redux store
const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

//This function connects this component to the redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
