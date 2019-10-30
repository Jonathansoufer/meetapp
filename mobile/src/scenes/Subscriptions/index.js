import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { format, parseISO } from 'date-fns';
import { ActivityIndicator } from 'react-native';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { showMessage } from 'react-native-flash-message';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import MeetUpCard from '~/components/MeetUpCard';
import EmptySubscriptionList from './components/EmptySubscriptionsList';

import { Container, MeetUpsList, LoaderContainer } from './styles';

import api from '~/services/api';

Icon.loadFont();

function Subscriptions({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getSubscribedMeetups() {
      setIsLoading(true);
      const response = await api.get('subscriptions');

      const subscribedMeetups = response.data.map(sub => ({
        ...sub.meetup,
        formattedDate: format(
          parseISO(sub.meetup.date_time),
          "d 'de' MMMM 'de' yyyy 'às' HH:mm",
          { locale: pt }
        ),
      }));

      setMeetups(subscribedMeetups);
      setIsLoading(false);
    }

    if (isFocused) {
      getSubscribedMeetups();
    }
  }, [isFocused]); //eslint-disable-line

  async function handleCancelClick({ id, title }) {
    try {
      await api.delete('subscriptions', {
        params: { meetUpId: id },
      });

      setMeetups(meetups.filter(meetup => meetup.id !== id));

      showMessage({
        message: `Your subscription to the meetup ${title} has been canceled.`,
        type: 'success',
      });
    } catch (err) {
      showMessage({
        message: 'Action Failed. Please try again later.',
        type: 'danger',
      });
    }
  }

  function renderSubscriptions() {
    if (isLoading) {
      return (
        <LoaderContainer>
          <ActivityIndicator size="large" color="#fff" />
        </LoaderContainer>
      );
    }

    return (
      <MeetUpsList
        data={meetups}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <MeetUpCard
            meetup={item}
            mainButtonText="Cancel"
            onMainButtonPress={() => handleCancelClick(item)}
          />
        )}
        ListEmptyComponent={<EmptySubscriptionList />}
      />
    );
  }

  return (
    <Background>
      <Container>{renderSubscriptions()}</Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  title: 'Subscriptions',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="playlist-add-check" size={30} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
