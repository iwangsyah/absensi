import React from 'react';
import { Image, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import StackViewStyleInterpolator from 'react-navigation-stack/lib/module/views/StackView/StackViewStyleInterpolator';
import * as Screen from '../screens';
import Store from '../util/Store';
import { Theme, BottomTabBar } from '../styles';

const AppStack = createStackNavigator(
  {
    Home: Screen.Home,
    Attendance: Screen.Attendance,
    Location: Screen.Location,
  },
  {
    headerMode: 'Home',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Screen.Login,
    }
  },
  {
    headerMode: 'Login',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const Routes = createSwitchNavigator(
  {
    AuthLoading: Screen.AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AppContainer = createAppContainer(Routes);

export default class Router extends React.Component {
  render() {
    return (
      <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}