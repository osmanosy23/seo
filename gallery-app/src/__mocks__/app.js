// src/firebase/__mocks__/app.js

import mockFirebase from '../firebase.config.mock';

const mockAuth = new mockFirebase.MockAuthentication(); // Fix the reference to MockAuthentication
const mockFirestore = new mockFirebase.MockFirestore();

const firebase = {
  auth: () => mockAuth,
  firestore: () => mockFirestore,
  // You can add other Firebase functionalities you're using in your app here.
};

export default firebase;
