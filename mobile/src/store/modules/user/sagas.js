import { takeLatest, call, put, all } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import { updateProfileSuccess, updateProfileFailure } from './actions';

import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, '/users', profile);

    yield put(updateProfileSuccess(response.data));
    showMessage({ message: 'Profile successful updated!', type: 'success' });
  } catch (err) {
    yield put(updateProfileFailure());
    showMessage({
      message: 'Profile not updated, Please try again later!',
      type: 'danger',
    });
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
