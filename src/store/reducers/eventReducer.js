const initState = {};

const eventReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_EVENT":
      return state;

    case "ADD_EVENT_ERROR":
      console.log("add event error: ", action.err);
      return state;

    case "DEL_EVENT":
      console.log("event deleted");
      return state;

    case "DEL_EVENT_ERROR":
      console.log("delete event error: ", action.err);
      return state;

    case "UPDATE_EVENT":
      console.log("event updated");
      return state;

    case "ADD_PARTICIPANT":
      return state;

    case "ADD_PARTICIPANT_ERROR":
      console.log("add participant error: ", action.err);
      return state;

    case "REMOVE_PARTICIPANT":
      return state;

    case "REMOVE_PARTICIPANT_ERROR":
      console.log("remove participant error: ", action.err);
      return state;

    default:
      return state;
  }
};

export default eventReducer;
