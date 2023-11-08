import React, {useRef, useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthRoutes} from '@/navigation/routes/AuthRoutes';
import Route from '@/navigation/routes';
import {LoginComponent} from 'react-native-auth-component';
import {colors} from '@/assets/Colors';

const Loginscreen: React.FC<LoginscreenProps> = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <LoginComponent
        loginSuccess={() => {
          navigation.navigate(Route.HOME_SCREEN);
        }}
        colors={colors}
        title={'Welcome to App studio'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Loginscreen;
