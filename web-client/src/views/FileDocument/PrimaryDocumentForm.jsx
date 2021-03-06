import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StateDrivenFileInput } from './StateDrivenFileInput';
import { Text } from '../../ustc-ui/Text/Text';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const PrimaryDocumentForm = connect(
  {
    fileDocumentHelper: state.fileDocumentHelper,
    form: state.form,
    updateFileDocumentWizardFormValueSequence:
      sequences.updateFileDocumentWizardFormValueSequence,
    validateExternalDocumentInformationSequence:
      sequences.validateExternalDocumentInformationSequence,
    validationErrors: state.validationErrors,
  },
  ({
    fileDocumentHelper,
    form,
    updateFileDocumentWizardFormValueSequence,
    validateExternalDocumentInformationSequence,
    validationErrors,
  }) => {
    return (
      <React.Fragment>
        <h3>Tell Us About the {form.documentTitle}</h3>
        <div className="blue-container">
          <div className="usa-grid-full">
            <div className="usa-width-seven-twelfths push-right">
              <div
                id="document-upload-hint"
                className="alert-gold add-bottom-margin"
              >
                <span className="usa-form-hint ustc-form-hint-with-svg">
                  <FontAwesomeIcon
                    icon={['far', 'arrow-alt-circle-left']}
                    className="fa-icon-gold"
                    size="lg"
                  />
                  Remember to remove or redact all personal information (such as
                  Social Security Numbers, Taxpayer Identification Numbers, or
                  Employer Identification Numbers) from your documents.
                </span>
              </div>
            </div>

            <div className="usa-width-five-twelfths">
              <div
                className={`ustc-form-group ${
                  validationErrors.primaryDocumentFile ? 'usa-input-error' : ''
                }`}
              >
                <label
                  htmlFor="primary-document"
                  id="primary-document-label"
                  className={
                    'ustc-upload ' +
                    (fileDocumentHelper.showPrimaryDocumentValid
                      ? 'validated'
                      : '')
                  }
                >
                  Upload Your Document{' '}
                  <span className="success-message">
                    <FontAwesomeIcon icon="check-circle" size="sm" />
                  </span>
                </label>
                <StateDrivenFileInput
                  id="primary-document"
                  name="primaryDocumentFile"
                  aria-describedby="primary-document-label"
                  updateFormValueSequence="updateFileDocumentWizardFormValueSequence"
                  validationSequence="validateExternalDocumentInformationSequence"
                />
                <Text
                  className="usa-input-error-message"
                  bind="validationErrors.primaryDocumentFile"
                />
              </div>

              <div
                className={`ustc-form-group ${
                  validationErrors.certificateOfService ? 'usa-input-error' : ''
                }`}
              >
                <fieldset className="usa-fieldset-inputs usa-sans">
                  <legend>
                    Does Your Filing Include A Certificate of Service?
                  </legend>
                  <ul className="usa-unstyled-list">
                    {['Yes', 'No'].map(option => (
                      <li key={option}>
                        <input
                          id={`certificate-${option}`}
                          type="radio"
                          name="certificateOfService"
                          value={option}
                          checked={
                            form.certificateOfService === (option === 'Yes')
                          }
                          onChange={e => {
                            updateFileDocumentWizardFormValueSequence({
                              key: e.target.name,
                              value: e.target.value === 'Yes',
                            });
                            validateExternalDocumentInformationSequence();
                          }}
                        />
                        <label htmlFor={`certificate-${option}`}>
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </fieldset>
                <Text
                  className="usa-input-error-message"
                  bind="validationErrors.certificateOfService"
                />
              </div>

              {form.certificateOfService && (
                <div
                  className={`ustc-form-group ${
                    validationErrors.certificateOfServiceDate
                      ? 'usa-input-error'
                      : ''
                  }`}
                >
                  <fieldset className="service-date">
                    <legend id="service-date-legend">Service Date</legend>
                    <div className="usa-date-of-birth">
                      <div className="usa-form-group usa-form-group-month">
                        <label htmlFor="service-date-month" aria-hidden="true">
                          MM
                        </label>
                        <input
                          className="usa-input-inline"
                          id="service-date-month"
                          aria-label="month, two digits"
                          aria-describedby="service-date-legend"
                          name="certificateOfServiceMonth"
                          value={form.certificateOfServiceMonth}
                          type="number"
                          min="1"
                          max="12"
                          onChange={e => {
                            updateFileDocumentWizardFormValueSequence({
                              key: e.target.name,
                              value: e.target.value,
                            });
                          }}
                          onBlur={() => {
                            validateExternalDocumentInformationSequence();
                          }}
                        />
                      </div>
                      <div className="usa-form-group usa-form-group-day">
                        <label htmlFor="service-date-day" aria-hidden="true">
                          DD
                        </label>
                        <input
                          className="usa-input-inline"
                          id="service-date-day"
                          name="certificateOfServiceDay"
                          value={form.certificateOfServiceDay}
                          aria-label="day, two digits"
                          aria-describedby="service-date-legend"
                          type="number"
                          min="1"
                          max="31"
                          onChange={e => {
                            updateFileDocumentWizardFormValueSequence({
                              key: e.target.name,
                              value: e.target.value,
                            });
                          }}
                          onBlur={() => {
                            validateExternalDocumentInformationSequence();
                          }}
                        />
                      </div>
                      <div className="usa-form-group usa-form-group-year">
                        <label htmlFor="service-date-year" aria-hidden="true">
                          YYYY
                        </label>
                        <input
                          className="usa-input-inline"
                          id="service-date-year"
                          aria-label="year, four digits"
                          aria-describedby="service-date-legend"
                          name="certificateOfServiceYear"
                          value={form.certificateOfServiceYear}
                          type="number"
                          min="1900"
                          max="2100"
                          onChange={e => {
                            updateFileDocumentWizardFormValueSequence({
                              key: e.target.name,
                              value: e.target.value,
                            });
                          }}
                          onBlur={() => {
                            validateExternalDocumentInformationSequence();
                          }}
                        />
                      </div>
                    </div>
                  </fieldset>
                  <Text
                    className="usa-input-error-message"
                    bind="validationErrors.certificateOfServiceDate"
                  />
                </div>
              )}

              <div
                className={`ustc-form-group ${
                  validationErrors.exhibits ? 'usa-input-error' : ''
                }`}
              >
                <fieldset className="usa-fieldset-inputs usa-sans">
                  <legend id="exhibits-legend">
                    Does Your Filing Include Exhibits?
                  </legend>
                  <ul className="usa-unstyled-list">
                    {['Yes', 'No'].map(option => (
                      <li key={option}>
                        <input
                          id={`exhibits-${option}`}
                          type="radio"
                          name="exhibits"
                          aria-describedby="exhibits-legend"
                          value={option}
                          checked={form.exhibits === (option === 'Yes')}
                          onChange={e => {
                            updateFileDocumentWizardFormValueSequence({
                              key: e.target.name,
                              value: e.target.value === 'Yes',
                            });
                            validateExternalDocumentInformationSequence();
                          }}
                        />
                        <label htmlFor={`exhibits-${option}`}>{option}</label>
                      </li>
                    ))}
                  </ul>
                </fieldset>
                <Text
                  className="usa-input-error-message"
                  bind="validationErrors.exhibits"
                />
              </div>

              <div
                className={`ustc-form-group ${
                  validationErrors.attachments ? 'usa-input-error' : ''
                }`}
              >
                <fieldset className="usa-fieldset-inputs usa-sans">
                  <legend id="attachments-legend">
                    Does Your Filing Include Attachments?
                  </legend>
                  <ul className="usa-unstyled-list">
                    {['Yes', 'No'].map(option => (
                      <li key={option}>
                        <input
                          id={`attachments-${option}`}
                          type="radio"
                          name="attachments"
                          aria-describedby="attachments-legend"
                          value={option}
                          checked={form.attachments === (option === 'Yes')}
                          onChange={e => {
                            updateFileDocumentWizardFormValueSequence({
                              key: e.target.name,
                              value: e.target.value === 'Yes',
                            });
                            validateExternalDocumentInformationSequence();
                          }}
                        />
                        <label htmlFor={`attachments-${option}`}>
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </fieldset>
                <Text
                  className="usa-input-error-message"
                  bind="validationErrors.attachments"
                />
              </div>

              {fileDocumentHelper.showObjection && (
                <div
                  className={`ustc-form-group ${
                    validationErrors.objections ? 'usa-input-error' : ''
                  }`}
                >
                  <fieldset className="usa-fieldset-inputs usa-sans">
                    <legend id="objections-legend">
                      Are There Any Objections to This Document?
                    </legend>
                    <ul className="usa-unstyled-list">
                      {['Yes', 'No', 'Unknown'].map(option => (
                        <li key={option}>
                          <input
                            id={`objections-${option}`}
                            type="radio"
                            aria-describedby="objections-legend"
                            name="objections"
                            value={option}
                            checked={form.objections === option}
                            onChange={e => {
                              updateFileDocumentWizardFormValueSequence({
                                key: e.target.name,
                                value: e.target.value,
                              });
                              validateExternalDocumentInformationSequence();
                            }}
                          />
                          <label htmlFor={`objections-${option}`}>
                            {option}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </fieldset>
                  <Text
                    className="usa-input-error-message"
                    bind="validationErrors.objections"
                  />
                </div>
              )}

              <div
                className={`ustc-form-group ${
                  validationErrors.hasSupportingDocuments
                    ? 'usa-input-error'
                    : ''
                }`}
              >
                <fieldset className="usa-fieldset-inputs usa-sans">
                  <legend id="support-docs-legend">
                    Do You Have Any Supporting Documents for This Filing?
                  </legend>
                  <ul className="usa-unstyled-list">
                    {['Yes', 'No'].map(option => (
                      <li key={option}>
                        <input
                          id={`supporting-documents-${option}`}
                          type="radio"
                          name="hasSupportingDocuments"
                          aria-describedby="support-docs-legend"
                          value={option}
                          checked={
                            form.hasSupportingDocuments === (option === 'Yes')
                          }
                          onChange={e => {
                            updateFileDocumentWizardFormValueSequence({
                              key: e.target.name,
                              value: e.target.value === 'Yes',
                            });
                            validateExternalDocumentInformationSequence();
                          }}
                        />
                        <label htmlFor={`supporting-documents-${option}`}>
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </fieldset>
                <Text
                  className="usa-input-error-message"
                  bind="validationErrors.hasSupportingDocuments"
                />
              </div>

              {form.hasSupportingDocuments && (
                <div
                  className={`ustc-form-group ${
                    validationErrors.supportingDocument ? 'usa-input-error' : ''
                  }`}
                >
                  <label
                    htmlFor="supporting-document"
                    id="supporting-document-label"
                  >
                    Select Supporting Document
                  </label>
                  <select
                    name="supportingDocument"
                    id="supporting-document"
                    aria-describedby="supporting-document-label"
                    onChange={e => {
                      updateFileDocumentWizardFormValueSequence({
                        key: 'supportingDocumentMetadata.category',
                        value: 'Supporting Document',
                      });
                      updateFileDocumentWizardFormValueSequence({
                        key: 'supportingDocumentMetadata.documentType',
                        value: e.target.value,
                      });
                      updateFileDocumentWizardFormValueSequence({
                        key: 'supportingDocumentMetadata.previousDocument',
                        value: form.documentTitle,
                      });
                      updateFileDocumentWizardFormValueSequence({
                        key: e.target.name,
                        value: e.target.value,
                      });
                      validateExternalDocumentInformationSequence();
                    }}
                    value={form.supportingDocument || ''}
                  >
                    <option value="">- Select -</option>
                    {fileDocumentHelper.supportingDocumentTypeList.map(
                      entry => {
                        return (
                          <option
                            key={entry.documentType}
                            value={entry.documentType}
                          >
                            {entry.documentTypeDisplay}
                          </option>
                        );
                      },
                    )}
                  </select>
                  <Text
                    className="usa-input-error-message"
                    bind="validationErrors.supportingDocument"
                  />
                </div>
              )}

              {fileDocumentHelper.showSupportingDocumentFreeText && (
                <div
                  className={`ustc-form-group ${
                    validationErrors.supportingDocumentFreeText
                      ? 'usa-input-error'
                      : ''
                  }`}
                >
                  <label
                    htmlFor="supporting-document-free-text"
                    id="supporting-document-free-text-label"
                  >
                    Supporting Document Signed By
                  </label>
                  <input
                    id="supporting-document-free-text"
                    type="text"
                    aria-describedby="supporting-document-free-text-label"
                    name="supportingDocumentFreeText"
                    autoCapitalize="none"
                    value={form.supportingDocumentFreeText || ''}
                    onChange={e => {
                      updateFileDocumentWizardFormValueSequence({
                        key: 'supportingDocumentMetadata.freeText',
                        value: e.target.value,
                      });
                      updateFileDocumentWizardFormValueSequence({
                        key: e.target.name,
                        value: e.target.value,
                      });
                    }}
                    onBlur={() => {
                      validateExternalDocumentInformationSequence();
                    }}
                  />
                  <Text
                    className="usa-input-error-message"
                    bind="validationErrors.supportingDocumentFreeText"
                  />
                </div>
              )}

              {fileDocumentHelper.showSupportingDocumentUpload && (
                <div
                  className={`ustc-form-group ${
                    validationErrors.supportingDocumentFile
                      ? 'usa-input-error'
                      : ''
                  }`}
                >
                  <label
                    htmlFor="supporting-document-file"
                    id="supporting-document-file-label"
                    className={
                      'ustc-upload ' +
                      (fileDocumentHelper.showSupportingDocumentValid
                        ? 'validated'
                        : '')
                    }
                  >
                    Upload Your Supporting Document{' '}
                    <span className="success-message">
                      <FontAwesomeIcon icon="check-circle" size="sm" />
                    </span>
                  </label>

                  <StateDrivenFileInput
                    id="supporting-document-file"
                    name="supportingDocumentFile"
                    aria-describedby="supporting-document-file-label"
                    updateFormValueSequence="updateFileDocumentWizardFormValueSequence"
                    validationSequence="validateExternalDocumentInformationSequence"
                  />
                  <Text
                    className="usa-input-error-message"
                    bind="validationErrors.supportingDocumentFile"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  },
);
