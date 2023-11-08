import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {AppNavigatorParams} from './AppNavigator';
import Route from './routes';

import Loginscreen from '@/screens/loginScreen/Loginscreen';
import Registerscreen from '@/screens/registerScreen/Registerscreen';

import {AuthRoutes} from './routes/AuthRoutes';

export type AuthNavigatorParams = AppNavigatorParams & {
  [Route.LOGIN_SCREEN]: undefined;
  [Route.REGISTER_SCREEN]: undefined;
};

export interface LoginscreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, Route.LOGIN_SCREEN>;
  route: RouteProp<AuthNavigatorParams, Route.LOGIN_SCREEN>;
}
export interface RegisterscreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, Route.REGISTER_SCREEN>;
  route: RouteProp<AuthNavigatorParams, Route.REGISTER_SCREEN>;
}

const Stack = createStackNavigator<AuthNavigatorParams>();

const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName={Route.LOGIN_SCREEN}
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
    <Stack.Screen
      name={Route.LOGIN_SCREEN}
      component={Loginscreen}
      options={({route}) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen
      name={Route.REGISTER_SCREEN}
      component={Registerscreen}
      options={({route}) => ({
        headerShown: false,
      })}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
