import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import Header from '~/components/Header';
import { Container, List } from './styles';

Icon.loadFont();

export default function Subscriptions({ navigation }) {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('subscriptions');
      const data = response.data.map(subs => ({
        ...subs,
        formatedDate: format(
          parseISO(subs.date),
          "dd 'de' MMMMMMMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      }));
      setSubscriptions(data);
    }
    loadSubscriptions();
    navigation.addListener('didFocus', () => {
      loadSubscriptions();
    });
  }, [navigation]);

  async function handleCancellation(id) {
    try {
      await api.delete(`subscriptions/${id}`);
      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert('Erro...', err.response.data.error);
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <List
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              onPressAction={() => handleCancellation(item.id)}
              data={item}
              buttonDescription="Cancelar Inscrição"
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="tag" size={20} color={tintColor} />
  ),
};
