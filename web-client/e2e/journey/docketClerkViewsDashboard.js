import { runCompute } from 'cerebral/test';

import { formattedWorkQueue } from '../../src/presenter/computeds/formattedWorkQueue';

export default test => {
  return it('Docket clerk views dashboard', async () => {
    await test.runSequence('gotoDashboardSequence');
    expect(test.getState('currentPage')).toEqual('DashboardDocketClerk');
    expect(test.getState('workQueue').length).toBeGreaterThan(0);
    expect(test.getState('users').length).toBeGreaterThan(0);
    const workItem = test
      .getState('workQueue')
      .find(workItem => workItem.workItemId === test.workItemId);
    expect(workItem).toBeDefined();
    test.documentId = workItem.document.documentId;
    test.workItemId = workItem.workItemId;

    const formatted = runCompute(formattedWorkQueue, {
      state: test.getState(),
    });
    expect(formatted[0].createdAtFormatted).toBeDefined();
    expect(formatted[0].messages[0].createdAtFormatted).toBeDefined();
  });
};
