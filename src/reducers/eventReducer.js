const initState = {
    events: [
        {
            id: 0,
            title: 'Test1',
            allDay: true,
            start: new Date(2019, 1, 15),
            end: new Date(2019, 1, 16),
          },
          {
            id: 1,
            title: 'Test2',
            start: new Date(2019, 1, 17),
            end: new Date(2019, 1, 19),
          },
        
          {
            id: 2,
            title: 'Test3',
            start: new Date(2019, 1, 21, 13, 0, 0),
            end: new Date(2019, 1, 21, 23, 0, 0),
          },
          {
            id: 2,
            title: 'Test3',
            start: new Date(2019, 1, 21, 13, 0, 0),
            end: new Date(2019, 1, 21, 23, 0, 0),
          },
    ]
}

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