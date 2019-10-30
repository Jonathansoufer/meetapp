import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdExitToApp } from 'react-icons/md';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  const schema = Yup.object().shape({
    avatar_id: Yup.number(),
    name: Yup.string().required('Name is required.'),
    email: Yup.string()
      .email('Invalid E-mail Address')
      .required('E-mail Address is required.'),
    oldPassword: Yup.string().when('password', (password, field) =>
      password ? field.required('Current password is required.') : field
    ),
    password: Yup.string()
      .transform(value => (!value ? null : value))
      .nullable()
      .min(6, 'Your new password must have minimum of 6 positions.'),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password
        ? field.required().oneOf([Yup.ref('password')], 'Password doesnt match')
        : field
    ),
  });

  return (
    <Container>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Full Name" />
        <Input name="email" placeholder="E-mail" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Current Password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Update</button>
      </Form>

      <button type="submit" onClick={handleSignOut}>
        Logout
        <MdExitToApp color="#fff" size={20} />
      </button>
    </Container>
  );
}
