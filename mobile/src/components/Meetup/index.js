import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  Detail,
  Info,
  Title,
  Text,
  Footer,
  Button,
  ButtonText,
} from './styles';

export default function Meetup({
  data,
  onPressAction,
  buttonDescription,
  subscribed,
}) {
  //  const banner_url = data.banner.url;
  return (
    <Container subscribed={subscribed}>
      {data.banner ? (
        <Banner
          source={{
            uri: data.banner.url.replace(/localhost/, '10.0.2.2'),
          }}
        />
      ) : (
        <></>
      )}
      <Detail>
        <Title>{data.title}</Title>
        <Info>
          <Icon name="event" size={18} color="#999" />
          <Text>{data.formatedDate}</Text>
        </Info>
        <Info>
          <Icon name="location-on" size={18} color="#999" />
          <Text>{data.location}</Text>
        </Info>
        <Info>
          <Icon name="person" size={18} color="#999" />
          <Text>Organizador: {data.organizer.name}</Text>
        </Info>
      </Detail>
      <Footer>
        {!subscribed ? (
          <Button onPress={onPressAction}>
            <ButtonText>{buttonDescription}</ButtonText>
          </Button>
        ) : (
          <></>
        )}
      </Footer>
    </Container>
  );
}
