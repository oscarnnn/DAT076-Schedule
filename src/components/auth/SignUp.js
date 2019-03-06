import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";

//This component handles the sign up. It will render a page with a sign up form. After the user
//has successfully filled in the form, he/she will be redirected to the schedule page

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: ""
  };
    //Updates the states with the values from the input fields "email", "password", "firstname", "lastname"
    //and "phone"
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  //This function will fire when user submit the input fields and dispatch the action "signUp" with the current state
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="hide-scroll-container">
        <div className="container col s12">
          <form className="white" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Sign Up</h5>
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
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">person</i>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  pattern="[A-Za-zåäöÅÄÖ]{1,40}"
                  onChange={this.handleChange}
                  required
                  title="Allowed characters: A-Ö"
                />
              </div>
              <div className="input-field col s6">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  pattern="[A-Za-zåäöÅÄÖ]{1,40}"
                  onChange={this.handleChange}
                  required
                  title="Allowed characters: A-Ö"
                />
              </div>
            </div>
            <div className="input-field">
              <i className="material-icons prefix">phone</i>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                pattern="[0-9,+]{5,15}"
                id="phone"
                onChange={this.handleChange}
                required
                title="Allowed characters: 0-9,+. Minimum length: 5"
              />
            </div>
            <div className="input-field">
              <button className="btn blue lighten-1 z-depth-0">Sign Up</button>
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
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

//This function handles dispatches of the chosen actions to update db and redux store
const mapDispatchToProps = dispatch => {
  return {
    signUp: creds => dispatch(signUp(creds))
  };
};

//This function connects this component to the redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
