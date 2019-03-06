import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignedIn from "../layout/SignedIn";
import SignedOut from "../layout/SignedOut";
import Logo from "../../assets/Logo.svg";
import M from "materialize-css/dist/js/materialize.min.js";

const logoStyle = {
  width:"50%",
  marginLeft: "2em",
  marginTop: "1em",
};

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
    window.addEventListener("resize", this.updateScreenWidth);

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
    this.setState({ isSmallScreen: window.innerWidth < 992 });
  }

  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <SignedIn profile={profile} /> : <SignedOut />;
    const isSmallScreen = this.state.isSmallScreen;
    return (
      <div>
        <ul
          id="slide-out"
          className="sidenav sidenav-fixed light-blue lighten-5"
        >
          <Link to="/">
            <img src={Logo} style={logoStyle} alt="logo" />
          </Link>
          {links}
        </ul>
        {isSmallScreen && <a href="#" data-target="slide-out" className="sidenav-trigger">
          <i className="medium material-icons">menu</i>
        </a>}
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
