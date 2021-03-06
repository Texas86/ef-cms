const assert = require('assert');
const { Document } = require('./Document');
const { Message } = require('./Message');
const { WorkItem } = require('./WorkItem');

const A_VALID_DOCUMENT = {
  documentType: 'Petition',
  role: 'petitioner',
  userId: 'taxpayer',
};
const caseDetail = {
  contactPrimary: {
    name: 'Bob',
  },
  contactSecondary: {
    name: 'Bill',
  },
};

describe('Document entity', () => {
  describe('isValid', () => {
    it('Creates a valid document', () => {
      const myDoc = new Document(A_VALID_DOCUMENT);
      myDoc.documentId = 'a6b81f4d-1e47-423a-8caf-6d2fdc3d3859';
      assert.ok(myDoc.isValid());
    });

    it('Creates an invalid document with no document type', () => {
      const myDoc = new Document({
        userId: '123',
      });
      assert.ok(!myDoc.isValid());
    });

    it('Creates an invalid document with no userId', () => {
      const myDoc = new Document({
        documentType: 'Petition',
      });
      assert.ok(!myDoc.isValid());
    });

    it('addWorkItem', () => {
      const myDoc = new Document(A_VALID_DOCUMENT);
      const workItem = new WorkItem({
        assigneeId: 'bob',
        assigneeName: 'bob',
        caseId: 'c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
        caseStatus: 'new',
        caseTitle: 'testing',
        docketNumber: '101-18',
        document: {},
        sentBy: 'bob',
      });
      const message = new Message({
        from: 'Test User',
        fromUserId: '6805d1ab-18d0-43ec-bafb-654e83405416',
        message: 'hello world',
        messageId: 'c6b81f4d-1e47-423a-8caf-6d2fdc3d3859',
      });
      workItem.addMessage(message);
      myDoc.addWorkItem(new WorkItem({}));
      assert.ok(!myDoc.isValid());
    });
  });

  describe('validate', () => {
    it('should do nothing if valid', () => {
      let error = null;
      try {
        const document = new Document(A_VALID_DOCUMENT);
        document.documentId = 'a6b81f4d-1e47-423a-8caf-6d2fdc3d3859';
        document.validate();
      } catch (err) {
        error = err;
      }
      assert.ok(error === null);
    });

    it('should throw an error on invalid documents', () => {
      let error = null;
      try {
        new Document({}).validate();
      } catch (err) {
        error = err;
      }
      assert.ok(error !== null);
    });
  });

  describe('generate filed by string', () => {
    it('should generate correct filedBy string for partyPrimary', () => {
      const document = new Document({
        attachments: false,
        category: 'Petition',
        certificateOfService: false,
        createdAt: '2019-04-19T17:29:13.120Z',
        documentId: '88cd2c25-b8fa-4dc0-bfb6-57245c86bb0d',
        documentTitle: 'Amended Petition',
        documentType: 'Amended Petition',
        eventCode: 'PAP',
        exhibits: false,
        hasSupportingDocuments: true,
        objections: 'No',
        partyPrimary: true,
        relationship: 'primaryDocument',
        scenario: 'Standard',
        supportingDocument:
          'Unsworn Declaration under Penalty of Perjury in Support',
        supportingDocumentFreeText: 'Test',
      });
      document.generateFiledBy(caseDetail);
      expect(document.filedBy).toEqual('Petr. Bob');
    });

    it('should generate correct filedBy string for partyPrimary and partyRespondent', () => {
      const document = new Document({
        attachments: false,
        category: 'Miscellaneous',
        certificateOfService: false,
        createdAt: '2019-04-19T18:24:09.515Z',
        documentId: 'c501a558-7632-497e-87c1-0c5f39f66718',
        documentTitle:
          'First Amended Unsworn Declaration under Penalty of Perjury in Support',
        documentType: 'Amended',
        eventCode: 'ADED',
        exhibits: true,
        hasSupportingDocuments: true,
        ordinalValue: 'First',
        partyPrimary: true,
        partyRespondent: true,
        previousDocument:
          'Unsworn Declaration under Penalty of Perjury in Support',
        relationship: 'primaryDocument',
        scenario: 'Nonstandard F',
        supportingDocument: 'Brief in Support',
        supportingDocumentFreeText: null,
      });
      document.generateFiledBy(caseDetail);
      expect(document.filedBy).toEqual('Resp. & Petr. Bob');
    });

    it('should generate correct filedBy string for partyPrimary and partySecondary', () => {
      const document = new Document({
        attachments: true,
        category: 'Motion',
        certificateOfService: true,
        certificateOfServiceDate: '2018-06-07',
        certificateOfServiceDay: '7',
        certificateOfServiceMonth: '6',
        certificateOfServiceYear: '2018',
        createdAt: '2019-04-19T17:39:10.476Z',
        documentId: '362baeaf-7692-4b04-878b-2946dcfa26ee',
        documentTitle:
          'Motion for Leave to File Computation for Entry of Decision',
        documentType: 'Motion for Leave to File',
        eventCode: 'M115',
        exhibits: true,
        hasSecondarySupportingDocuments: false,
        hasSupportingDocuments: true,
        objections: 'Yes',
        partyPrimary: true,
        partySecondary: true,
        relationship: 'primaryDocument',
        scenario: 'Nonstandard H',
        secondarySupportingDocument: null,
        secondarySupportingDocumentFreeText: null,
        supportingDocument: 'Declaration in Support',
        supportingDocumentFreeText: 'Rachael',
      });
      document.generateFiledBy(caseDetail);
      expect(document.filedBy).toEqual('Petrs. Bob & Bill');
    });

    it('should generate correct filedBy string for partyPrimary and partySecondary', () => {
      const document = new Document({
        category: 'Supporting Document',
        createdAt: '2019-04-19T17:29:13.122Z',
        documentId: '3ac23dd8-b0c4-4538-86e1-52b715f54838',
        documentTitle:
          'Unsworn Declaration of Test under Penalty of Perjury in Support of Amended Petition',
        documentType: 'Unsworn Declaration under Penalty of Perjury in Support',
        eventCode: 'USDL',
        freeText: 'Test',
        lodged: true,
        partyPractitioner: true,
        partyRespondent: true,
        practitioner: {
          name: 'Test Practitioner',
        },
        previousDocument: 'Amended Petition',
        relationship: 'primarySupportingDocument',
        scenario: 'Nonstandard C',
      });
      document.generateFiledBy(caseDetail);
      expect(document.filedBy).toEqual('Resp. & Counsel Test Practitioner');
    });
  });
});
