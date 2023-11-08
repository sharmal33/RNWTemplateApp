import React, { useRef, useContext, useEffect, useState } from 'react';
  import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
import Route from '@/navigation/routes';
import { fonts } from '@/assets/fonts';
import { UserProfile } from '@/components';
import { colors } from '@/assets/Colors';
import { Button,Layouts } from 'react-native-theme-component';

const Homescreen: React.FC<HomescreenProps> = ({ navigation, route }) => {
    const handleButtonPress = (showFinance: boolean) => {
    // Navigate to the Dashboard screen with the button name as a parameter
    // navigation.navigate('Dashboard', { isFinance: showFinance });
    navigation.navigate(Route.BOTTOM_NAVIGATOR, {
        screen: Route.ACCOUNT_SUMMARY_SCREEN,
        params: { isFinance: showFinance },
      });
  };

    return (
      <>
        <Layouts type="form">
           <UserProfile />
        </Layouts>
        <Layouts type="bottom-sticky-content">
          <Button
            testID={'btn-deposit'}
            label='Deposit'
            onPress={() => handleButtonPress(false)}
            variant= 'primary'
            style={{
              primaryContainerStyle: {
                flex: 1,
                marginHorizontal:20
              }
            }}
          />
          <Button
            testID={'btn-finance'}
            label='Finance'
            onPress={() => handleButtonPress(true)}
            variant= 'primary'
            style={{
              primaryContainerStyle: {
                flex: 1,
                marginHorizontal:20
              }
            }}
          />
        </Layouts>
    </>
    );
  };

const styles = StyleSheet.create({
  "container": {
    "flex": 1
  }
});

export default Homescreen
