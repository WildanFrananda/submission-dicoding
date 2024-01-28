/**
 *  Testing Scenario
 *
 *   - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
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
import RegisterInput from './RegisterInput';
import useRegister from '../hooks/useRegister';

import '@testing-library/jest-dom';

jest.mock('../hooks/useRegister');

describe('RegisterInput component', () => {
  it('should handle name typing correctly', async () => {
    // Arrange
    useRegister.mockReturnValue({ register: jest.fn(), isLoggedIn: false });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RegisterInput />
        </Provider>
      </BrowserRouter>,
    );
    const nameInput = await screen.getByPlaceholderText('Name');

    // Action
    await act(async () => {
      await userEvent.type(nameInput, 'nametest');
    });

    // Assert
    expect(nameInput).toHaveValue('nametest');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    useRegister.mockReturnValue({ register: jest.fn(), isLoggedIn: false });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RegisterInput />
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
    useRegister.mockReturnValue({ register: jest.fn(), isLoggedIn: false });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RegisterInput />
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

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = jest.fn();
    useRegister.mockReturnValue({
      register: mockRegister,
      isLoggedIn: false,
    });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RegisterInput />
        </Provider>
      </BrowserRouter>,
    );
    const nameInput = await screen.getByPlaceholderText('Name');
    await act(async () => {
      await userEvent.type(nameInput, 'nametest');
    });
    const emailInput = await screen.getByPlaceholderText('Email');
    await act(async () => {
      await userEvent.type(emailInput, 'emailtest');
    });
    const passwordInput = await screen.getByPlaceholderText('Password');
    await act(async () => {
      await userEvent.type(passwordInput, 'passwordtest');
    });
    const registerButton = await screen.getByRole('button', {
      name: 'Register',
    });

    // Action
    await act(async () => {
      await userEvent.click(registerButton);
    });

    // Assert
    await waitFor(() => expect(mockRegister).toBeCalledWith({
      name: 'nametest',
      email: 'emailtest',
      password: 'passwordtest',
    }));
  });
});
