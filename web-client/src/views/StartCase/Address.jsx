import { Text } from '../../ustc-ui/Text/Text';
import { connect } from '@cerebral/react';
import { props, sequences, state } from 'cerebral';
import React from 'react';

export const Address = connect(
  {
    data: state[props.bind],
    type: props.type,
    updateFormValueSequence: sequences[props.onChange],
    validateStartCaseSequence: sequences[props.onBlur],
    validationErrors: state.validationErrors,
  },
  ({
    data,
    type,
    updateFormValueSequence,
    validateStartCaseSequence,
    validationErrors,
  }) => {
    return (
      <React.Fragment>
        <div
          className={
            'ustc-form-group ' +
            (validationErrors &&
            validationErrors[type] &&
            validationErrors[type].address1
              ? 'usa-input-error'
              : '')
          }
        >
          <label htmlFor={`${type}.address1`}>Mailing Address</label>
          <input
            id={`${type}.address1`}
            type="text"
            name={`${type}.address1`}
            autoCapitalize="none"
            value={data[type].address1 || ''}
            onChange={e => {
              updateFormValueSequence({
                key: e.target.name,
                value: e.target.value,
              });
            }}
            onBlur={() => {
              validateStartCaseSequence();
            }}
          />
          <Text
            className="usa-input-error-message"
            bind={`validationErrors.${type}.address1`}
          />
        </div>
        <div className="ustc-form-group">
          <label htmlFor={`${type}.address2`}>
            Address Line 2 <span className="usa-form-hint">(optional)</span>
          </label>
          <input
            id={`${type}.address2`}
            type="text"
            name={`${type}.address2`}
            autoCapitalize="none"
            value={data[type].address2 || ''}
            onChange={e => {
              updateFormValueSequence({
                key: e.target.name,
                value: e.target.value,
              });
            }}
            onBlur={() => {
              validateStartCaseSequence();
            }}
          />
        </div>
        <div className="ustc-form-group">
          <label htmlFor={`${type}.address3`}>
            Address Line 3 <span className="usa-form-hint">(optional)</span>
          </label>
          <input
            id={`${type}.address3`}
            type="text"
            name={`${type}.address3`}
            autoCapitalize="none"
            value={data[type].address3 || ''}
            onChange={e => {
              updateFormValueSequence({
                key: e.target.name,
                value: e.target.value,
              });
            }}
            onBlur={() => {
              validateStartCaseSequence();
            }}
          />
        </div>
        <div
          className={
            validationErrors &&
            validationErrors[type] &&
            (validationErrors[type].city || validationErrors[type].state)
              ? 'usa-input-error'
              : ''
          }
        >
          <div className="ustc-form-group ustc-form-group-city">
            <label htmlFor={`${type}.city`}>City</label>
            <input
              id={`${type}.city`}
              type="text"
              name={`${type}.city`}
              className={
                'usa-input-inline ' +
                (validationErrors &&
                validationErrors[type] &&
                validationErrors[type].city
                  ? 'ustc-input-error'
                  : '')
              }
              autoCapitalize="none"
              value={data[type].city || ''}
              onChange={e => {
                updateFormValueSequence({
                  key: e.target.name,
                  value: e.target.value,
                });
              }}
              onBlur={() => {
                validateStartCaseSequence();
              }}
            />
          </div>
          <div className="ustc-form-group ustc-form-group-state">
            <label htmlFor={`${type}.state`}>State</label>
            <select
              className={
                'usa-input-inline ' +
                (validationErrors &&
                validationErrors[type] &&
                validationErrors[type].state
                  ? 'usa-input-error'
                  : '')
              }
              id={`${type}.state`}
              name={`${type}.state`}
              value={data[type].state || ''}
              onChange={e => {
                updateFormValueSequence({
                  key: e.target.name,
                  value: e.target.value,
                });
                validateStartCaseSequence();
              }}
            >
              <option value="">- Select -</option>
              <optgroup label="State">
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </optgroup>
              <optgroup label="Other">
                <option value="AA">AA</option>
                <option value="AE">AE</option>
                <option value="AP">AP</option>
                <option value="AS">AS</option>
                <option value="FM">FM</option>
                <option value="GU">GU</option>
                <option value="MH">MH</option>
                <option value="MP">MP</option>
                <option value="PW">PW</option>
                <option value="PR">PR</option>
                <option value="VI">VI</option>
              </optgroup>
            </select>
          </div>
          <Text
            className="usa-input-error-message"
            bind={`validationErrors.${type}.city`}
          />
          <Text
            className="usa-input-error-message"
            bind={`validationErrors.${type}.state`}
          />
        </div>
        <div
          className={
            'ustc-form-group clear-both ' +
            (validationErrors &&
            validationErrors[type] &&
            validationErrors[type].postalCode
              ? 'usa-input-error'
              : '')
          }
        >
          <label htmlFor={`${type}.postalCode`} aria-label="zip code">
            ZIP Code
          </label>
          <input
            id={`${type}.postalCode`}
            type="text"
            name={`${type}.postalCode`}
            className="usa-input-medium"
            autoCapitalize="none"
            value={data[type].postalCode || ''}
            onChange={e => {
              updateFormValueSequence({
                key: e.target.name,
                value: e.target.value,
              });
            }}
            onBlur={() => {
              validateStartCaseSequence();
            }}
          />
          <Text
            className="usa-input-error-message"
            bind={`validationErrors.${type}.postalCode`}
          />
        </div>
      </React.Fragment>
    );
  },
);
