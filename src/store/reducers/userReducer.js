const initState = {}

const userReducer = (state = initState, action) => {
    switch(action.type){

      case 'UPDATE_USER':
        console.log("user updated")
        return state;

        case 'UPDATE_USER_ERROR':
        console.log('update user error: ', action.err);
        return state;

      default:
        return state;
    }
  }

  export default userReducer;
