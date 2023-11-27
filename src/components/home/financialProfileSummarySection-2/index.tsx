
       
import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import { useFinance } from 'react-native-financial-profile-component';
import { useUser } from 'react-native-user-profile-component';
import useMergeStyles from './styles';

     
const FinancialProfileSummaryComponent = ({ fields }) => {

      

      
      
  const styles = useMergeStyles();
  const { financialProfileDetails, fetchFinancialProfile } = useFinance();
  const { userDetails } = useUser();

    

      
      
  useEffect(() => {
    if (userDetails) {
      fetchFinancialProfile(userDetails.userId)
    }
  }, [userDetails]);

    


      
      
    return (
      <View style={styles.container}>
        {/* Card Field: Total Balance and User Summary (showing only one item) */}
        <View style={styles.cardWrapper}>
          <View
            style={[
              styles.card,
              styles.activeCard,
            ]}
          >

  {/* cardTitle - Total Available */}
        <View
          testID={'cardTitle-totalBalance'}
        >
          <Text style={styles.title}>Total Available</Text>
        </View>{/* currencyField - Available balance */}
        {<View>
            <Text style={styles.balance}>
              {financialProfileDetails ? financialProfileDetails.currency+' ': 'SGD '}
              {financialProfileDetails ? financialProfileDetails.totalAvailableBalance.toFixed(2) : '$0.00'}
            </Text>
          </View>}
          </View>
        </View>
    </View>);
    
}
export default FinancialProfileSummaryComponent;