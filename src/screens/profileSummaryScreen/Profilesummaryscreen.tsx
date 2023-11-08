import React, { useRef, useContext, useEffect, useState } from 'react';
  import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
  

  const Profilesummaryscreen: React.FC<ProfilesummaryscreenProps> = ({ navigation, route }) => {
  

    return (
      <SafeAreaView style={styles.container}>
         <Text>Profilesummaryscreen</Text>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  "container": {
    "flex": 1
  }
});

export default Profilesummaryscreen