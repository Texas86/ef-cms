import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const RequestAccessDocumentReadOnly = connect(
  {
    chooseWizardStepSequence: sequences.chooseWizardStepSequence,
    form: state.form,
    requestAccessHelper: state.requestAccessHelper,
  },
  ({ chooseWizardStepSequence, form, requestAccessHelper }) => {
    return (
      <React.Fragment>
        <div>
          <h3 className="header-with-link-button">{form.documentTitle}</h3>
          <button
            className="link push-right"
            type="button"
            onClick={() => chooseWizardStepSequence({ value: 'RequestAccess' })}
          >
            <FontAwesomeIcon icon="edit" size="sm" />
            Edit
          </button>
        </div>

        <div className="blue-container">
          <div className="ustc-form-group">
            <label htmlFor="primary-filing">{form.documentTitle}</label>
            <FontAwesomeIcon icon={['fas', 'file-pdf']} />
            {form.primaryDocumentFile.name}
          </div>

          {form.certificateOfService === true && (
            <div className="ustc-form-group">
              <label htmlFor="filing-includes">Filing Includes</label>
              <ul className="ustc-unstyled-list without-margins">
                <li>
                  Certificate of Service{' '}
                  {requestAccessHelper.certificateOfServiceDateFormatted}
                </li>
              </ul>
            </div>
          )}

          {form.certificateOfService === false && (
            <div className="ustc-form-group">
              <label htmlFor="filing-not-includes">
                Filing Does Not Include
              </label>
              <ul className="ustc-unstyled-list without-margins">
                <li>Certificate of Service</li>
              </ul>
            </div>
          )}

          {form.documentType === 'Substitution of Counsel' && (
            <div className="ustc-form-group">
              <label htmlFor="objections">
                Are There Any Objections to This Document?
              </label>
              {form.objections}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  },
);
