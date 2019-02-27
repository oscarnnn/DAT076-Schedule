import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class Members extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
                       tmp: []
                      }
      }

      componentDidUpdate (prevProps) {
          if (this.props.users !== prevProps.users) {
              this.memberList()
            }
        }

        memberList(props) {
            if(this.props.users.length > 0)
            {
                console.log("in if");
                console.log(this.props.users[0].id);
                for(let i = 0; i < this.props.users.length; i++){
                    tmp[i] = this.props.users[i];
                }
                return (
                    <div>{this.props.users}</div>
                );    
            }
              }

              ListItem(props) {
                // Correct! There is no need to specify the key here:
                return <li>{props.value}</li>;
              }

              renderTableRows(array) {
                return array.map(item =>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    {this.renderTableColValues(item, this.cols)}
                  </tr>
                );
              }
       


    render() {

        console.log(this.state.tmp);  
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return(
            <div style={{zIndex:900, position:"fixed", height: "100%"}}>
            <h1>Example shit, swap out for user data from collection</h1>
            <ol>
            {this.props.users.map(user => (
            <li key={user.id}>{user}</li>))}
            </ol>
            </div>
       
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
  )(Members)
  