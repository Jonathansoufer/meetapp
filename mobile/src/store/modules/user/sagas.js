import { takeLatest, call, put, all } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import api from '~/services/api';
import { updateProfileSuccess, updateProfilefailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;
    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    showMessage({
      message: 'Profile',
      description: 'Profile successful updated.',
      type: 'success',
    });

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    showMessage({
      message: 'Profile',
      description: 'Error updating your Profile. Please try again later.',
      type: 'danger',
    });
    yield put(updateProfilefailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
