import { addCreatedModifiedOn, addShift } from './firestore-triggers';
import { onUserSignUp } from './auth-triggers';

// Initialize admin here once, so other functions could use already initialized admin instance
import * as admin from 'firebase-admin';
admin.initializeApp();

// Create some higher order functions
const conversationsAddCreatedModifiedOn = addCreatedModifiedOn('conversations/{conversationId}/messages');
const jobsAddCreatedModifiedOn = addCreatedModifiedOn('jobs');
const locationsAddCreatedModifiedOn = addCreatedModifiedOn('locations');
const shiftsAddCreatedModifiedOn = addCreatedModifiedOn('shifts');
const usersAddCreatedModifiedOn = addCreatedModifiedOn('users');


/*
 * Exported Functions
 */
export {
  // Auth triggers
  onUserSignUp,

  // Firestore triggers
  conversationsAddCreatedModifiedOn,
  jobsAddCreatedModifiedOn,
  locationsAddCreatedModifiedOn,
  shiftsAddCreatedModifiedOn,
  usersAddCreatedModifiedOn,
  addShift
};
