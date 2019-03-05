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
