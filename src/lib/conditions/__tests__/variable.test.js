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

'use strict';

var conditionDelegateInjector = require('inject!../variable');

describe('variable condition delegate', function() {
  var conditionDelegate;

  beforeAll(function() {
    conditionDelegate = conditionDelegateInjector({
      '@adobe/reactor-window': {
        a: {
          b: [
            {
              c: 'foo'
            },
            {
              c: 'bar'
            }
          ]
        }
      }
    });
  });

  it('returns true when the variable matches the string value', function() {
    var settings = { name: '[\'a\'].b[1]["c"]', value: 'bar' };
    expect(conditionDelegate(settings)).toBe(true);
  });

  it('returns false when the variable does not match the string value', function() {
    var settings = { name: '[\'a\'].b[1]["c"]', value: 'cake' };
    expect(conditionDelegate(settings)).toBe(false);
  });

  it('returns true when the variable matches the regex value', function() {
    var settings = { name: '[\'a\'].b[1]["c"]', value: 'B.r', valueIsRegex: true };
    expect(conditionDelegate(settings)).toBe(true);
  });

  it('returns false when the variable does not match the regex value', function() {
    var settings = { name: '[\'a\'].b[1]["c"]', value: 'g.o', valueIsRegex: true };
    expect(conditionDelegate(settings)).toBe(false);
  });

  it('strips window from the variable name when dot notation follows', function() {
    var settings = { name: 'window.a.b[1]["c"]', value: 'bar' };
    expect(conditionDelegate(settings)).toBe(true);
  });

  it('strips window from the variable name when bracket notation follows', function() {
    var settings = { name: 'window[\'a\'].b[1]["c"]', value: 'bar' };
    expect(conditionDelegate(settings)).toBe(true);
  });
});
