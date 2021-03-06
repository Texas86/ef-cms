import { state } from 'cerebral';

import { showContactsHelper } from '../computeds/showContactsHelper';

/**
 * clears primary and secondary contact in caseDetail depending on
 * party type (except email); also defaults countryType to domestic
 *
 * @param {Object} providers the providers object
 * @param {Function} providers.get the cerebral get function
 * @param {Object} providers.store the cerebral store
 */
export const resetContactsAction = async ({ get, store }) => {
  const partyType = get(state.caseDetail.partyType);
  const { PARTY_TYPES, COUNTRY_TYPES } = get(state.constants);
  const showContacts = showContactsHelper(partyType, PARTY_TYPES);

  store.set(state.caseDetail.contactPrimary, {
    countryType: COUNTRY_TYPES.DOMESTIC,
    email: get(state.caseDetail.contactPrimary.email),
  });
  if (showContacts.contactSecondary) {
    store.set(state.caseDetail.contactSecondary, {
      countryType: COUNTRY_TYPES.DOMESTIC,
    });
  }
};
