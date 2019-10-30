import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
  email: Yup.string()
    .email('Invalid E-mail Address')
    .required('E-mail Address is required.'),
  password: Yup.string()
    .min(6, 'Your password must have minimum of 6 positions.')
    .required('Password is required.'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="MeetApp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Name" />

        <Input name="email" type="email" placeholder="E-mail" />

        <Input name="password" type="password" placeholder="Password" />

        <button type="submit" disabled={loading}>
          Sign Up
        </button>

        <p>
          Already have account?
          <Link to="/">Sign In </Link>
        </p>
      </Form>
    </>
  );
}
