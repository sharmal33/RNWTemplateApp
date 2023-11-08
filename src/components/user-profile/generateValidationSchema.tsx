import * as yup from 'yup';

function generateValidationSchema(fieldsConfig) {
  const validationSchema = {};

  for (const fieldName in fieldsConfig) {
    if (fieldsConfig.hasOwnProperty(fieldName)) {
      const fieldRules = fieldsConfig[fieldName].rules;

      if (Array.isArray(fieldRules) && fieldRules.length > 0) {
        // Initialize the validation schema for this field
        let fieldValidation = yup.string();

        // Apply rules
        fieldRules.forEach((rule) => {
          switch (rule) {
            case 'required':
              fieldValidation = fieldValidation.required(`${fieldName} is required`);
              break;
            case 'email':
              fieldValidation = fieldValidation.email(`${fieldName} must be a valid email address`);
              break;
            case 'minLength':
              if (fieldsConfig[fieldName].minLength) {
                fieldValidation = fieldValidation.min(fieldsConfig[fieldName].minLength, `${fieldName} must be at least ${fieldsConfig[fieldName].minLength} characters`);
              }
              break;
            case 'maxLength':
              if (fieldsConfig[fieldName].maxLength) {
                fieldValidation = fieldValidation.max(fieldsConfig[fieldName].maxLength, `${fieldName} must be at most ${fieldsConfig[fieldName].maxLength} characters`);
              }
              break;
            // Add more rules as needed
          }
        });

        // Set the validation schema for the field
        validationSchema[fieldName] = fieldValidation;
      }
    }
  }

  return yup.object().shape(validationSchema);
}

export default generateValidationSchema;
