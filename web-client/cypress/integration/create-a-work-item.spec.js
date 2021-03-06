const {
  navigateTo: navigateToDocumentDetail,
  getMessagesTab,
  getInProgressTab,
  getCreateMessageButton,
  getSectionSelect,
  getAssigneeIdSelect,
  getMessageTextArea,
  getSendMessageButton,
  getModal,
  getCardContaining,
} = require('../support/pages/document-detail');
const {
  viewMyOutbox,
  getWorkItemContaining,
  viewMyInbox,
  viewSectionOutbox,
  getTableRows,
  viewSectionInbox,
  navigateTo: navigateToDashboard,
} = require('../support/pages/dashboard');

describe('Create a work item ', () => {
  before(() => {
    cy.seed();
    navigateToDocumentDetail(
      'petitionsclerk',
      '104-19',
      'c63be3f2-2240-451e-b6bd-8206d52a070b',
    );
    getMessagesTab().click();
    getInProgressTab().click();
    getCreateMessageButton().click();
    getSectionSelect().select('docket');
    getAssigneeIdSelect().select('Test Docketclerk');
    getMessageTextArea().type('yolo');
    getSendMessageButton().click();
    getModal().should('not.exist');
  });

  it('creates another work item card in the in progress of the document', () => {
    getCardContaining('yolo').should('exist');
  });

  it('creates a sent message in the petitionsclerk sent queue with yolo', () => {
    navigateToDashboard('petitionsclerk');
    viewMyOutbox();
    getTableRows().should('have.length', 1);
    getWorkItemContaining('104-19').click();
    getWorkItemContaining('yolo').should('exist');
  });

  it('creates a section sent message in the petitions section', () => {
    viewSectionOutbox();
    getTableRows().should('have.length', 1);
    getWorkItemContaining('104-19').click();
    getWorkItemContaining('yolo').should('exist');
  });

  it("puts a work item in the docketclerk's inbox", () => {
    navigateToDashboard('docketclerk');
    viewMyInbox();
    getTableRows().should('have.length', 1);
    getWorkItemContaining('104-19').click();
    getWorkItemContaining('yolo').should('exist');
  });

  it('creates a section inbox message in this work item', () => {
    viewSectionInbox();
    getTableRows().should('have.length', 2);
    getWorkItemContaining('104-19').click();
    getWorkItemContaining('yolo').should('exist');
  });
});
