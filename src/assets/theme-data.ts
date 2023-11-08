import {createThemeData} from 'react-native-theme-component';
import fonts from './fonts';
import { colors } from './Colors'
const themeData = createThemeData({
  fonts: fonts,
  colors: {
    ...colors,
		primaryButtonColor: 'red',
		primaryButtonLabelColor: '#FFFFFF',
		secondaryButtonColor: '#14BDEB',
		secondaryButtonLabelColor: '#000000',
		primaryInputFieldColor: '#EF24B8',
		primaryInputFieldLabelColor: '#FFFFFF',
		secondaryInputFieldColor: '#14BDEB',
		secondaryInputFieldLabelColor: '#000000',
	},
  button: {},
  alert: {},
  bottomSheet: {},
  inputField: {},
  inputPhoneNumber: {},
  errorModal: {},
  countryPicker: {},
  datePicker: {},
  imagePicker: {},
  dateRangePicker: {},
  checkBox: {},
  loadingModal: {},
});

export default themeData;
