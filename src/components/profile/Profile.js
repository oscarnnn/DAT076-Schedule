import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { NavLink } from "react-router-dom";
import { updateUser } from "../../store/actions/userActions";

class Profile extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      userid: this.props.auth.uid
    };

    this.handleChange = this.handleChange.bind(this);
    this.input = React.createRef();
  }

  componentDidMount() {
      console.log("userID: " + this.state.userid)
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log("id: " + [e.target.id]);
    console.log(["value: " + e.target.value]);
    console.log(e.target);
  };
  /*handlefirstName = firstName => {
      console.log("name: " + firstName.target.value)
    this.setState({
      firstName: firstName.target.value
    });
  };*/

  handleSubmit = (firstName, lastName, phone) => {
    const userid = this.props.auth.uid;
    this.props.updateUser(
      {
        firstName,
        lastName,
        phone
      },
      userid
    );
  };

  render() {
    const { authError, auth } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    return (
      <div className="container col s12">
        <form className="white">
          <h5 className="grey-text text-darken-3">Profile information</h5>
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input
              value={this.props.profile.email}
              disabled="disabled"
              type="email"
              id="email"
              required
            />
            <label className="active" for="email">
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
              required
            />
            <label className="active" for="password">
              Password
            </label>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">person</i>
              <input
                defaultValue={this.props.profile.firstName}
                type="text"
                id="firstName"
                className="validate"
                onChange={this.handleChange}
              />
              <label className="active" for="firstName">
                First Name
              </label>
            </div>
            <div className="input-field col s6">
              <input
                defaultValue={this.props.profile.lastName}
                type="text"
                id="lastName"
                className="validate"
                onChange={this.handleChange}
                required
              />
              <label className="active" for="lastName">
                Last Name
              </label>
            </div>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">phone</i>
            <input
              defaultValue={this.props.profile.phone}
              id="phone"
              type="text"
              className="validate"
              onChange={this.handleChange}
            />
            <label className="active" for="phone">
              Phone
            </label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0"              onClick={() =>
                this.handleSubmit(
                    this.state.firstName,
                    this.state.lastName,
                    this.state.phone
                )}>
              <NavLink to="/">Update Profile</NavLink>
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
  
