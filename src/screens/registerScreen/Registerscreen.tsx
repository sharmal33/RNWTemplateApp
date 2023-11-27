import React, { useRef, useContext, useEffect, useState } from 'react';
  import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
  import { Layouts } from 'react-native-theme-component';
  
  const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation, route }) => {
  
    return (
      <SafeAreaView style={styles.container}>
      <Layouts type='form'>
         <Text>RegisterScreen</Text>
    </Layouts>
      </SafeAreaView>
    );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default RegisterScreen