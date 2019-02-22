import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignedIn from "../layout/SignedIn";
import SignedOut from "../layout/SignedOut";
import Logo from "../../assets/Logo.svg";

const logoStyle = {
  margin: "1em"
};

class SideNavBar extends Component {
  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <SignedIn profile={profile} /> : <SignedOut />;
    return (
      <div
        id="slide-out"
        className="sidenav sidenav-fixed light-blue lighten-5"
      >
        <div style={logoStyle}>
          <Link to="/" className="brand-logo">
            <img src={Logo} />
          </Link>
        </div>
        <ul>
          <li> {links}</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(SideNavBar);
