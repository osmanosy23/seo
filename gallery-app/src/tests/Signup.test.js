// tests/Signup.tests.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { mockAuth, mockFirestore } from '../firebase.config.mock'; // Updated import

import Signup from '../pages/Signup';

test('renders Signup component', () => {
  // Use the mockAuth and mockFirestore instances for rendering the component
  render(
    <Router>
      <Signup />
    </Router>
  );
  const signupButton = screen.getByText(/Signup/i);
  expect(signupButton).toBeInTheDocument();
});

test('allows user to fill out the form and submit', async () => {
  // Use the mockAuth and mockFirestore instances for rendering the component
  render(
    <Router>
      <Signup />
    </Router>
  );
  const emailInput = screen.getByPlaceholderText('email');
  const passwordInput = screen.getByPlaceholderText('password');
  const signupButton = screen.getByText(/Signup/i);

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'test123' } });

  fireEvent.click(signupButton);
});

// Other test cases go here...
