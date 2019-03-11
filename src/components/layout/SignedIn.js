import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { NavLink } from "react-router-dom";

//This component will handle which links in the navbar that should be visible when the user is logged in

//This function will check if the current user has admin rights. If the current user is an admin,
//there will be a link to the admin page in the navbar, else it will not.
const SignedInLinks = props => {
  const links =
    props.profile.authority === 1 ? (
      <li>
        {" "}
        <NavLink to="/admin">Admin Page</NavLink>{" "}
      </li>
    ) : (
      <li />
    );

  return (
    <div>
      <ul>
        <li>
          <a onClick={props.signOut}>Log Out</a>
        </li>
        <li>
          <NavLink to="/">Schedule</NavLink>
        </li>
        <li>
          <NavLink to="/members">Members</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        {links}
      </ul>
    </div>
  );
};

//This function handles dispatches of the chosen actions to update db and redux store
const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

//This function connects this component to the redux store
export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
