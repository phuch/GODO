import validate from 'validate.js'
import validations from '../constants/validations';

export default validator = (fieldName, value, compareFieldName = '', compareValue = '') => {
    let formValues = {};

    if (compareFieldName.length && compareValue.length) {
        formValues[compareFieldName] = compareValue;
        formValues[fieldName] = value;
    } else {
        formValues[fieldName] = value;
    }

    let formField = {};
    formField[fieldName] = validations[fieldName];

    const result = validate(formValues, formField);

    if (result) {
        return result[fieldName][0]
    }
    return null
}

