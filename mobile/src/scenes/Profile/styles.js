import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 30px;
`;

export const Form = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'scroll',
})`
  align-self: stretch;
  margin-top: 20px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin: 5px 0;
`;

export const Divisor = styled.View`
  height: 2px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 20px 0;
  width: 100%;
`;

export const LogoutButton = styled(Button)`
  margin: 5px 0;
  background-color: #d44059;
  width: 100%;
`;
