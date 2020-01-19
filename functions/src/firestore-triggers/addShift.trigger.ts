import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const addShift = functions.firestore
  .document('shifts/{id}')
  .onCreate((snapshot) => {
    return admin
      .firestore()
      .collection('conversations')
      .add({
        messages: null
      })
      .then((doc) => {
        return snapshot.ref.set({ conversation: doc.id }, { merge: true });
      })
});
