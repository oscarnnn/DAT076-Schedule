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

export const addParticipant = (uid, name, eventid) => {
  let mapkey = "participants." + uid
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("events")
      .doc(eventid)
      .update({
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

export const removeParticipant = (uid, eventid) => {
  let mapkey = "participants." + uid
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("events")
      .doc(eventid)
      .update({
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