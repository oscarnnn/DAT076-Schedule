import { createStore } from 'redux';

const initState = {
    events: [],
}

function myreducer(state = initState, action){
    if(action.type == 'ADD_EVENT'){
        return {
            events: [...states.todos, action.event]
        }
    }
}

const store = createStore(myreducer);

store.subscribe(() => {
    console.log('state updated');
    console.log(store.getState());
})

const eventAction = { type: 'ADD_EVENT', event: 'testEvent'};

store.dispatch(eventAction);