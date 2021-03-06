import { sequences, state } from 'cerebral';

import { Contacts } from '../StartCase/Contacts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from '@cerebral/react';

export const PartyInformation = connect(
  {
    autoSaveCaseSequence: sequences.autoSaveCaseSequence,
    baseUrl: state.baseUrl,
    caseDetail: state.caseDetail,
    caseDetailEditHelper: state.caseDetailEditHelper,
    constants: state.constants,
    token: state.token,
    updateCasePartyTypeSequence: sequences.updateCasePartyTypeSequence,
    updateCaseValueSequence: sequences.updateCaseValueSequence,
  },
  ({
    autoSaveCaseSequence,
    baseUrl,
    caseDetail,
    caseDetailEditHelper,
    constants,
    token,
    updateCasePartyTypeSequence,
    updateCaseValueSequence,
  }) => {
    return (
      <div className="blue-container document-detail-one-third">
        <div className="subsection">
          <div className="ustc-form-group">
            <label htmlFor="case-caption">Case Caption</label>
            <textarea
              id="case-caption"
              name="caseCaption"
              value={caseDetail.caseCaption}
              onChange={e => {
                updateCaseValueSequence({
                  key: e.target.name,
                  value: e.target.value,
                });
              }}
              onBlur={() => {
                autoSaveCaseSequence();
              }}
            />
            {constants.CASE_CAPTION_POSTFIX}
          </div>
        </div>
        <div className="subsection">
          <div className="ustc-form-group">
            <label htmlFor="party-type">Party Type</label>
            <select
              id="party-type"
              name="partyType"
              value={caseDetail.partyType}
              onChange={e => {
                updateCasePartyTypeSequence({
                  key: e.target.name,
                  value: e.target.value,
                });
                autoSaveCaseSequence();
              }}
            >
              <option value="">- Select -</option>
              {Object.keys(caseDetailEditHelper.partyTypes).map(partyType => (
                <option
                  key={partyType}
                  value={caseDetailEditHelper.partyTypes[partyType]}
                >
                  {caseDetailEditHelper.partyTypes[partyType]}
                </option>
              ))}
            </select>
          </div>
        </div>
        {caseDetailEditHelper.showOwnershipDisclosureStatement && (
          <div className="subsection">
            <div className="ustc-form-group">
              <label htmlFor="ods-link">Ownership Disclosure Statement</label>
              {caseDetailEditHelper.ownershipDisclosureStatementDocumentId && (
                <a
                  href={`${baseUrl}/documents/${
                    caseDetailEditHelper.ownershipDisclosureStatementDocumentId
                  }/documentDownloadUrl?token=${token}`}
                  aria-label="View PDF: Ownership Disclosure Statement"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon="file-pdf" />
                  Ownership Disclosure Statement
                </a>
              )}
              {!caseDetailEditHelper.ownershipDisclosureStatementDocumentId &&
                'No file uploaded.'}
              <div className="order-checkbox">
                <input
                  id="order-for-ods"
                  type="checkbox"
                  name="orderForOds"
                  checked={caseDetail.orderForOds}
                  onChange={e => {
                    updateCaseValueSequence({
                      key: e.target.name,
                      value: e.target.checked,
                    });
                    autoSaveCaseSequence();
                  }}
                />
                <label htmlFor="order-for-ods">
                  Order for Ownership Disclosure Statement
                </label>
              </div>
            </div>
          </div>
        )}
        <div className="subsection">
          <Contacts
            parentView="CaseDetail"
            bind="caseDetail"
            emailBind="caseDetail.contactPrimary"
            onChange="updateCaseValueSequence"
            onBlur="autoSaveCaseSequence"
            contactsHelper="caseDetailEditContactsHelper"
            showPrimaryContact={caseDetailEditHelper.showPrimaryContact}
            showSecondaryContact={caseDetailEditHelper.showSecondaryContact}
          />
        </div>
      </div>
    );
  },
);
