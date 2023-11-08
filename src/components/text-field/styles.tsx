import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (style?: SelectGenderModalStyles): SelectGenderModalStyles => {
  const theme = useContext(ThemeContext);

  const defaultStyles: SelectGenderModalStyles = StyleSheet.create({
    input: {
      fontSize: 16,
      marginBottom: 16,
      backgroundColor: 'white',
      width: '90%',
    },
    activeInput: {
      borderColor: theme.colors.Black1B, // Use theme colors
      borderWidth: 1,
    },
    inputIconWrapper: {
      alignSelf: 'center',
    },
    inputWrapper: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 8,
      flexDirection: 'row',
    },
    inputContent: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius: 12,
      height: 55,
      overflow: 'hidden',
    }
  });

  return defaultsDeep(defaultStyles);
};

export default useMergeStyles;
