import React from 'react';
import Coral from '../reduxFormCoralUI';
import extensionViewReduxForm from '../extensionViewReduxForm';
import RegexToggle from '../components/regexToggle';
import ValidationWrapper from '../components/validationWrapper';

class Cookie extends React.Component {
  render() {
    const { name, value, valueIsRegex } = this.props.fields;

    return (
      <div>
        <ValidationWrapper className="u-gapRight" error={name.touched && name.error}>
          <label>
            <span className="u-label">Cookie Name:</span>
            <Coral.Textfield {...name}/>
          </label>
        </ValidationWrapper>
        <ValidationWrapper className="u-gapRight" error={value.touched && value.error}>
          <label>
            <span className="u-label">Cookie Value:</span>
            <Coral.Textfield {...value}/>
          </label>
        </ValidationWrapper>
        <RegexToggle
          value={value.value}
          valueIsRegex={valueIsRegex.value}
          onValueChange={value.onChange}
          onValueIsRegexChange={valueIsRegex.onChange}/>
      </div>
    );
  }
}

const formConfig = {
  fields: [
    'name',
    'value',
    'valueIsRegex'
  ],
  validate(errors, values) {
    errors = {
      ...errors
    };

    if (!values.name) {
      errors.name = 'Please specify a cookie name.';
    }

    if (!values.value) {
      errors.value = 'Please specify a cookie value.';
    }

    return errors;
  }
};

export default extensionViewReduxForm(formConfig)(Cookie);
