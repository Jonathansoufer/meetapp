import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { logInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid E-mail')
    .required('E-mail is required'),
  password: Yup.string().required('Password is required'),
});

export default function LogIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(logInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="MeetApp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="E-mail" />

        <Input name="password" type="password" placeholder="Password" />

        <button type="submit" disabled={loading}>
          Sign In
        </button>

        <p>
          Don't have an account yet?
          <Link to="/register">Sign Up</Link>
        </p>
      </Form>
    </>
  );
}
