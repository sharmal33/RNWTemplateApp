
       
import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import { getEnterpriseData } from '@/utils/screen-utils';
import { useUser } from 'react-native-user-profile-component';
import { ThemeContext } from 'react-native-theme-component';
import { EditIcon, SelectorIcon, TickIcon } from '@/assets/icon';
import useMergeStyles from './styles';
import {validationSchema as generateValidationSchema} from './model';

     
const UserProfileSummaryComponent = ({ fields }) => {

      

      
      
const { userDetails, updateUserProfile } = useUser();
const [initialValues, setInitialValues] = useState({});
const [successMessage, setSuccessMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [selectedFieldTitle, setSelectedFieldTitle] = useState('');
const [selectedField, setSelectedField] = useState('');
const [activeInput, setActiveInput] = useState(null);
const [isSelectorVisible, setSelectorVisible] = useState(false);
const [selectFieldData, setSelectFieldData] = useState(null);
const [selectedValues, setSelectedValues] = useState({});
const [formatedFields, setFormatedFields] = useState({});
const formikRef = useRef(null);
const inputRefs = {};
const styles = useMergeStyles();
    

      
      
useEffect(() => {
  if (userDetails) {
    setInitialValues({
            "nickName": ensureStringValue(userDetails.nickName || ""),

      }
    );
  }
}, [userDetails]);

const ensureStringValue=(value)=> {
  if (typeof value === 'number') {
    return value.toString(); // Convert number to string
  }
  if (typeof value === 'string') {
    return value; // It's already a string
  }
  // Handle other types or undefined here if needed
  return ''; // Return an empty string for unsupported types
}

// Generate the validation schema using the function
const validationSchema = generateValidationSchema(fields);

// Function to fetch select field data (getEnterpriseData)
const fetchSelectFieldData = async (field) => {
  try {
   const response = await getEnterpriseData([`EntData_${field}`]);
   setSelectFieldData(response?.[0]?.dataItems);
  } catch (error) {
   console.error('Error fetching data:', error);
  }
};

// Function to handle icon press for input fields
const handleInputIconPress = (field) => {
  if (inputRefs[field]) {
    inputRefs[field].focus();
  }
};

// Function to handle option selection
const handleOptionSelect = (field, value) => {
  // set form data
  formikRef.current.setFieldValue(field,value);
  // Handle triggers for this field
  handleFieldChange(field,value);

  setSelectedValues({
    ...selectedValues,
    [field]: value,
  });
  toggleSelector();
};

// Function to handle field change
const handleFieldChange = (field, value) => {
  
};

// Function to calculate the max height (replace with your logic)
const getMaxHeight = () => {
  if (selectFieldData) {
   if (selectFieldData.length < 3) {
     return '20%'; // 1/4 of the screen height
   } else if (selectFieldData.length < 10) {
     return '40%'; // 2/4 of the screen height
   }else if (selectFieldData.length < 15) {
     return '50%'; // 2/4 of the screen height
   } else {
     return '80%'; // 3/4 of the screen height
   }
 }
 return '50%'; // Default to 2/4 of the screen height
};

// Function to toggle the selector modal
const toggleSelector = () => {
  setSelectorVisible(!isSelectorVisible);
};

// Function to handle input focus
const handleInputFocus = (field) => {
  setActiveInput(field);
};

// Function to handle input blur
const handleInputBlur = (field) => {
  setActiveInput(null);
};

// Function to save user details
const saveDetails = async (values) => {
  try {

    const changedFieldsValues = {};
    Object.keys(values).forEach((fieldName) => {
      if (values[fieldName] !== initialValues[fieldName]) {
        changedFieldsValues[fieldName] = values[fieldName];
      }
    });

    const changedFields =restructureObject(changedFieldsValues);

    if (Object.keys(changedFields).length > 0) {
      await updateUserProfile(userDetails.userId, changedFields);
      setSuccessMessage('Profile updated successfully');
      setErrorMessage('');

      // setInitialValues({ ...initialValues, ...changedFields });
    } else {
      setSuccessMessage('');
      setErrorMessage('No changes to save.');
    }
  } catch (error) {
    setSuccessMessage('');
    setErrorMessage('Error updating profile: ' + error.message);
  }
};

// Function to restructure object
const restructureObject=(input)=> {
  const output = {};
  for (const key in input) {
      const parts = key.split('_');
      let currentObject = output;

      for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];

          if (!currentObject[part]) {
              if (isNaN(parts[i + 1])) {
                  if (userDetails && userDetails[parts[i - 1]]) {
                    if (userDetails[parts[i - 1]].length > 0) {
                      currentObject[part] = {'id':userDetails[parts[i - 1]][part].id};
                    }else{
                      currentObject[part] = {};
                    }
                  }else{
                    currentObject[part] = {};
                  }

              } else {
                currentObject[part] = [];
              }
          }
          currentObject = currentObject[part];
      }

      const lastKey = parts[parts.length - 1];
      if (!isNaN(lastKey)) {
          currentObject.push({ [lastKey]: input[key] });
      } else {
          currentObject[lastKey] = input[key];
      }
  }

  return output;
}

    


      
      
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Form elements for user profile */}
        {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        <Formik
          innerRef={formikRef}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={saveDetails}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => {
            return (
              <>
                {/* Your JSX code for rendering fields */}
  {/* title -  */}
        <View
          style={styles.userInfo}
        >
          <Text style={styles.title}>{values['nickName']}</Text>
        </View>
              </>
            );
          }}
        </Formik>
      </ScrollView>
    );

    
}
export default UserProfileSummaryComponent;