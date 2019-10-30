import React from 'react';
import { Image } from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import SignIn from './scenes/SignIn';
import SignUp from './scenes/SignUp';

import Dashboard from './scenes/Dashboard';
import Profile from './scenes/Profile';
import Subscriptions from './scenes/Subscriptions';

import logo from '~/assets/logo.png';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createStackNavigator(
          {
            Index: createBottomTabNavigator(
              {
                Dashboard,
                Subscriptions,
                Profile,
              },
              {
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: '#fff',
                  inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
                  style: {
                    backgroundColor: '#402845',
                    borderTopColor: 'transparent',
                  },
                },
              }
            ),
          },
          {
            defaultNavigationOptions: {
              headerStyle: {
                backgroundColor: '#22202c',
                elevation: 0,
              },
              headerTintColor: '#fff',
              headerTitle: (
                <Image
                  source={logo}
                  style={{
                    width: 35,
                    height: 35,
                    flex: 1,
                    paddingBottom: 10,
                  }}
                  resizeMode="contain"
                />
              ),
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
