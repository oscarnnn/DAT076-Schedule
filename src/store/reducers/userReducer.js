const initState = {}

const userReducer = (state = initState, action) => {
    switch(action.type){

      case 'UPDATE_USER':
        return state;

        case 'UPDATE_USER_ERROR':
        return state;

      default:
        return state;
    }
  }

  export default userReducer;
