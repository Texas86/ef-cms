import { state } from 'cerebral';
import moment from 'moment';

/**
 * sets the form's irs notice date and pay gov date based on the caseDetail provided in state.caseDetail
 *
 * @param {Object} providers the providers object
 * @param {Function} providers.get the cerebral get function used for getting the state.caseDetail
 * @param {Object} providers.store the cerebral store used for setting the state.form
 */
export const setFormForCaseAction = ({ get, store }) => {
  const caseDetail = get(state.caseDetail);
  const irsNoticeDate = moment.utc(caseDetail.irsNoticeDate, 'YYYY/MM/DD');
  if (
    irsNoticeDate &&
    irsNoticeDate.toDate() instanceof Date &&
    !isNaN(irsNoticeDate.toDate())
  ) {
    store.set(state.form.irsMonth, irsNoticeDate.format('M'));
    store.set(state.form.irsDay, irsNoticeDate.format('D'));
    store.set(state.form.irsYear, irsNoticeDate.format('YYYY'));
  }

  const receivedAt = moment.utc(caseDetail.receivedAt, 'YYYY/MM/DD');
  if (
    receivedAt &&
    receivedAt.toDate() instanceof Date &&
    !isNaN(receivedAt.toDate())
  ) {
    store.set(state.form.receivedAtMonth, receivedAt.format('M'));
    store.set(state.form.receivedAtDay, receivedAt.format('D'));
    store.set(state.form.receivedAtYear, receivedAt.format('YYYY'));
  }

  const payGovDate = moment.utc(caseDetail.payGovDate, 'YYYY/MM/DD');
  if (
    payGovDate &&
    payGovDate.toDate() instanceof Date &&
    !isNaN(payGovDate.toDate())
  ) {
    store.set(state.form.payGovMonth, payGovDate.format('M'));
    store.set(state.form.payGovDay, payGovDate.format('D'));
    store.set(state.form.payGovYear, payGovDate.format('YYYY'));
  }
};
