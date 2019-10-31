import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parse, parseISO, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import Header from '~/components/Header';
import { Container, Filter, Day, List } from './styles';

Icon.loadFont();

export default function Dashboard({ navigation }) {
  const [page, setPage] = useState(1);
  const [meetups, setMeetups] = useState([]);
  const [filterDate, setFilterDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [needToLoad, setNeedToLoad] = useState(true);

  useEffect(() => {
    async function loadMeetups() {
      if (needToLoad) {
      }

      const [response, subs] = await Promise.all([
        api.get(`meetups/list?date=${filterDate}&page=${page}`),
        api.get('subscriptions'),
      ]);

      if (response.data.length === 0) {
        if (page === 1) {
          setMeetups([]);
        }
        return;
      }

      const data = response.data.map(meetup => ({
        ...meetup,
        formatedDate: format(
          parseISO(meetup.date),
          "dd 'de' MMMMMMMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        userSubscribed:
          subs.data.filter(sub => sub.id === meetup.id).length > 0,
      }));
      if (page === 1) {
        setMeetups(data);
      } else {
        setMeetups(m => [...m, ...data]);
      }
    }

    loadMeetups();
  }, [filterDate, needToLoad, page]);

  async function handleSubscription(id) {
    try {
      await api.post(`subscriptions/${id}`);
      navigation.navigate('Subscriptions');
    } catch (err) {
      Alert.alert('Erro...', err.response.data.error);
    }
  }

  function onSubDay() {
    setMeetups([]);
    setPage(1);
    setFilterDate(
      format(
        subDays(parse(filterDate, 'yyyy-MM-dd', new Date()), 1),
        'yyyy-MM-dd'
      )
    );
  }

  function onAddDay() {
    setMeetups([]);
    setPage(1);
    setFilterDate(
      format(
        addDays(parse(filterDate, 'yyyy-MM-dd', new Date()), 1),
        'yyyy-MM-dd'
      )
    );
  }

  function handleEndReached() {
    if (meetups.length >= 10) {
      setPage(page + 1);
    }
  }

  return (
    <Background>
      <NavigationEvents
        onWillFocus={() => {
          if (page > 1) {
            setPage(1);
          } else {
            setNeedToLoad(!needToLoad);
          }
        }}
      />
      <Header />
      <Container>
        <Filter>
          <TouchableOpacity onPress={onSubDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <Day>
            {format(
              parse(filterDate, 'yyyy-MM-dd', new Date()),
              "dd 'de' MMMMMMMMM'",
              {
                locale: pt,
              }
            )}
          </Day>
          <TouchableOpacity onPress={onAddDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </Filter>
        <List
          data={meetups}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              onPressAction={() => handleSubscription(item.id)}
              data={item}
              buttonDescription="Realizar Inscrição"
              subscribed={item.userSubscribed}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
