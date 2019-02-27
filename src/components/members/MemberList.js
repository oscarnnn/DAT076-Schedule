import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class MemberList extends Component {
    render() {
        const { auth } = this.props;
        const { users } = this.props;
        const listItems = users.map((user) =>
        <li key={user.firstName}>
        {user}
        </li>);
        return (
            <ul>{listItems}</ul>
        )
    }
    
}

const mapStateToProps = ( state ) => {
    if (state.firestore.ordered.users) {
      return {
        users: state.firestore.ordered.users,
        auth: state.firebase.auth
      }
    } else {
      return {
        users: [],
        auth: state.firebase.auth
      }
    }
  }

  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'users' }
    ])
  )(MemberList)
  