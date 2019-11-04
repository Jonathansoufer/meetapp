import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';
import { showMessage } from 'react-native-flash-message';
import PropTypes from 'prop-types';
import api from '~/services/api';

import Header from '~/components/Header';
import Background from '~/components/Background';
import Loading from '~/components/Loading';
import Empty from '~/components/Empty';
import Card from '~/components/Card';

import { Container, List } from './styles';

function Registration({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('subscriptions');
      const data = response.data.map(subs => {
        return {
          id: subs.id,
          title: subs.meetup.title,
          localization: subs.meetup.location,
          user: subs.meetup.organizer.name,
          banner: subs.meetup.banner,
          date: format(parseISO(subs.meetup.date), "d 'de' MMMM', às ' h'h'", {
            locale: pt,
          }),
        };
      });
      setSubscriptions(data);
      setLoading(false);
    }

    loadRegistrations();
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`subscriptions/${id}`);
      setSubscriptions(subscriptions.filter(r => r.id !== id));

      showMessage({
        message: 'Subscription',
        description: `Subscription successful canceled.`,
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Subscription not canceled. Please try again.',
        description: `${error.response.data.error}`,
        type: 'danger',
      });
    }
  }

  return (
    <Background>
      <Container>
        <Header />

        {loading && <Loading />}
        {subscriptions.length > 0 ? (
          <List
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Card data={item} cancel={() => handleCancel(item.id)} />
            )}
          />
        ) : (
          <Empty message="You didn't subscribed any meetup yet!" />
        )}
      </Container>
    </Background>
  );
}

Registration.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={24} color={tintColor} />
  ),
};

export default withNavigationFocus(Registration);

Registration.propTypes = {
  isFocused: PropTypes.bool,
};

Registration.defaultProps = {
  isFocused: false,
};
