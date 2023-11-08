import React, { useRef, useContext, useEffect, useState } from 'react';
  import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
  

  const Registerscreen: React.FC<RegisterscreenProps> = ({ navigation, route }) => {
  

    return (
      <SafeAreaView style={styles.container}>
         <Text>Registerscreen</Text>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  "container": {
    "flex": 1
  }
});

export default Registerscreen