import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';
import Home from './pages/Home';
import Login from './pages/Login';
import Message from './pages/Message';
import Chat from './pages/Chat';

const routes = {
    Home: {
        screen: Home,
        navigationOptions: () => ({
            tabBarLabel: '联系人',
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name='people'
                    size={26}
                    color={tintColor}
                />
            )
        })
    },
    Message: {
        screen: Message,
        navigationOptions: () => ({
            tabBarLabel: '消息',
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name='message'
                    size={26}
                    color={tintColor}
                />
            )
        })
    },
};

const BottomNavigator = createBottomTabNavigator(routes, {
    initialRouteName: 'Home',
    tabBarOptions: {
        activeTintColor: '#e91e63',
        labelStyle: {
            fontSize: 12,
        },
    }
});
const AuthNavigator = createStackNavigator({
    Login: {
        screen: Login
    }
}, {
    headerMode: 'none'
});
const AppNavigator = createStackNavigator({
    BottomNavigator: {
        screen: BottomNavigator
    },
    Chat: {
        screen: Chat,
    }
}, {
    initialRouteName: 'BottomNavigator',
    headerMode: "none"
})


export default createSwitchNavigator({
    App: AppNavigator,
    Auth: AuthNavigator
}, {
    initialRouteName: 'Auth'
});
