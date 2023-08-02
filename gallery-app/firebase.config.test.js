import firebaseConfig from './src/firebase/config'; // Update the import path

test('Firebase configuration is imported correctly', () => {
  expect(firebaseConfig).toBeDefined();
});
