const sinon = require('sinon');
const uuid = require('uuid');
const { createCase } = require('./createCaseInteractor');
const { PetitionWithoutFiles } = require('../entities/PetitionWithoutFiles');
const { User } = require('../entities/User');

describe('createCase', () => {
  let applicationContext;
  const MOCK_CASE_ID = '413f62ce-d7c8-446e-aeda-14a2a625a626';
  const DATE = '2018-11-21T20:49:28.192Z';

  beforeEach(() => {
    sinon.stub(uuid, 'v4').returns(MOCK_CASE_ID);
    sinon.stub(window.Date.prototype, 'toISOString').returns(DATE);
  });

  afterEach(() => {
    window.Date.prototype.toISOString.restore();
    uuid.v4.restore();
  });

  it('failure', async () => {
    applicationContext = {
      docketNumberGenerator: {
        createDocketNumber: () => Promise.resolve('00101-00'),
      },
      environment: { stage: 'local' },
      getCurrentUser: () => {
        return new User({
          name: 'Test Taxpayer',
          role: 'petitioner',
          userId: '6805d1ab-18d0-43ec-bafb-654e83405416',
        });
      },
      getEntityConstructors: () => ({
        Petition: PetitionWithoutFiles,
      }),
      getPersistenceGateway: () => {
        return {
          createCase: async () => null,
          saveWorkItemForNonPaper: async () => null,
        };
      },
      getUseCases: () => ({
        getUser: () => ({
          name: 'john doe',
          userId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
        }),
      }),
    };
    try {
      await createCase({
        applicationContext,
        petitionFileId: '413f62ce-d7c8-446e-aeda-14a2a625a626',
        petitionMetadata: {
          caseType: 'other',
          contactPrimary: {
            address1: '99 South Oak Lane',
            address2: 'Culpa numquam saepe ',
            address3: 'Eaque voluptates com',
            city: 'Dignissimos voluptat',
            countryType: 'domestic',
            email: 'petitioner1@example.com',
            name: 'Diana Prince',
            phone: '+1 (215) 128-6587',
            postalCode: '69580',
            state: 'AR',
          },
          contactSecondary: {},
          filingType: 'Myself',
          hasIrsNotice: true,
          irsNoticeDate: DATE,
          partyType: 'Petitioner',
          preferredTrialCity: 'Chattanooga, TN',
          procedureType: 'Small',
        },
        stinFileId: '413f62ce-7c8d-446e-aeda-14a2a625a611',
      });
    } catch (error) {
      expect(error.message).toEqual('problem');
    }
  });

  it('throws an error if the user is not valid or authorized', async () => {
    applicationContext = {
      getCurrentUser: () => {
        return {};
      },
    };
    let error;
    try {
      await createCase({
        applicationContext,
        petitionFileId: '413f62ce-d7c8-446e-aeda-14a2a625a626',
        petitionMetadata: {
          caseType: 'other',
          filingType: 'Myself',
          hasIrsNotice: true,
          irsNoticeDate: DATE,
          partyType: 'Petitioner',
          preferredTrialCity: 'Chattanooga, TN',
          procedureType: 'Small',
        },
        stinFileId: '413f62ce-7c8d-446e-aeda-14a2a625a611',
      });
    } catch (err) {
      error = err;
    }
    expect(error.message).toContain('Unauthorized');
  });
});
