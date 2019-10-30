import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, EmptyText } from './styles';

Icon.loadFont();

export default function EmptyList() {
  return (
    <Container>
      <Icon name="hourglass-empty" color="rgba(255, 255, 255, 0.3)" size={60} />
      <EmptyText>You don't have any meetup scheduled for today.</EmptyText>
    </Container>
  );
}
