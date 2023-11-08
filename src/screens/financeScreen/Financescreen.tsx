import React, {useRef, useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const Financescreen: React.FC<FinancescreenProps> = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Financescreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Financescreen;
