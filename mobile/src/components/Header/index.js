import React from 'react';
import { Image } from 'react-native';
import { Head } from './styles';
import logo from '~/assets/logo.png';

export default function Header() {
  return (
    <Head>
      <Image source={logo} />
    </Head>
  );
}
