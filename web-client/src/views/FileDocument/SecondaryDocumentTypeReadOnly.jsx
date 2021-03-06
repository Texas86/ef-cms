import { Focus } from '../../ustc-ui/Focus/Focus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NonstandardForm } from './NonstandardForm';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';

export const SecondaryDocumentTypeReadOnly = connect(
  {
    closeDocumentCategoryAccordionSequence:
      sequences.closeDocumentCategoryAccordionSequence,
    editSelectedSecondaryDocumentSequence:
      sequences.editSelectedSecondaryDocumentSequence,
    form: state.form,
    selectDocumentTypeHelper: state.selectDocumentTypeHelper,
  },
  ({
    closeDocumentCategoryAccordionSequence,
    form,
    editSelectedSecondaryDocumentSequence,
    selectDocumentTypeHelper,
  }) => {
    return (
      <div className="ustc-form-group">
        <div>
          <Focus className="header-with-link-button">
            <label htmlFor="category" tabIndex="-1" className="focusable">
              Selected Secondary Document Type
            </label>
          </Focus>
          <button
            className="link"
            id="edit-selected-secondary-document-type"
            onClick={() => {
              closeDocumentCategoryAccordionSequence();
              editSelectedSecondaryDocumentSequence();
            }}
          >
            <FontAwesomeIcon icon="edit" size="sm" />
            Edit
          </button>
        </div>
        <div>
          <p>{form.secondaryDocument.documentType}</p>
        </div>
        {selectDocumentTypeHelper.secondary.showNonstandardForm && (
          <NonstandardForm
            level="secondary"
            namespace="secondaryDocument"
            validationErrors="validationErrors.secondaryDocument"
          />
        )}
      </div>
    );
  },
);
