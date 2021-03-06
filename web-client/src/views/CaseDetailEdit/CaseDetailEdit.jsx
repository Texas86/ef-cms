import { Tab, Tabs } from '../../ustc-ui/Tabs/Tabs';
import { sequences, state } from 'cerebral';

import { CaseInfo } from './CaseInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRSNotice } from './IRSNotice';
import { PartyInformation } from './PartyInformation';
import { connect } from '@cerebral/react';
import React from 'react';

export const CaseDetailEdit = connect(
  {
    screenMetadata: state.screenMetadata,
    submitCaseDetailEditSaveSequence:
      sequences.submitCaseDetailEditSaveSequence,
    submitting: state.submitting,
    unsetFormSaveSuccessSequence: sequences.unsetFormSaveSuccessSequence,
  },
  ({
    screenMetadata,
    submitCaseDetailEditSaveSequence,
    submitting,
    unsetFormSaveSuccessSequence,
  }) => {
    return (
      <form
        id="case-edit-form"
        noValidate
        onSubmit={e => {
          e.preventDefault();
          submitCaseDetailEditSaveSequence();
        }}
        role="form"
        onFocus={() => {
          unsetFormSaveSuccessSequence();
        }}
      >
        <Tabs
          className="container-tabs"
          id="case-detail-tabs"
          bind="documentDetail.tab"
        >
          <Tab tabName="partyInfo" title="Parties" id="tab-parties">
            <h3>Party Information</h3>
            <PartyInformation />
          </Tab>
          <Tab tabName="caseInfo" title="Case Info" id="tab-case-info">
            <h3>Case Information</h3>
            <CaseInfo />
          </Tab>
          <Tab tabName="irsNotice" title="IRS Notice" id="tab-irs-notice">
            <h3>IRS Notice Information</h3>
            <IRSNotice />
          </Tab>
        </Tabs>

        <button
          aria-disabled={submitting ? 'true' : 'false'}
          className={submitting ? 'usa-button-active' : 'usa-button-secondary'}
          disabled={submitting}
          type="submit"
        >
          {submitting && <div className="spinner" />}
          Save
        </button>
        {screenMetadata.showSaveSuccess && (
          <span className="mini-success" aria-live="polite" role="alert">
            <FontAwesomeIcon icon="check-circle" size="sm" />
            Your changes have been saved.
          </span>
        )}
      </form>
    );
  },
);
