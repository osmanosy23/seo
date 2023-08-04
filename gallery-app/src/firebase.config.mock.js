// src/firebase.config.mock.js

// MockAuthentication class to simulate Firebase Authentication functionality
export class MockAuthentication {
  constructor() {
    // Initialize any mock data or state needed for authentication
    this.currentUser = null;
  }

  // Implement mock methods for authentication, for example:
  signInWithEmailAndPassword(email, password) {
    // Simulate sign-in with email and password
    return new Promise((resolve, reject) => {
      // For simplicity, we'll consider any email containing "test" as a valid user
      if (email.includes('test')) {
        this.currentUser = { email };
        resolve(this.currentUser);
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  }

  createUserWithEmailAndPassword(email, password) {
    // Simulate creating a new user with email and password
    return new Promise((resolve) => {
      this.currentUser = { email };
      resolve(this.currentUser);
    });
  }

  // Implement other mock methods as needed for testing different authentication scenarios

  // Additional mock method for signing out
  signOut() {
    this.currentUser = null;
  }
}

// MockFirestore class to simulate Firestore functionality
export class MockFirestore {
  constructor() {
    // Initialize any mock data or state needed for Firestore
    this.data = {};
  }

  // Implement mock methods for Firestore, for example:
  collection(collectionName) {
    // Simulate accessing a collection in Firestore
    if (!this.data[collectionName]) {
      this.data[collectionName] = {};
    }

    return {
      doc: (documentPath) => this.doc(`${collectionName}/${documentPath}`),
    };
  }

  doc(documentPath) {
    // Simulate accessing a document in Firestore
    if (!this.data[documentPath]) {
      this.data[documentPath] = {};
    }

    return {
      get: () => {
        const snapshot = {
          data: () => this.data[documentPath],
          exists: !!Object.keys(this.data[documentPath]).length,
        };
        return Promise.resolve(snapshot);
      },
      set: (data) => {
        this.data[documentPath] = { ...data };
        return Promise.resolve();
      },
      update: (data) => {
        this.data[documentPath] = { ...this.data[documentPath], ...data };
        return Promise.resolve();
      },
      delete: () => {
        delete this.data[documentPath];
        return Promise.resolve();
      },
    };
  }

  // Implement other mock methods as needed for testing different Firestore scenarios
}

// MockFirebase class to simulate the overall Firebase functionality
export class MockFirebase {
  constructor() {
    this.auth = new MockAuthentication(); // Initialize the mock authentication instance
    this.firestore = new MockFirestore(); // Initialize the mock Firestore instance
  }

  // Implement other mock methods or properties as needed for testing different Firebase scenarios
}



// Set up any required mock behavior for your mock classes
// For example, you can set up methods or properties for your mocks here

// Export the instances if needed (if you have specific behavior you want to test)
// src/firebase.config.mock.js

// ... Your previous code ...

// Export the instances if needed (if you have specific behavior you want to test)
