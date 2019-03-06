//This actioncreator will first try to add the given email to the given organization in the database,
//if it was succeeded the function will dispatch another action with typ "VALID_MEMBER".
//If the email wasn't found in the database a action with typ "MEMBER_DOES_NOT_EXIST" will be dispatched
export const isValidEmail = ( email, org ) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection("users").where("email", "==", email)
    .get()
    .then(function(querySnapshot) {
      const tmpID = querySnapshot.docs[0].id;
      firestore.collection("users").doc(tmpID).update({
        organization: org
      }).then(
        dispatch({
          type: "VALID_MEMBER"
        })
      );
    }).catch((err) => {
      dispatch({
        type: "MEMBER_DOES_NOT_EXIST", err
      })
    })
  }
}

//This actioncreator will first try to add the given organization to the given userid. If successful it will dispatch
//an action with type "ADD_ORGANIZATION", else "ADD_ORGANIZATION_ERROR"
export const addOrganization = (organization, userid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(userid)
      .update(organization)
      .then(() => {
        dispatch({ type: "ADD_ORGANIZATION", organization });
      })
      .catch(err => {
        dispatch({ type: "ADD_ORGANIZATION_ERROR", err });
      });
  };
};

