import React from 'react';
import { TextInput } from 'react-native-paper';

const MyMaterialInput = ({
  fieldName,
  values,
  initialValues,
  handleChange,
  handleSubmit,
  fields,
}) => (
  <TextInput
    testID={`textinput-user-info${fieldName}`}
    style={[
      values[fieldName] !== initialValues[fieldName] ? { backgroundColor: 'red' } : null,
    ]}
    label={fieldName} // Set the label to the field name or any other desired label
    value={values[fieldName]}
    onChangeText={(text) => handleChange(fieldName)(text)}
    onBlur={handleSubmit}
    editable={fields[fieldName].isEditable}
  />
);

export default MyMaterialInput;
