const client = require('../../dynamodbClientService');
const sinon = require('sinon');
const { getWorkItemsForUser } = require('./getWorkItemsForUser');

const MOCK_ITEM = {
  docketNumber: '123-19',
  status: 'New',
};

describe('getWorkItemsForUser', () => {
  let getStub;

  beforeEach(() => {
    getStub = sinon.stub().returns({
      promise: () =>
        Promise.resolve({
          Item: {
            'aws:rep:deleting': 'a',
            'aws:rep:updateregion': 'b',
            'aws:rep:updatetime': 'c',
            ...MOCK_ITEM,
          },
        }),
    });

    sinon.stub(client, 'query').resolves([
      {
        pk: 'abc',
        sk: 'abc',
        workItemId: 'abc',
      },
    ]);
    sinon
      .stub(client, 'batchGet')
      .onFirstCall()
      .resolves([
        {
          caseId: '123',
          pk: 'abc',
          sk: 'abc',
          workItemId: 'abc',
        },
      ])
      .onSecondCall()
      .resolves([
        {
          caseId: '123',
          docketNumber: '123-19',
          status: 'New',
        },
      ]);
  });

  afterEach(() => {
    client.query.restore();
  });

  it('makes a post request to the expected endpoint with the expected data', async () => {
    const applicationContext = {
      environment: {
        stage: 'dev',
      },
      getDocumentClient: () => ({
        get: getStub,
      }),
      isAuthorizedForWorkItems: () => {
        return true;
      },
    };
    const result = await getWorkItemsForUser({
      applicationContext,
    });
    expect(result).toMatchObject([
      { caseStatus: 'New', docketNumber: '123-19', workItemId: 'abc' },
    ]);
  });
});
