import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onUserSignUp = functions.auth.user().onCreate((user) => {
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set({
      name: user.displayName,
      email: user.email,
      photoUri: user.photoURL,
      photoLargeUri: user.photoURL,
   })
});
