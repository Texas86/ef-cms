import { set } from 'cerebral/factories';
import { state } from 'cerebral';

import { clearAlertsAction } from '../actions/clearAlertsAction';
import { computeFormDateAction } from '../actions/computeFormDateAction';
import { createCaseFromPaperAction } from '../actions/createCaseFromPaperAction';
import { gotoDocumentDetailSequence } from '../sequences/gotoDocumentDetailSequence';
import { setAlertErrorAction } from '../actions/setAlertErrorAction';
import { setCaseAction } from '../actions/setCaseAction';
import { setFormSubmittingAction } from '../actions/setFormSubmittingAction';
import { setPetitionIdAction } from '../actions/setPetitionIdAction';
import { setValidationAlertErrorsAction } from '../actions/setValidationAlertErrorsAction';
import { setValidationErrorsAction } from '../actions/setValidationErrorsAction';
import { unsetFormSubmittingAction } from '../actions/unsetFormSubmittingAction';
import { validatePetitionFromPaperAction } from '../actions/validatePetitionFromPaperAction';

export const submitPetitionFromPaperSequence = [
  clearAlertsAction,
  set(state.showValidation, true),
  computeFormDateAction,
  validatePetitionFromPaperAction,
  {
    error: [
      setAlertErrorAction,
      setValidationErrorsAction,
      setValidationAlertErrorsAction,
      unsetFormSubmittingAction,
    ],
    success: [
      set(state.showValidation, false),
      setFormSubmittingAction,
      createCaseFromPaperAction,
      setCaseAction,
      setPetitionIdAction,
      unsetFormSubmittingAction,
      ...gotoDocumentDetailSequence,
    ],
  },
];
