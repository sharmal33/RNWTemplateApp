import React, {useEffect, useContext} from 'react';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import ArrowBackSvg from '../assets/images/arrow-back.svg';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Route from './routes';

import Homescreen from '@/screens/userProfileScreen/UserProfilescreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccountSummaryScreenSvg from '../assets/images/account-summary-screen-icon.svg';
import FinanceScreenSvg from '../assets/images/finance-screen-icon.svg';
import ProfileSummaryScreenSvg from '../assets/images/profile-summary-screen-icon.svg';

import {DashboardRoutes} from './routes/DashboardRoutes';
import {HomeRoutes} from './routes/HomeRoutes';

type MainTabsNavigatorParams = {
  [Route.ACCOUNT_SUMMARY_SCREEN]: AccountsummaryscreenParams;
  [Route.FINANCE_SCREEN]: FinancescreenParams;
  [Route.PROFILE_SUMMARY_SCREEN]: ProfilesummaryscreenParams;
};

export interface AccountSummaryScreenProps {
  navigation: StackNavigationProp<
    MainNavigatorParams & MainTabsNavigatorParams,
    Route.ACCOUNT_SUMMARY_SCREEN
  >;
  route: RouteProp<
    MainNavigatorParams & MainTabsNavigatorParams,
    Route.ACCOUNT_SUMMARY_SCREEN
  >;
}

export interface FinanceScreenProps {
  navigation: StackNavigationProp<
    MainNavigatorParams & MainTabsNavigatorParams,
    Route.FINANCE_SCREEN
  >;
  route: RouteProp<
    MainNavigatorParams & MainTabsNavigatorParams,
    Route.FINANCE_SCREEN
  >;
}

export interface ProfileSummaryScreenProps {
  navigation: StackNavigationProp<
    MainNavigatorParams & MainTabsNavigatorParams,
    Route.PROFILE_SUMMARY_SCREEN
  >;
  route: RouteProp<
    MainNavigatorParams & MainTabsNavigatorParams,
    Route.PROFILE_SUMMARY_SCREEN
  >;
}

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <BottomTab.Navigator initialRouteName={Route.HOME_SCREEN}>
    <BottomTab.Screen
      name={Route.ACCOUNT_SUMMARY_SCREEN}
      component={Accountsummaryscreen}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({color, size}) => {
          return (
            <AccountSummaryScreenSvg width={size} height={size} fill={color} />
          );
        },
      }}
    />
    <BottomTab.Screen
      name={Route.FINANCE_SCREEN}
      component={Financescreen}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({color, size}) => {
          return <FinanceScreenSvg width={size} height={size} fill={color} />;
        },
      }}
    />
    <BottomTab.Screen
      name={Route.PROFILE_SUMMARY_SCREEN}
      component={Profilesummaryscreen}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({color, size}) => {
          return (
            <ProfileSummaryScreenSvg width={size} height={size} fill={color} />
          );
        },
      }}
    />
  </BottomTab.Navigator>
);
import Accountsummaryscreen from '@/screens/accountSummaryScreen/Accountsummaryscreen';
import Financescreen from '@/screens/financeScreen/Financescreen';
import Profilesummaryscreen from '@/screens/profileSummaryScreen/Profilesummaryscreen';
export type MainNavigatorParams = {
  [Route.BOTTOM_NAVIGATOR]: undefined;
  [Route.HOME_SCREEN]: undefined;
};

export interface HomescreenProps {
  navigation: StackNavigationProp<
    MainNavigatorParams & MainTabsNavigatorParams,
    Route.HOME_SCREEN
  >;
  route: RouteProp<
    MainNavigatorParams & MainTabsNavigatorParams,
    Route.HOME_SCREEN
  >;
}

const Stack = createStackNavigator<MainNavigatorParams>();

export const defaultBackButton = (navigation: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.backIcon}
      onPress={() => {
        navigation.goBack();
      }}>
      <ArrowBackSvg width={18} height={18} fill="#000" />
    </TouchableOpacity>
  );
};

function getTabTitle(route: any) {
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? Route.ACCOUNT_SUMMARY_SCREEN;
  switch (routeName) {
    case Route.ACCOUNT_SUMMARY_SCREEN:
      return 'AccountSummaryScreen';
    case Route.FINANCE_SCREEN:
      return 'FinanceScreen';
    case Route.PROFILE_SUMMARY_SCREEN:
      return 'ProfileSummaryScreen';
    default:
      break;
  }
  return '';
}

function getHeaderVisible(route: any) {
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? Route.ACCOUNT_SUMMARY_SCREEN;
  return (
    routeName !== Route.ACCOUNT_SUMMARY_SCREEN ||
    routeName !== Route.FINANCE_SCREEN ||
    routeName !== Route.PROFILE_SUMMARY_SCREEN
  );
}

const MainNavigator = ({navigation}: any) => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerLeft: props => props.canGoBack && defaultBackButton(navigation),
      }}
      initialRouteName={Route.HOME_SCREEN}>
      <Stack.Screen
        name={Route.HOME_SCREEN}
        component={Homescreen}
        options={({route}) => ({
          title: '',
          headerShown: true,
        })}
      />
      <Stack.Screen
        name={Route.BOTTOM_NAVIGATOR}
        component={BottomTabNavigator}
        options={({route}: any) => ({
          headerShown: getHeaderVisible(route),
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    paddingVertical: 15,
    paddingHorizontal: 24,
  },
});

export default MainNavigator;
