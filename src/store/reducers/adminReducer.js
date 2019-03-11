const initState = {
  successMsg: null,
  errorMsg: null
}

const adminReducer = (state = initState, action) => {
    switch(action.type){
      case 'VALID_MEMBER':
      return {
        ...state,
        successMsg: "Member added to organization",
        errorMsg: null
      }

      case 'MEMBER_DOES_NOT_EXIST':
        console.log('add member error: ', action.err);
        return {
          ...state,
          successMsg: null,
          errorMsg: "Error: Couldn't add member to organization"
        }

        case 'CREATE_ORGANIZATION':
        return {
          ...state,
          successMsg: "Organization created",
          errorMsg: null
        }
  
        case 'CREATE_ORGANIZATION_ERROR':
          console.log('create organization error: ', action.err);
          return {
            ...state,
            successMsg: null,
            errorMsg: "Error: Couldn't create organization"
          }

      default:
        return state;
    }
  }

  export default adminReducer;
