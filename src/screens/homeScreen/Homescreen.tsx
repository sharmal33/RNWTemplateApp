import React, { useRef, useContext, useEffect, useState } from 'react';
  import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
  import { Layouts } from 'react-native-theme-component';
  import { useNavigation } from '@react-navigation/native';
import Route from '@/navigation/routes';
import { fonts } from '@/assets/fonts';
import UserProfileSummaryTemplate from '@/components/home/userProfileSummarySection-1';
import { colors } from '@/assets/Colors';
import { Button } from 'react-native-theme-component';
import FinancialProfileSummaryTemplate from '@/components/home/financialProfileSummarySection-2';
import ButtonGroupTemplate from '@/components/home/buttonGroupSection-3';
import {useConditions} from 'react-native-branch-component';
  const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const { defCond } = useConditions()
    return (
      <SafeAreaView style={styles.container}>
      <Layouts type='form'>
          <>
            <UserProfileSummaryTemplate />
        </>
        <>
            <FinancialProfileSummaryTemplate />
        </>
        <>
            <ButtonGroupTemplate />
        </>
    </Layouts>
      </SafeAreaView>
    );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default HomeScreen