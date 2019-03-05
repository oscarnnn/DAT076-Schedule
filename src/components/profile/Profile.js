import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { updateUser } from "../../store/actions/userActions";

class Profile extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      userid: this.props.auth.uid,
      redirect: false
    };
  }

  // When input text is changed in profile then this function will fire and update the state
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  // When Update Profile button is clicked then this function will fire and update the event
  // connected to the current userid on db and redux store.
  handleSubmit = phone => {
    const userid = this.state.userid;
    this.setState({ redirect: true });
    this.props.updateUser(
      {
        phone
      },
      userid
    );
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    const { authError, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container col s12">
        <form
          className="white"
          onSubmit={() => this.handleSubmit(this.state.phone)}
        >
          <h5 className="grey-text text-darken-3">Profile information</h5>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">person</i>
              <input
                value={this.props.profile.firstName}
                type="text"
                id="firstName"
                disabled="disabled"
              />
              <label className="active" htmlFor="firstName">
                First Name
              </label>
            </div>
            <div className="input-field col s6">
              <input
                defaultValue={this.props.profile.lastName}
                type="text"
                id="lastName"
                disabled="disabled"
              />
              <label className="active" htmlFor="lastName">
                Last Name
              </label>
            </div>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">phone</i>
            <input
              defaultValue={this.props.profile.phone}
              id="phone"
              type="tel"
              onChange={this.handleChange}
              pattern="[0-9,+]{5,15}"
              title="Allowed characters: 0-9,+. Minimum length: 5"
            />
            <label className="active" htmlFor="phone">
              Phone
            </label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">school</i>
            <input
              defaultValue={this.props.profile.organization}
              id="organization"
              type="text"
              disabled="disabled"
            />
            <label className="active" htmlFor="organization">
              Organization
            </label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input
              value={this.props.profile.email}
              disabled="disabled"
              type="email"
              id="email"
              required
            />
            <label className="active" htmlFor="email">
              Email
            </label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">lock</i>
            <input
              value="********"
              disabled="disabled"
              type="password"
              id="password"
            />
            <label className="active" htmlFor="password">
              Password
            </label>
          </div>
          <div className="input-field">

            <button to="/" className="btn blue lighten-1 z-depth-0">
              {" "}
              Update Profile
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user, userid) => dispatch(updateUser(user, userid))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }])
)(Profile);
