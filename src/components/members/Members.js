import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Members extends Component {

    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return(
          
        <body>
          <h1>Example shit, swap out for user data from collection</h1>
                  <table class="highlight centered">
        <thead>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Toby</td>
            <td>Toby@Doby.com</td>
            <td>911</td>
          </tr>
          <tr>
            <td>Maka</td>
            <td>Maka@kaka.com</td>
            <td>112</td>
          </tr>
          <tr>
            <td>OsKar</td>
            <td>Oskar@OskarmedK.com</td>
            <td>123</td>
          </tr>
        </tbody>
      </table>
        </body>
      )
    }
  

}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
      auth: state.firebase.auth,
    }
  }
  
  export default connect(mapStateToProps)(Members)


/*const mapStateToProps = (state) => {
  console.log(state);
  return {
    users: state.firestore.ordered.users
  }
}*/

  
 /* export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      {collection: 'users' }
    ])
  )(Members)*/
