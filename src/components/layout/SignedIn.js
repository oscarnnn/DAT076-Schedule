import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { NavLink } from "react-router-dom";

const SignedInLinks = props => {
  return (
    <div>
      <ul>
        <li>
          <a onClick={props.signOut}>Log Out</a>
        </li>
        <li>
          <NavLink to='/'>Schedule</NavLink>
        </li>
        <li>
          <NavLink to='/members'>Members</NavLink>
        </li>
        <li>
          <NavLink to='/profile'>Profile</NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
