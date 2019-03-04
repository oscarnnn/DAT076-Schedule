
export const updateUser = (user, userid) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      firestore
        .collection("users")
        .doc(userid)
        .update(user)
        .then(() => {
          dispatch({ type: "UPDATE_USER", user });
        })
        .catch(err => {
          dispatch({ type: "UPDATE_USER_ERROR", err });
        });
    };
  };
  