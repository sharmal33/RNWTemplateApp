import React, { useRef, useContext, useEffect, useState } from 'react';
  import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
  import { Layouts } from 'react-native-theme-component';
  import { useRoute } from '@react-navigation/native';
import { fonts } from '@/assets/fonts';
import { AccountSummaryComponent } from 'react-native-dashboard-component';
import { colors } from '@/assets/Colors';
const customStyles = {
  container: {
    backgroundColor: colors.LightGrayBackground,
    flex: 1,
  },
  part1: {
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: colors.LightGrayBackground,
    borderBottomWidth: 1,
    borderColor: colors.Gray,
  },
  card: {
    backgroundColor: colors.White,
    borderRadius: 10,
    padding: 12,
    marginRight: 8,
    minHeight: 150,
    justifyContent: 'center',
  },
  activeCard: {
    borderColor: colors.Blue,
    borderWidth: 2,
  },
  title: {
    fontSize: 16,
    color: colors.BlackHeading,
    fontFamily: fonts.bold,
  },
  balance: {
    fontSize: 20,
    marginTop: 8,
    color: colors.Pink,
    fontFamily: fonts.medium,
  },
  userInfo: {
    fontSize: 14,
    marginTop: 8,
    color: colors.GraySubtitle,
    fontFamily: fonts.regular,
  },
  part2: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.LightGrayBackground,
    paddingTop: 20,
  },
  actionItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom:5
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
    height: 70,
  },
  actionText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    color: colors.White,
    fontFamily: fonts.regular,
  },
};
import {useConditions} from 'react-native-branch-component';
  const AccountSummaryScreen: React.FC<AccountSummaryScreenProps> = ({ navigation, route }) => {
     const { isFinance } = route.params;

   const [showDeposit, setShowDeposit] = useState(!isFinance);
   const [showFinance, setShowFinance] = useState(isFinance);

   const toggleDeposit = () => {
     setShowDeposit(!showDeposit);
   };

   const toggleFinance = () => {
     setShowFinance(!showFinance);
   };
const { defCond } = useConditions()
    return (
      <SafeAreaView style={styles.container}>
      <Layouts type='form'>
          <>
            <View style={{flex: 1}}>
               <AccountSummaryComponent
                  colors={colors}
                  styles={customStyles}
                  showDeposit={showDeposit}
                  showFinance={showFinance}
                /> 
            </View>
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
export default AccountSummaryScreen