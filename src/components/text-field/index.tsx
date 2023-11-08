import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import useMergeStyles from './styles';


const TextField = ({
  fieldName,
  values,
  initialValues,
  handleChange,
  handleSubmit,
  handleInputFocus,
  handleInputBlur,
  handleInputIconPress,
  fields,
}) => {
const styles = useMergeStyles();
  return (
    <View style={styles.inputWrapper}>
      <View
        style={[
          styles.inputContent,
          activeInput === fieldName ? styles.activeInput : null,
        ]}
      >
        <TextInput
          testID={`textinput-user-info${fieldName}`}
          style={[
            styles.input,
            values[fieldName] !== initialValues[fieldName] ? styles.errorInput : null,
          ]}
          label={fields[fieldName].label}
          name={fieldName}
          onChangeText={handleChange(fieldName)}
          value={values[fieldName]}
          onBlur={handleSubmit}
          onFocus={() => handleInputFocus(fieldName)}
          editable={fields[fieldName].isEditable}
          underlineColor="transparent"
          underlineStyle={{
            display: 'none',
          }}
          onBlur={handleInputBlur}
          ref={(ref) => (inputRefs[fieldName] = ref)}
        />
        <TouchableOpacity
          onPress={() => handleInputIconPress(fieldName)}
          activeOpacity={0.7}
          style={styles.inputIconWrapper}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TextField;
