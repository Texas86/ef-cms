const { ExternalDocumentFactory } = require('./ExternalDocumentFactory');

describe('ExternalDocumentNonStandardC', () => {
  describe('validation', () => {
    it('should have error messages for missing fields', () => {
      const extDoc = ExternalDocumentFactory.get({
        scenario: 'Nonstandard C',
      });
      expect(extDoc.getFormattedValidationErrors()).toEqual({
        category: 'You must select a category.',
        documentType: 'You must select a document type.',
        freeText: 'You must provide a value.',
        previousDocument: 'You must select a document.',
      });
    });

    it('should be valid when all fields are present', () => {
      const extDoc = ExternalDocumentFactory.get({
        category: 'Supporting Document',
        documentTitle: 'Affidavit Of [Name] in Support Of [Document Name]',
        documentType: 'Affidavit in Support',
        freeText: 'Lori Loughlin',
        previousDocument: 'Petition',
        scenario: 'Nonstandard C',
      });
      expect(extDoc.getFormattedValidationErrors()).toEqual(null);
    });
  });

  describe('title generation', () => {
    it('should generate valid title', () => {
      const extDoc = ExternalDocumentFactory.get({
        category: 'Supporting Document',
        documentTitle: 'Affidavit Of [Name] in Support Of [Document Name]',
        documentType: 'Affidavit in Support',
        freeText: 'Lori Loughlin',
        previousDocument: 'Petition',
        scenario: 'Nonstandard C',
      });
      expect(extDoc.getDocumentTitle()).toEqual(
        'Affidavit Of Lori Loughlin in Support Of Petition',
      );
    });
  });
});
