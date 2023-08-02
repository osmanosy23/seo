import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

import Signup from '../pages/Signup';

test('renders Login component', () => {
  render(<Router><Signup /></Router>); // Wrap Signup with Router
  const loginButton = screen.getByText(/Login/i);
  expect(loginButton).toBeInTheDocument();
});

test('allows user to fill out the login form and submit', () => {
  render(<Router><Signup /></Router>); // Wrap Signup with Router
  const emailInput = screen.getByPlaceholderText('email');
  const passwordInput = screen.getByPlaceholderText('password');
  const loginButton = screen.getByText(/Login/i);

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'test123' } });

  fireEvent.click(loginButton);

  // Add assertions to check if the login logic works as expected
});