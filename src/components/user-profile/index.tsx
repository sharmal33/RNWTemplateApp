
    import React, { useEffect, useState, useRef, useContext } from 'react';
    import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
    import { Formik, ErrorMessage } from 'formik';
    import * as yup from 'yup';
    import { TextInput } from 'react-native-paper';
    import Modal from 'react-native-modal';
    import { getEnterpriseData } from '@/utils/screen-utils';
    import { useUser } from 'react-native-user-profile-component'; // Import the useUser hook
    import { ThemeContext } from 'react-native-theme-component';
    import { EditIcon, SelectorIcon, TickIcon } from '@/assets/icon';
    import useMergeStyles from './styles';
    import generateValidationSchema from './generateValidationSchema';

    const UserProfile = ({ fields }) => {
      // State and logic for the user profile form
      const { userDetails, updateUserProfile } = useUser(); // Use the useUser hook to access userDetails
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
        "religion": ensureStringValue(userDetails.religion || ""),
        "email": ensureStringValue(userDetails.email || ""),
        "maritalStatus": ensureStringValue(userDetails.maritalStatus || ""),
"addresses_0_line1": ensureStringValue(userDetails.addresses[0] ? userDetails.addresses[0].line1 :''|| ""),
"addresses_0_line2": ensureStringValue(userDetails.addresses[0] ? userDetails.addresses[0].line2 :''|| ""),
"addresses_0_postcode": ensureStringValue(userDetails.addresses[0] ? userDetails.addresses[0].postcode :''|| ""),
"addresses_0_city": ensureStringValue(userDetails.addresses[0] ? userDetails.addresses[0].city :''|| ""),
"addresses_0_state": ensureStringValue(userDetails.addresses[0] ? userDetails.addresses[0].state :''|| ""),
"employmentDetails_0_employmentType": ensureStringValue(userDetails.employmentDetails[0] ? userDetails.employmentDetails[0].employmentType :''|| ""),
"employmentDetails_0_employmentSector": ensureStringValue(userDetails.employmentDetails[0] ? userDetails.employmentDetails[0].employmentSector :''|| ""),
"employmentDetails_0_companyName": ensureStringValue(userDetails.employmentDetails[0] ? userDetails.employmentDetails[0].companyName :''|| ""),
"employmentDetails_0_occupation": ensureStringValue(userDetails.employmentDetails[0] ? userDetails.employmentDetails[0].occupation :''|| ""),
"creditDetails_0_annualIncome": ensureStringValue(userDetails.creditDetails[0] ? userDetails.creditDetails[0].annualIncome :''|| ""),

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
      // create separate handler for each functio
      // eg: employmentDetailsTypeFieldChange,employmentDetailsSectorFieldChange,
      const handleFieldChange = (field, value) => {
        if ('employmentDetails_0_employmentType' === field) {
            if ('Unemployed' === value) {
                // Set the value of the target field to the specified value
                formikRef.current.setFieldValue('employmentDetails_0_employmentSector', 'Not Applicable');

            } else {
              // Reset the hidden flag when the condition no longer matches
              formikRef.current.setFieldValue('employmentDetails_0_employmentSector' + '_hidden', false);
            };
            if ('Unemployed' === value) {

                formikRef.current.setFieldValue('employmentDetails_0_occupation' + '_hidden', true);

            } else {
              // Reset the hidden flag when the condition no longer matches
              formikRef.current.setFieldValue('employmentDetails_0_occupation' + '_hidden', false);
            };
          }
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

                  {/* subtitle - Personal details */}
                  <View
                    testID={'container-user-info-personalDetails'}
                    style={styles.userInfo}
                  >
                    <Text style={styles.subtitle}>Personal details</Text>
                  </View>

                  {/* textField - Preferred name (will be printed on card) */}
                  {!values['nickName_hidden'] && <View
                    testID={'container-user-info-nickName'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'nickName' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"text-input-user-info-nickName"}
                          style={[
                            styles.input,
                            values['nickName'] !== initialValues['nickName']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={'Preferred name (will be printed on card)'}
                          name={'nickName'}
                          onChangeText={handleChange('nickName')}
                          value={values['nickName']}
                          onBlur={handleSubmit}
                          onFocus={() => handleInputFocus('nickName')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['nickName'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => handleInputIconPress('nickName')}
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <EditIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* selectField - Religion */}
                  {!values['religion_hidden'] && <View
                    testID={'container-user-info-religion'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'religion' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"select-input-user-info-religion"}
                          style={[
                            styles.input,
                            values['religion'] !== initialValues['religion']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={"Religion"}
                          name={'religion'}
                          value={selectedValues['religion'] || values['religion']}
                          onFocus={() => handleInputFocus('religion')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['religion'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedFieldTitle('Religion')
                            setSelectedField('religion')
                            toggleSelector()
                            // Fetch data when the selectField is clicked
                            if ('religion'.includes('_')) {
                              const lastPart = 'religion'.split('_').pop();
                              fetchSelectFieldData(lastPart);
                            } else {
                              fetchSelectFieldData('religion');
                            }
                          }} // Open the action sheet modal
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <SelectorIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* textField - Email */}
                  {!values['email_hidden'] && <View
                    testID={'container-user-info-email'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'email' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"text-input-user-info-email"}
                          style={[
                            styles.input,
                            values['email'] !== initialValues['email']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={'Email'}
                          name={'email'}
                          onChangeText={handleChange('email')}
                          value={values['email']}
                          onBlur={handleSubmit}
                          onFocus={() => handleInputFocus('email')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['email'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => handleInputIconPress('email')}
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <EditIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* selectField - Marital status */}
                  {!values['maritalStatus_hidden'] && <View
                    testID={'container-user-info-maritalStatus'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'maritalStatus' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"select-input-user-info-maritalStatus"}
                          style={[
                            styles.input,
                            values['maritalStatus'] !== initialValues['maritalStatus']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={"Marital status"}
                          name={'maritalStatus'}
                          value={selectedValues['maritalStatus'] || values['maritalStatus']}
                          onFocus={() => handleInputFocus('maritalStatus')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['maritalStatus'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedFieldTitle('Marital status')
                            setSelectedField('maritalStatus')
                            toggleSelector()
                            // Fetch data when the selectField is clicked
                            if ('maritalStatus'.includes('_')) {
                              const lastPart = 'maritalStatus'.split('_').pop();
                              fetchSelectFieldData(lastPart);
                            } else {
                              fetchSelectFieldData('maritalStatus');
                            }
                          }} // Open the action sheet modal
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <SelectorIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* subtitle - Mailing address */}
                  <View
                    testID={'container-user-info-addresses_addressType'}
                    style={styles.userInfo}
                  >
                    <Text style={styles.subtitle}>Mailing address</Text>
                  </View>

                  {/* textField - Address line 1 */}
                  {!values['addresses_0_line1_hidden'] && <View
                    testID={'container-user-info-addresses_0_line1'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'addresses_0_line1' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"text-input-user-info-addresses_0_line1"}
                          style={[
                            styles.input,
                            values['addresses_0_line1'] !== initialValues['addresses_0_line1']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={'Address line 1'}
                          name={'addresses_0_line1'}
                          onChangeText={handleChange('addresses_0_line1')}
                          value={values['addresses_0_line1']}
                          onBlur={handleSubmit}
                          onFocus={() => handleInputFocus('addresses_0_line1')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['addresses_0_line1'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => handleInputIconPress('addresses_0_line1')}
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <EditIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* textField - Address line 2 (Optional) */}
                  {!values['addresses_0_line2_hidden'] && <View
                    testID={'container-user-info-addresses_0_line2'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'addresses_0_line2' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"text-input-user-info-addresses_0_line2"}
                          style={[
                            styles.input,
                            values['addresses_0_line2'] !== initialValues['addresses_0_line2']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={'Address line 2 (Optional)'}
                          name={'addresses_0_line2'}
                          onChangeText={handleChange('addresses_0_line2')}
                          value={values['addresses_0_line2']}
                          onBlur={handleSubmit}
                          onFocus={() => handleInputFocus('addresses_0_line2')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['addresses_0_line2'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => handleInputIconPress('addresses_0_line2')}
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <EditIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* textField - Postcode */}
                  {!values['addresses_0_postcode_hidden'] && <View
                    testID={'container-user-info-addresses_0_postcode'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'addresses_0_postcode' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"text-input-user-info-addresses_0_postcode"}
                          style={[
                            styles.input,
                            values['addresses_0_postcode'] !== initialValues['addresses_0_postcode']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={'Postcode'}
                          name={'addresses_0_postcode'}
                          onChangeText={handleChange('addresses_0_postcode')}
                          value={values['addresses_0_postcode']}
                          onBlur={handleSubmit}
                          onFocus={() => handleInputFocus('addresses_0_postcode')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['addresses_0_postcode'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => handleInputIconPress('addresses_0_postcode')}
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <EditIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* selectField - City */}
                  {!values['addresses_0_city_hidden'] && <View
                    testID={'container-user-info-addresses_0_city'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'addresses_0_city' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"select-input-user-info-addresses_0_city"}
                          style={[
                            styles.input,
                            values['addresses_0_city'] !== initialValues['addresses_0_city']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={"City"}
                          name={'addresses_0_city'}
                          value={selectedValues['addresses_0_city'] || values['addresses_0_city']}
                          onFocus={() => handleInputFocus('addresses_0_city')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['addresses_0_city'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedFieldTitle('City')
                            setSelectedField('addresses_0_city')
                            toggleSelector()
                            // Fetch data when the selectField is clicked
                            if ('addresses_0_city'.includes('_')) {
                              const lastPart = 'addresses_0_city'.split('_').pop();
                              fetchSelectFieldData(lastPart);
                            } else {
                              fetchSelectFieldData('addresses_0_city');
                            }
                          }} // Open the action sheet modal
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <SelectorIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* selectField - State */}
                  {!values['addresses_0_state_hidden'] && <View
                    testID={'container-user-info-addresses_0_state'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'addresses_0_state' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"select-input-user-info-addresses_0_state"}
                          style={[
                            styles.input,
                            values['addresses_0_state'] !== initialValues['addresses_0_state']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={"State"}
                          name={'addresses_0_state'}
                          value={selectedValues['addresses_0_state'] || values['addresses_0_state']}
                          onFocus={() => handleInputFocus('addresses_0_state')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['addresses_0_state'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedFieldTitle('State')
                            setSelectedField('addresses_0_state')
                            toggleSelector()
                            // Fetch data when the selectField is clicked
                            if ('addresses_0_state'.includes('_')) {
                              const lastPart = 'addresses_0_state'.split('_').pop();
                              fetchSelectFieldData(lastPart);
                            } else {
                              fetchSelectFieldData('addresses_0_state');
                            }
                          }} // Open the action sheet modal
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <SelectorIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* subtitle - Employment details */}
                  <View
                    testID={'container-user-info-employmentDetails'}
                    style={styles.userInfo}
                  >
                    <Text style={styles.subtitle}>Employment details</Text>
                  </View>

                  {/* selectField - Employment type */}
                  {!values['employmentDetails_0_employmentType_hidden'] && <View
                    testID={'container-user-info-employmentDetails_0_employmentType'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'employmentDetails_0_employmentType' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"select-input-user-info-employmentDetails_0_employmentType"}
                          style={[
                            styles.input,
                            values['employmentDetails_0_employmentType'] !== initialValues['employmentDetails_0_employmentType']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={"Employment type"}
                          name={'employmentDetails_0_employmentType'}
                          value={selectedValues['employmentDetails_0_employmentType'] || values['employmentDetails_0_employmentType']}
                          onFocus={() => handleInputFocus('employmentDetails_0_employmentType')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['employmentDetails_0_employmentType'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedFieldTitle('Employment type')
                            setSelectedField('employmentDetails_0_employmentType')
                            toggleSelector()
                            // Fetch data when the selectField is clicked
                            if ('employmentDetails_0_employmentType'.includes('_')) {
                              const lastPart = 'employmentDetails_0_employmentType'.split('_').pop();
                              fetchSelectFieldData(lastPart);
                            } else {
                              fetchSelectFieldData('employmentDetails_0_employmentType');
                            }
                          }} // Open the action sheet modal
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <SelectorIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* selectField - Employment sector */}
                  {!values['employmentDetails_0_employmentSector_hidden'] && <View
                    testID={'container-user-info-employmentDetails_0_employmentSector'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'employmentDetails_0_employmentSector' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"select-input-user-info-employmentDetails_0_employmentSector"}
                          style={[
                            styles.input,
                            values['employmentDetails_0_employmentSector'] !== initialValues['employmentDetails_0_employmentSector']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={"Employment sector"}
                          name={'employmentDetails_0_employmentSector'}
                          value={selectedValues['employmentDetails_0_employmentSector'] || values['employmentDetails_0_employmentSector']}
                          onFocus={() => handleInputFocus('employmentDetails_0_employmentSector')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['employmentDetails_0_employmentSector'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedFieldTitle('Employment sector')
                            setSelectedField('employmentDetails_0_employmentSector')
                            toggleSelector()
                            // Fetch data when the selectField is clicked
                            if ('employmentDetails_0_employmentSector'.includes('_')) {
                              const lastPart = 'employmentDetails_0_employmentSector'.split('_').pop();
                              fetchSelectFieldData(lastPart);
                            } else {
                              fetchSelectFieldData('employmentDetails_0_employmentSector');
                            }
                          }} // Open the action sheet modal
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <SelectorIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* textField - Employer name */}
                  {!values['employmentDetails_0_companyName_hidden'] && <View
                    testID={'container-user-info-employmentDetails_0_companyName'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'employmentDetails_0_companyName' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"text-input-user-info-employmentDetails_0_companyName"}
                          style={[
                            styles.input,
                            values['employmentDetails_0_companyName'] !== initialValues['employmentDetails_0_companyName']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={'Employer name'}
                          name={'employmentDetails_0_companyName'}
                          onChangeText={handleChange('employmentDetails_0_companyName')}
                          value={values['employmentDetails_0_companyName']}
                          onBlur={handleSubmit}
                          onFocus={() => handleInputFocus('employmentDetails_0_companyName')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['employmentDetails_0_companyName'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => handleInputIconPress('employmentDetails_0_companyName')}
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <EditIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* selectField - Occupation */}
                  {!values['employmentDetails_0_occupation_hidden'] && <View
                    testID={'container-user-info-employmentDetails_0_occupation'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'employmentDetails_0_occupation' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"select-input-user-info-employmentDetails_0_occupation"}
                          style={[
                            styles.input,
                            values['employmentDetails_0_occupation'] !== initialValues['employmentDetails_0_occupation']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={"Occupation"}
                          name={'employmentDetails_0_occupation'}
                          value={selectedValues['employmentDetails_0_occupation'] || values['employmentDetails_0_occupation']}
                          onFocus={() => handleInputFocus('employmentDetails_0_occupation')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['employmentDetails_0_occupation'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedFieldTitle('Occupation')
                            setSelectedField('employmentDetails_0_occupation')
                            toggleSelector()
                            // Fetch data when the selectField is clicked
                            if ('employmentDetails_0_occupation'.includes('_')) {
                              const lastPart = 'employmentDetails_0_occupation'.split('_').pop();
                              fetchSelectFieldData(lastPart);
                            } else {
                              fetchSelectFieldData('employmentDetails_0_occupation');
                            }
                          }} // Open the action sheet modal
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <SelectorIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* textField - Annual income */}
                  {!values['creditDetails_0_annualIncome_hidden'] && <View
                    testID={'container-user-info-creditDetails_0_annualIncome'}
                    style={styles.userInfo}
                  >
                    <View style={styles.inputWrapper}>
                      <View
                        style={[
                          styles.inputContent,
                          activeInput === 'creditDetails_0_annualIncome' ? styles.activeInput : null,
                        ]}
                      >
                        <TextInput
                          testID={"text-input-user-info-creditDetails_0_annualIncome"}
                          style={[
                            styles.input,
                            values['creditDetails_0_annualIncome'] !== initialValues['creditDetails_0_annualIncome']
                              ? styles.errorInput
                              : null,
                          ]}
                          label={'Annual income'}
                          name={'creditDetails_0_annualIncome'}
                          onChangeText={handleChange('creditDetails_0_annualIncome')}
                          value={values['creditDetails_0_annualIncome']}
                          onBlur={handleSubmit}
                          onFocus={() => handleInputFocus('creditDetails_0_annualIncome')}
                          editable={true}
                          underlineColor="transparent"
                          underlineStyle={{
                            display: 'none',
                          }}
                          onBlur={handleInputBlur}
                          ref={(ref) => (inputRefs['creditDetails_0_annualIncome'] = ref)}
                        />
                        <TouchableOpacity
                          onPress={() => handleInputIconPress('creditDetails_0_annualIncome')}
                          activeOpacity={0.7}
                          style={styles.inputIconWrapper}
                        >
                          <EditIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>}

                  {/* Save Details button */}
                  <View style={styles.saveButtonContainer}>
                    <Button title="Save Details" onPress={handleSubmit} />
                  </View>
                </>
              );
            }}
          </Formik>
          {/* Modal for selecting options */}
          <Modal
            isVisible={isSelectorVisible}
            onBackdropPress={() => {
              toggleSelector()
              setSelectedFieldTitle('')
              setSelectedField('')
              setSelectFieldData(null);
            }} // Close the modal when clicking outside
            backdropOpacity={0.5}
            animationIn="slideInUp" // Specify the animation to open from the bottom
            animationOut="slideOutDown" // Specify the animation to close towards the bottom
            style={styles.selectorWrapper}
            // style={[styles.selectorWrapper, { height: getMaxHeight() }]}
          >
            <View style={[styles.selectorContainer,{ height: getMaxHeight() }]}>
              {/* Add your action sheet content here */}
              <Text style={styles.selectorTitle}>{selectedFieldTitle}</Text>
              <ScrollView   showsVerticalScrollIndicator={false}>
              {selectFieldData ? (
                selectFieldData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      handleOptionSelect(selectedField, item.value);
                    }} // Open the action sheet modal
                    activeOpacity={0.7}
                    // style={styles.inputIconWrapper}
                  >
                    {formikRef.current.getFieldProps(selectedField).value === item.value ? <View style={styles.selectedItem}>
                      <Text>{item.value}</Text>
                      <TickIcon />
                    </View> :
                    <View style={styles.selectorItem}>
                      <Text>{item.value}</Text>
                    </View> }
                  </TouchableOpacity>
                ))
              ) : (
                <Text>Loading data...</Text>
              )}
              </ScrollView>
            </View>
          </Modal>
        </ScrollView>
      );
    };

    export default UserProfile;
