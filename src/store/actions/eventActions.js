export const addEvent = (event, organization) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("events")
      .add({
        start: event.start,
        end: event.end,
        title: event.title,
        organization: organization
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

//Adds a participant to an event
export const addParticipant = (uid, name, eventid) => {
  //mapkey is to set a specific key
  let mapkey = "participants." + uid;
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("events")
      .doc(eventid)
      .update({
        //set the value of the key(uid) in the participants map to the name parameter 
        [mapkey]: name
      })
      .then(() => {
        dispatch({ type: "ADD_PARTICIPANT", uid });
      })
      .catch(err => {
        dispatch({ type: "ADD_PARTICIPANT_ERROR", err });
      });
  };
};

//Remove a participant from an event
export const removeParticipant = (uid, eventid) => {
  let mapkey = "participants." + uid;
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("events")
      .doc(eventid)
      .update({
        //Delete the key(uid)-value(name) pair in the participants map
        [mapkey]: firestore.FieldValue.delete()
      })
      .then(() => {
        dispatch({ type: "REMOVE_PARTICIPANT", uid });
      })
      .catch(err => {
        dispatch({ type: "REMOVE_PARTICIPANT_ERROR", err });
      });
  };
};
