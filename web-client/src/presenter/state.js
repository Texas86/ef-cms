import {
  formattedCaseDetail,
  formattedCases,
} from './computeds/formattedCaseDetail';

import { alertHelper } from './computeds/alertHelper';
import { caseDetailEditContactsHelper } from './computeds/caseDetailEditContactsHelper';
import { caseDetailEditHelper } from './computeds/caseDetailEditHelper';
import { caseDetailHelper } from './computeds/caseDetailHelper';
import { caseTypeDescriptionHelper } from './computeds/caseTypeDescriptionHelper';
import { contactsHelper } from './computeds/contactsHelper';
import { dashboardPetitionerHelper } from './computeds/dashboardPetitionerHelper';
import { dashboardRespondentHelper } from './computeds/dashboardRespondentHelper';
import { documentDetailHelper } from './computeds/documentDetailHelper';
import { documentHelper } from './computeds/documentHelper';
import { extractedDocument } from './computeds/extractDocument';
import { extractedPendingMessagesFromCaseDetail } from './computeds/extractPendingMessagesFromCaseDetail';
import { fileDocumentHelper } from './computeds/fileDocumentHelper';
import { formattedWorkQueue } from './computeds/formattedWorkQueue';
import { getTrialCityName } from './computeds/formattedTrialCity';
import { headerHelper } from './computeds/headerHelper';
import { requestAccessHelper } from './computeds/requestAccessHelper';
import { selectDocumentTypeHelper } from './computeds/selectDocumentTypeHelper';
import { showAppTimeoutModalHelper } from './computeds/showAppTimeoutModalHelper';
import { startCaseHelper } from './computeds/startCaseHelper';
import { trialCitiesHelper } from './computeds/trialCitiesHelper';
import { workQueueHelper } from './computeds/workQueueHelper';
import { workQueueSectionHelper } from './computeds/workQueueSectionHelper';

export const state = {
  alertHelper,
  assigneeId: null,
  caseCaption: '',
  caseDetail: {},
  caseDetailEditContactsHelper,
  caseDetailEditHelper,
  caseDetailErrors: {},
  caseDetailHelper,
  caseTypeDescriptionHelper,
  caseTypes: [],
  cases: [],
  cognitoLoginUrl: null,
  completeForm: {},
  contactsHelper,
  currentPage: 'Interstitial',
  currentTab: '',
  dashboardPetitionerHelper,
  dashboardRespondentHelper,
  docketRecordIndex: 0,
  document: {},
  documentDetail: {
    tab: '',
  },
  documentDetailHelper,
  documentHelper,
  documentId: null,
  extractedDocument,
  extractedPendingMessagesFromCaseDetail,
  fileDocumentHelper,
  filingTypes: [],
  form: {},
  formattedCaseDetail,
  formattedCases,
  formattedWorkQueue,
  getTrialCityName,
  headerHelper,
  mobileMenu: {
    isVisible: false,
  },
  modal: {},
  path: '/',

  paymentInfo: {
    showDetails: false,
  },
  petition: {},
  procedureTypes: [],
  requestAccessHelper,
  screenMetadata: {},
  searchTerm: '',
  selectDocumentTypeHelper,
  selectedWorkItems: [],
  showAppTimeoutModalHelper,
  showModal: '',
  showValidation: false,
  startCaseHelper,
  submitting: false,
  trialCitiesHelper,
  usaBanner: {
    showDetails: false,
  },
  user: null,
  users: [],
  validationErrors: {},
  workItem: {},
  workItemActions: {},
  workItemMetadata: {},
  workQueue: [],
  workQueueHelper,
  workQueueSectionHelper,
  workQueueToDisplay: { box: 'inbox', queue: 'my' },
};
