import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMa from 'react-native-vector-icons/MaterialIcons';

import Button from '~/components/Button';

import {
  Container,
  Image,
  Title,
  Content,
  ContentText,
  CardBody,
  IconAndText,
} from './styles';

Icon.loadFont();

export default function MeetUpCard({
  meetup,
  onMainButtonPress,
  mainButtonText,
}) {
  const { banner, title, formattedDate, location, owner } = meetup;

  return (
    <Container>
      <Image source={{ uri: banner.url }} />
      <CardBody>
        <Title>{title}</Title>
        <Content>
          <IconAndText>
            <Icon name="calendar" size={24} color="#555" />
            <ContentText>{formattedDate}</ContentText>
          </IconAndText>
          <IconAndText>
            <IconMa name="pin-drop" size={24} color="#555" />
            <ContentText>{location}</ContentText>
          </IconAndText>
          <IconAndText>
            <IconMa name="person-outline" size={24} color="#555" />
            <ContentText>Organizer: {owner.name}</ContentText>
          </IconAndText>
        </Content>
        <Button onPress={onMainButtonPress}>{mainButtonText}</Button>
      </CardBody>
    </Container>
  );
}

MeetUpCard.propTypes = {
  meetup: PropTypes.shape({
    banner: PropTypes.object,
    title: PropTypes.string,
    formattedDate: PropTypes.string,
    location: PropTypes.string,
    owner: PropTypes.object,
    id: PropTypes.number,
  }).isRequired,
  onMainButtonPress: PropTypes.func,
  mainButtonText: PropTypes.string.isRequired,
};

MeetUpCard.defaultProps = {
  onMainButtonPress: () => {},
};
