import React, { useRef, useContext, useEffect, useState } from 'react';
  import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
  import { Layouts } from 'react-native-theme-component';
  import { StackNavigationProp } from '@react-navigation/stack';
import { AuthRoutes } from '@/navigation/routes/AuthRoutes';
import Route from '@/navigation/routes';
import { LoginComponent } from 'react-native-auth-component';
import { colors } from '@/assets/Colors';
  const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {
  
    return (
      <SafeAreaView style={styles.container}>
      <Layouts>
       <LoginComponent
       loginSuccess={() => {
         navigation.navigate(Route.HOME_SCREEN);
       }}
       colors={colors}
       title={'Welcome to App studio'}
     />
    </Layouts>
      </SafeAreaView>
    );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default LoginScreen