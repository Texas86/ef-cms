import { set } from 'cerebral/factories';
import { state } from 'cerebral';

import { clearAlertsAction } from '../actions/clearAlertsAction';
import { computeIrsNoticeDateAction } from '../actions/computeIrsNoticeDateAction';
import { createCaseAction } from '../actions/createCaseAction';
import { getCreateCaseAlertSuccessAction } from '../actions/getCreateCaseAlertSuccessAction';
import { navigateToDashboardAction } from '../actions/navigateToDashboardAction';
import { setAlertErrorAction } from '../actions/setAlertErrorAction';
import { setAlertSuccessAction } from '../actions/setAlertSuccessAction';
import { setCaseAction } from '../actions/setCaseAction';
import { setFormSubmittingAction } from '../actions/setFormSubmittingAction';
import { setValidationAlertErrorsAction } from '../actions/setValidationAlertErrorsAction';
import { setValidationErrorsAction } from '../actions/setValidationErrorsAction';
import { unsetFormSubmittingAction } from '../actions/unsetFormSubmittingAction';
import { validatePetitionAction } from '../actions/validatePetitionAction';

export const submitFilePetitionSequence = [
  clearAlertsAction,
  set(state.showValidation, true),
  computeIrsNoticeDateAction,
  validatePetitionAction,
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
      createCaseAction,
      setCaseAction,
      getCreateCaseAlertSuccessAction,
      setAlertSuccessAction,
      unsetFormSubmittingAction,
      navigateToDashboardAction,
    ],
  },
];
