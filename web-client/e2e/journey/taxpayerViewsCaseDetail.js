import { runCompute } from 'cerebral/test';

import { formattedCaseDetail } from '../../src/presenter/computeds/formattedCaseDetail';
import { caseDetailHelper } from '../../src/presenter/computeds/caseDetailHelper';

export default test => {
  return it('Taxpayer views case detail', async () => {
    await test.runSequence('gotoCaseDetailSequence', {
      docketNumber: test.docketNumber,
    });

    const caseDetail = test.getState('caseDetail');
    const caseDetailFormatted = runCompute(formattedCaseDetail, {
      state: test.getState(),
    });
    expect(test.getState('currentPage')).toEqual('CaseDetail');
    expect(caseDetail.docketNumber).toEqual(test.docketNumber);
    expect(caseDetail.docketNumberSuffix).toEqual('W');
    expect(caseDetailFormatted.docketNumberWithSuffix).toEqual(
      `${test.docketNumber}W`,
    );
    expect(caseDetail.documents.length).toEqual(2);
    expect(caseDetail.preferredTrialCity).toEqual('Chattanooga, TN');

    const helper = runCompute(caseDetailHelper, {
      state: test.getState(),
    });
    expect(helper.showActionRequired).toEqual(true);

    await test.runSequence('viewDocumentSequence', {
      callback: documentBlob => {
        expect(documentBlob).toBeTruthy();
      },
      documentId: test.getState('caseDetail.documents.0.documentId'),
    });
  });
};
