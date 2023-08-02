import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

import Signup from '../pages/Signup'; // Replace 'Signup' with the actual path to your Signup component
import firebaseConfig from '../../firebase.config.test'; // Adjust the path to your firebase.config.test.js
import { initializeApp } from 'firebase/app'; // Import initializeApp from Firebase

initializeApp(firebaseConfig);

test('renders Signup component', () => {
  render(<Router><Signup /></Router>);
  const signupButton = screen.getByText(/Signup/i);
  expect(signupButton).toBeInTheDocument();
});

// Your other test cases go here...

test('allows user to fill out the form and submit', async () => {
  render(<Router><Signup /></Router>);
  const emailInput = screen.getByPlaceholderText('email');
  const passwordInput = screen.getByPlaceholderText('password');
  const signupButton = screen.getByText(/Signup/i);

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'test123' } });

  fireEvent.click(signupButton);
});