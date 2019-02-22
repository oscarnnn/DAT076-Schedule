import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import SignedIn from "../layout/SignedIn";
import SignedOut from "../layout/SignedOut";

// This component was made from a guide: https://www.npmjs.com/package/react-sidenav

//Alternative: https://github.com/negomi/react-burger-menu

// Component Styling, imported from Containers.js
import {
  AppContainer as BaseAppContainer,
  ExampleNavigation as Navigation,
  Theme as ContainerTheme
} from "./Containers";

class SideNavBar extends Component {
  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <SignedIn profile={profile} /> : <SignedOut />;
    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to="/" className="brand-logo">
            Scheduler
          </Link>
          {links}
        </div>
      </nav>
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
