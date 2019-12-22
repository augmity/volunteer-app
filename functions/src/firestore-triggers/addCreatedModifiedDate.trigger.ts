import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const addCreatedModifiedDate = (collectionName: string) => {
  
  return functions.firestore
    .document(`${collectionName}/{id}`)
    .onCreate((snapshot) => {
      const createdOn = admin.firestore.FieldValue.serverTimestamp();
      const modifiedOn = createdOn;
      return snapshot.ref.set({ createdOn, modifiedOn }, { merge: true });
    });
};
