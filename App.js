import {
  Provider
} from 'mobx-react';
import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import store from './src/store';
import AppSwitchNavigator from './src/router';

const AppNavigatorContainer = createAppContainer(AppSwitchNavigator);

export function setup() {
  return class Root extends Component {
    render() {
      return (
        <Provider {...store}>
          <AppNavigatorContainer />
        </Provider>
      )
    }
  }
}

export default setup;
