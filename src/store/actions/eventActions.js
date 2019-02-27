export const addEvent = event => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("events")
      .add({
        start: event.start,
        end: event.end,
        title: event.title
      })
      .then(() => {
        dispatch({ type: "ADD_EVENT", event });
      })
      .catch(err => {
        dispatch({ type: "ADD_EVENT_ERROR", err });
      });
  };
};

export const deleteEvent = eventid => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("events")
      .doc(eventid)
      .delete()
      .then(() => {
        dispatch({ type: "DEL_EVENT", eventid });
      })
      .catch(err => {
        dispatch({ type: "DEL_EVENT_ERROR", err });
      });
  };
};

export const updateEvent = (event, eventid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("events")
      .doc(eventid)
      .update(event)
      .then(() => {
        dispatch({ type: "UPDATE_EVENT", event });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_EVENT_ERROR", err });
      });
  };
};
