import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { style } from './style';
import MainPage from './Main';
import LoginPage from './auth/Login'
import RegisterPage from './auth/Register'

const MainStack = createStackNavigator({
    Main: {
        screen: MainPage,
        navigationOptions: {
            title: 'Tokokom',
            headerStyle: style.backgroundPrimary,
            headerTitleStyle: [style.bold, style.white],
            headerTintColor: '#FFFFFF'
        }
    },
    Login: {
        screen: LoginPage,
        navigationOptions: {
            title: 'Login',
            headerStyle: style.backgroundPrimary,
            headerTitleStyle: [style.bold, style.white],
            headerTintColor: '#FFFFFF'
        }
    },
    Register: {
        screen: RegisterPage,
        navigationOptions: {
            title: 'Register',
            headerStyle: style.backgroundPrimary,
            headerTitleStyle: [style.bold, style.white],
            headerTintColor: '#FFFFFF'
        }
    }
},
    {
        initialRouteName: 'Main',
    })

export default MainStack;
