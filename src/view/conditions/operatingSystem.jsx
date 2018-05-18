/***************************************************************************************
 * (c) 2017 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 ****************************************************************************************/

import React from 'react';
import WrappedField from '../components/wrappedField';
import CheckboxList from '../components/checkboxList';

const operatingSystemOptions = [
  'Windows',
  'MacOS',
  'Linux',
  'Unix',
  'iOS',
  'Android'
];

const OperatingSystem = () =>
  (<WrappedField
    name="operatingSystems"
    component={ CheckboxList }
    options={ operatingSystemOptions }
  />);

export default OperatingSystem;

export const formConfig = {
  settingsToFormValues(values, settings) {
    return {
      ...values,
      operatingSystems: settings.operatingSystems ?
        // We have to take into consideration OS options that previously existed.
        // If a user saved the condition using those options, we filter them out here.
        settings.operatingSystems.filter(os => operatingSystemOptions.indexOf(os) !== -1) :
        []
    };
  },
  formValuesToSettings(settings, values) {
    return {
      ...settings,
      ...values
    };
  }
};
