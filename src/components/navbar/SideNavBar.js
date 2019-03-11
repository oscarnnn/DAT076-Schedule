import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignedIn from "../layout/SignedIn";
import SignedOut from "../layout/SignedOut";
import M from "materialize-css/dist/js/materialize.min.js";
import "../../styles/sidenavbar.css";

class SideNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSmallScreen: false
    };
    this.updateScreenWidth = this.updateScreenWidth.bind(this);
  }

  componentDidMount() {
    this.updateScreenWidth();
    //Update screen width when resizing window
    window.addEventListener("resize", this.updateScreenWidth);

    //Initialize sidenav 
    var elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenWidth);
  }

  updateScreenWidth() {
    this.setState({ isSmallScreen: window.innerWidth <= 992 });
  }

  render() {
    const { auth, profile } = this.props;
    //Show SignedIn links if signed in and SignedOut if not
    const links = auth.uid ? <SignedIn profile={profile} /> : <SignedOut />;
    const isSmallScreen = this.state.isSmallScreen;
    return (
      <div>
        {/*The classes are from materializecss and creates the sidenav*/}
        <ul
          id="slide-out"
          className="sidenav sidenav-fixed light-blue lighten-5"
        >
          <Link to="/">
            <div>
              <img src={"/Logo.svg"} className="logo" alt="logo" />
            </div>
          </Link>
          {links}
        </ul>
        {/*Shows the burger menu button if the inner width of the screen is less or equal to 992 pixels*/}
        {isSmallScreen && (
          <a href="#" data-target="slide-out" className="sidenav-trigger">
            <i className="medium material-icons">menu</i>
          </a>
        )}
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

export default connect(mapStateToProps)(SideNavBar);
