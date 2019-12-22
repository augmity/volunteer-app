import * as functions from 'firebase-functions';
import { addCreatedModifiedDate } from './firestore-triggers';
import { onUserSignUp } from './auth-triggers';

// Initialize admin here once, so other functions could use already initialized admin instance
import * as admin from 'firebase-admin';
admin.initializeApp();

// Create some higher order functions
const teamsAddCreatedModifiedDate = addCreatedModifiedDate('teams');
const usersAddCreatedModifiedDate = addCreatedModifiedDate('users');


/*
 * Exported Functions
 */
export {
  // Auth triggers
  onUserSignUp,

  // Firestore triggers
  teamsAddCreatedModifiedDate,
  usersAddCreatedModifiedDate
};

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase! dupa!");
});
