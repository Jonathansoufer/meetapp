import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 4px;
  background: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  opacity: ${props => (props.subscribed ? 0.8 : 1)};
`;

export const Banner = styled.Image`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  width: 100%;
  height: 150px;
`;

export const Detail = styled.View`
  padding: 20px;
`;

export const Info = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 18px;
  font-weight: bold;
`;

export const Text = styled.Text`
  margin-left: 10px;
  color: #999;
  font-size: 13px;
`;

export const Footer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const Button = styled(RectButton)`
  height: 50px;
  width: 310px;
  background: #f94d6a;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;
