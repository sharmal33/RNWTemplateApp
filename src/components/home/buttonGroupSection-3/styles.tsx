
     import { defaultsDeep } from 'lodash';
   import { useContext } from 'react';
   import { StyleSheet } from 'react-native';
   import { ThemeContext } from 'react-native-theme-component';

   const useMergeStyles = (style?: SelectGenderModalStyles): SelectGenderModalStyles => {
       const theme = useContext(ThemeContext);
       const defaultStyles: SelectGenderModalStyles = StyleSheet.create({
         container: {
           flex: 1,
           backgroundColor: theme.colors.lightGray,
         },
         wrapper: {
           paddingTop: 10,
           paddingHorizontal: 15,
           flex: 1,
         },
         actionItems: {
           flexDirection: 'row',
           justifyContent: 'space-between',
           marginBottom: 16,
         },
         actionButton: {
           flex: 1,
           borderRadius: 12,
           marginHorizontal:4,
           alignItems: 'center',
           backgroundColor: theme.colors.primaryColor,
           padding:5,
           paddingVertical:22
         },
         actionText: {
           fontSize: 12,
           marginTop: 4,
           color: theme.colors.white,
         }
       });

       return defaultsDeep(defaultStyles);
     };

   export default useMergeStyles;
   