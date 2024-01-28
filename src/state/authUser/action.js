import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

const setAuthUser = (authUser) => ({
  type: ActionType.SET_AUTH_USER,
  payload: {
    authUser,
  },
});

const unsetAuthUser = () => ({
  type: ActionType.UNSET_AUTH_USER,
});

const asyncSetAuthUser = ({ email, password }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const token = await api.login({ email, password });
    api.setAccessToken(token);
    const authUser = await api.getProfile();
    dispatch(setAuthUser(authUser));
  } catch (error) {
    console.log(error);
  }
  dispatch(hideLoading());
};

const asyncUnsetAuthUser = () => async (dispatch) => {
  dispatch(unsetAuthUser());
  api.setAccessToken('');
};

export {
  ActionType,
  setAuthUser,
  unsetAuthUser,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
