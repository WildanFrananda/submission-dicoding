/**
 *  Testing Scenario
 *
 *   - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import {
  render,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../state';
import LoginInput from './LoginInput';
import useLogin from '../hooks/useLogin';

import '@testing-library/jest-dom';

jest.mock('../hooks/useLogin');

describe('LoginInput component', () => {
  it('should handle email typing correctly', async () => {
    // Arrange
    useLogin.mockReturnValue({ login: jest.fn() });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginInput />
        </Provider>
      </BrowserRouter>,
    );
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await act(async () => {
      await userEvent.type(emailInput, 'emailtest');
    });

    // Assert
    expect(emailInput).toHaveValue('emailtest');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    useLogin.mockReturnValue({ login: jest.fn() });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginInput />
        </Provider>
      </BrowserRouter>,
    );
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await act(async () => {
      await userEvent.type(passwordInput, 'passwordtest');
    });

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = jest.fn();
    useLogin.mockReturnValue({ login: mockLogin });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginInput />
        </Provider>
      </BrowserRouter>,
    );
    const emailInput = await screen.getByPlaceholderText('Email');
    await act(async () => {
      await userEvent.type(emailInput, 'emailtest');
    });
    const passwordInput = await screen.getByPlaceholderText('Password');
    await act(async () => {
      await userEvent.type(passwordInput, 'passwordtest');
    });
    const loginButton = await screen.getByRole('button', { name: 'Sign In' });

    // Action
    await act(async () => {
      await userEvent.click(loginButton);
    });

    // Assert
    await waitFor(() => expect(mockLogin).toBeCalledWith({
      email: 'emailtest',
      password: 'passwordtest',
    }));
  });
});
