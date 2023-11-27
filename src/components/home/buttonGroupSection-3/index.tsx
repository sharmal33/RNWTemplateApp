
       
import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import { useFinance } from 'react-native-financial-profile-component';
import { useUser } from 'react-native-user-profile-component';
import useMergeStyles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

     
const ButtonGroupComponent = ({ fields }) => {

      

      
      
  const styles = useMergeStyles();

    

      
      
    


      
      
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.actionItems}>{/* buttonField - Transfer */}
        <TouchableOpacity
          testID={'buttonField-transfer'}
          style={styles.actionButton}>
            <Icon name="history" size={32} color="white" />
            <Text style={styles.actionText}>transfer</Text>
        </TouchableOpacity>
        {/* buttonField - Rewards */}
        <TouchableOpacity
          testID={'buttonField-rewards'}
          style={styles.actionButton}>
            <Icon name="file-text-o" size={32} color="white" />
            <Text style={styles.actionText}>rewards</Text>
        </TouchableOpacity>
        {/* buttonField - Islamic */}
        <TouchableOpacity
          testID={'buttonField-islamic'}
          style={styles.actionButton}>
            <Icon name="plus-circle" size={32} color="white" />
            <Text style={styles.actionText}>islamic</Text>
        </TouchableOpacity>
        {/* buttonField - Bills */}
        <TouchableOpacity
          testID={'buttonField-bills'}
          style={styles.actionButton}>
            <Icon name="line-chart" size={32} color="white" />
            <Text style={styles.actionText}>bills</Text>
        </TouchableOpacity>
        
          </View>
        </View>
    </View>);
    
}
export default ButtonGroupComponent;