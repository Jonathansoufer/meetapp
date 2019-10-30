import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, EmptyText } from './styles';

Icon.loadFont();

export default function EmptyList() {
  return (
    <Container>
      <Icon name="list" color="rgba(255, 255, 255, 0.6)" size={120} />
      <EmptyText>You don't have any subscription at his moment.</EmptyText>
    </Container>
  );
}
