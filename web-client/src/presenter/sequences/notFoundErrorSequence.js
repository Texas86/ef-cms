import { clearModalAction } from '../actions/clearModalAction';
import { setAlertFromExceptionAction } from '../actions/setAlertFromExceptionAction';
import { setCurrentPageAction } from '../actions/setCurrentPageAction';
import { unsetFormSubmittingAction } from '../actions/unsetFormSubmittingAction';

export const notFoundErrorSequence = [
  unsetFormSubmittingAction,
  setAlertFromExceptionAction,
  clearModalAction,
  setCurrentPageAction('Error'),
];
