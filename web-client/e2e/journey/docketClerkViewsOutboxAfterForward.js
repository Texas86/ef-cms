export default test => {
  return it('Docket clerk views outbox after forwarding', async () => {
    await test.runSequence('gotoDashboardSequence');
    expect(test.getState('currentPage')).toEqual('DashboardDocketClerk');
    await test.runSequence('chooseWorkQueueSequence', {
      box: 'outbox',
      queue: 'my',
    });
    let myOutboxWorkQueue = test.getState('workQueue');
    let stipulatedDecisionWorkItem = myOutboxWorkQueue.find(
      workItem => workItem.workItemId === test.workItemId,
    );
    expect(stipulatedDecisionWorkItem.messages[1]).toMatchObject({
      message: 'hello world',
    });
    await test.runSequence('chooseWorkQueueSequence', {
      box: 'inbox',
      queue: 'my',
    });
  });
};
