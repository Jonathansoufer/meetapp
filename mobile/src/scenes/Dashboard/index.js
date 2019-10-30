import React, { useEffect, useState, useMemo } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { format, subDays, addDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { showMessage } from 'react-native-flash-message';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import MeetUpCard from '~/components/MeetUpCard';
import EmptyList from './components/EmptyList';

import {
  Container,
  MeetUpsList,
  PageTitleContainer,
  PageTitle,
  LoaderContainer,
} from './styles';

Icon.loadFont();

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function formatMeetUpsDate(noFormattedMeetups) {
    return noFormattedMeetups.map(meetup => ({
      ...meetup,
      formattedDate: format(
        parseISO(meetup.date_time),
        "d 'de' MMMM 'de' yyyy 'às' HH:mm",
        { locale: pt }
      ),
    }));
  }

  useEffect(() => {
    async function getMeetups() {
      setIsLoading(true);
      const response = await api.get('/meetups/date', {
        params: {
          date: date.toISOString(),
        },
      });

      setMeetups(formatMeetUpsDate(response.data));
      setIsLoading(false);
    }

    if (isFocused) {
      getMeetups();
    }
  }, [date, isFocused]); // eslint-disable-line

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function handleSubscription({ id, title }) {
    try {
      await api.post('subscriptions', null, {
        params: { meetUpId: id },
      });

      setMeetups(meetups.filter(meetup => meetup.id !== id));

      showMessage({
        message: `Congratulations, You successful subscribed to ${title} meetup.`,
        type: 'success',
      });
    } catch (err) {
      showMessage({
        message: err.response.data.userMessage,
        type: 'danger',
      });
    }
  }

  async function loadMoreMeetUps() {
    const nextPage = page + 1;

    const response = await api.get('/meetups/date', {
      params: {
        date: date.toISOString(),
        page: nextPage,
      },
    });

    setMeetups([...meetups, ...formatMeetUpsDate(response.data)]);
    setPage(nextPage);
  }

  function renderMeetups() {
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
        onEndReachedThreshold={0.2}
        onEndReached={loadMoreMeetUps}
        renderItem={({ item }) => (
          <MeetUpCard
            meetup={item}
            onMainButtonPress={() => handleSubscription(item)}
            mainButtonText="Subscribe"
          />
        )}
        ListEmptyComponent={<EmptyList />}
      />
    );
  }

  return (
    <Background>
      <Container>
        <PageTitleContainer>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="keyboard-arrow-left" size={28} color="#fff" />
          </TouchableOpacity>
          <PageTitle>{dateFormatted}</PageTitle>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="keyboard-arrow-right" size={28} color="#fff" />
          </TouchableOpacity>
        </PageTitleContainer>
        {renderMeetups()}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  title: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
