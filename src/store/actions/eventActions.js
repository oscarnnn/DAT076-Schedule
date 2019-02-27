export const addEvent = (event) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('events').add({
            start:event.start,
            end:event.end,
            title:event.title
        }).then(() => {
            dispatch({type: 'ADD_EVENT', event})
        }).catch((err) => {
            dispatch({type: 'ADD_EVENT_ERROR', err})
        })
    }
}