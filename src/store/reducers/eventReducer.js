const initState = {}

const eventReducer = (state = initState, action) => {
    switch(action.type){
      case 'ADD_EVENT':
      return {
            events: [...state.events, action.event]
        }
      case 'ADD_EVENT_ERROR':
        console.log('add event error: ', action.err);
        return state;

      default:
        return state;
    }
  }

  export default eventReducer;
