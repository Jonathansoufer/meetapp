import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

import Dashboard from './screens/Dashboard';
import Registration from './screens/Registration';

import Profile from './screens/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Registration,
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                borderTopColor: '#2B1A2F',
                backgroundColor: '#2B1A2F',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
