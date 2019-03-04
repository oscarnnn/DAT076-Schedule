const initState = {}

const adminReducer = (state = initState, action) => {
    switch(action.type){
      case 'VALID_MEMBER':
      return state;

      case 'MEMBER_DOES_NOT_EXIST':
        console.log('add member error: ', action.err);
        return state;

      default:
        return state;
    }
  }

  export default adminReducer;
