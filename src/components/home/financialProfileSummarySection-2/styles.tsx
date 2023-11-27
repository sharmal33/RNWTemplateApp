
     import { defaultsDeep } from 'lodash';
  import { useContext } from 'react';
  import { StyleSheet } from 'react-native';
  import { ThemeContext } from 'react-native-theme-component';

  const useMergeStyles = (style?: SelectGenderModalStyles): SelectGenderModalStyles => {
      const theme = useContext(ThemeContext);
      const defaultStyles: SelectGenderModalStyles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.White,
        },
        cardWrapper: {
          paddingTop: 15,
          paddingHorizontal:15
        },
        card: {
          backgroundColor: theme.colors.primaryColor,
          borderRadius: 12,
          padding: 16,
          minHeight: 100,
          marginBottom: 10,
        },
        activeCard: {
          borderColor: theme.colors.white,
          borderWidth: 1,
        },
        title: {
          fontSize: 18,
          fontWeight: 'bold',
          color: theme.colors.white,
        },
        balance: {
          fontSize: 24,
          marginTop: 8,
          color: theme.colors.white,
        },
        userInfo: {
          fontSize: 16,
          marginTop: 8,
          color: theme.colors.OffWhite,
        }
      });

      return defaultsDeep(defaultStyles);
    };

  export default useMergeStyles;
   