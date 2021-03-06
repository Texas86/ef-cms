const sinon = require('sinon');
const {
  createTestApplicationContext,
} = require('./createTestApplicationContext');
const {
  getSentWorkItemsForSection,
} = require('../useCases/workitems/getSentWorkItemsForSectionInteractor');
const {
  getWorkItemsBySection,
} = require('../useCases/workitems/getWorkItemsBySectionInteractor');
const {
  getWorkItemsForUser,
} = require('../useCases/workitems/getWorkItemsForUserInteractor');
const {
  recallPetitionFromIRSHoldingQueue,
} = require('../useCases/recallPetitionFromIRSHoldingQueueInteractor');
const {
  sendPetitionToIRSHoldingQueue,
} = require('../useCases/sendPetitionToIRSHoldingQueueInteractor');
const { createCase } = require('../useCases/createCaseInteractor');
const { getCase } = require('../useCases/getCaseInteractor');
const { User } = require('../entities/User');

const DATE = '2019-03-01T22:54:06.000Z';

describe('recallPetitionFromIRSHoldingQueueInteractor integration test', () => {
  let applicationContext;

  beforeEach(() => {
    sinon.stub(window.Date.prototype, 'toISOString').returns(DATE);
    applicationContext = createTestApplicationContext();
  });

  afterEach(() => {
    window.Date.prototype.toISOString.restore();
  });

  it('should create the expected work items and update their status', async () => {
    const { caseId } = await createCase({
      applicationContext,
      petitionFileId: '92eac064-9ca5-4c56-80a0-c5852c752277',
      petitionMetadata: {
        caseType: 'Innocent Spouse',
        contactPrimary: {
          address1: '19 First Freeway',
          address2: 'Ad cumque quidem lau',
          address3: 'Anim est dolor animi',
          city: 'Rerum eaque cupidata',
          countryType: 'domestic',
          email: 'taxpayer@example.com',
          name: 'Rick Petitioner',
          phone: '+1 (599) 681-5435',
          postalCode: '89614',
          state: 'AP',
        },
        contactSecondary: {},
        filingType: 'Myself',
        hasIrsNotice: false,
        partyType: 'Petitioner',
        preferredTrialCity: 'Aberdeen, South Dakota',
        procedureType: 'Small',
      },
      stinFileId: '72de0fac-f63c-464f-ac71-0f54fd248484',
    });

    applicationContext.getCurrentUser = () => {
      return new User({
        name: 'richard',
        role: 'petitionsclerk',
        userId: '3805d1ab-18d0-43ec-bafb-654e83405416',
      });
    };

    let theCase = await getCase({
      applicationContext,
      caseId,
    });
    expect(theCase.status).toEqual('New');

    await sendPetitionToIRSHoldingQueue({
      applicationContext,
      caseId,
    });

    theCase = await getCase({
      applicationContext,
      caseId,
    });
    expect(theCase.status).toEqual('Batched for IRS');

    let petitionSectionOutbox = await getSentWorkItemsForSection({
      applicationContext,
      section: 'petitions',
    });
    expect(petitionSectionOutbox).toMatchObject([
      {
        assigneeId: '63784910-c1af-4476-8988-a02f92da8e09',
        assigneeName: 'IRS Holding Queue',
        caseStatus: 'Batched for IRS',
        docketNumber: '101-19',
        docketNumberSuffix: 'S',
        document: {
          documentType: 'Petition',
          filedBy: 'richard',
          userId: 'a805d1ab-18d0-43ec-bafb-654e83405416',
          workItems: [],
        },
        isInitializeCase: true,
        messages: [
          {
            from: 'richard',
            fromUserId: 'a805d1ab-18d0-43ec-bafb-654e83405416',
            message: 'Petition filed by Rick Petitioner is ready for review.',
          },
          {
            from: 'richard',
            fromUserId: '3805d1ab-18d0-43ec-bafb-654e83405416',
            message: 'Petition batched for IRS',
            to: 'IRS Holding Queue',
            toUserId: '63784910-c1af-4476-8988-a02f92da8e09',
          },
        ],
        section: 'irsBatchSection',
        sentBy: 'richard',
        sentBySection: 'petitions',
        sentByUserId: '3805d1ab-18d0-43ec-bafb-654e83405416',
      },
    ]);

    await recallPetitionFromIRSHoldingQueue({
      applicationContext,
      caseId,
    });

    petitionSectionOutbox = await getSentWorkItemsForSection({
      applicationContext,
      section: 'petitions',
    });
    expect(petitionSectionOutbox).toMatchObject([]);

    theCase = await getCase({
      applicationContext,
      caseId,
    });
    expect(theCase.status).toEqual('Recalled');

    const petitionSectionInbox = await getWorkItemsBySection({
      applicationContext,
      section: 'petitions',
    });
    expect(petitionSectionInbox).toMatchObject([
      {
        assigneeId: '3805d1ab-18d0-43ec-bafb-654e83405416',
        assigneeName: 'richard',
        caseStatus: 'Recalled',
        docketNumber: '101-19',
        docketNumberSuffix: 'S',
        document: {
          documentType: 'Petition',
          filedBy: 'richard',
          userId: 'a805d1ab-18d0-43ec-bafb-654e83405416',
        },
        isInitializeCase: true,
        messages: [
          {
            from: 'richard',
            fromUserId: 'a805d1ab-18d0-43ec-bafb-654e83405416',
            message: 'Petition filed by Rick Petitioner is ready for review.',
          },
          {
            from: 'richard',
            fromUserId: '3805d1ab-18d0-43ec-bafb-654e83405416',
            message: 'Petition batched for IRS',
            to: 'IRS Holding Queue',
            toUserId: '63784910-c1af-4476-8988-a02f92da8e09',
          },
          {
            from: 'IRS Holding Queue',
            fromUserId: '63784910-c1af-4476-8988-a02f92da8e09',
            message: 'Petition recalled from IRS Holding Queue',
            to: 'richard',
            toUserId: '3805d1ab-18d0-43ec-bafb-654e83405416',
          },
        ],
        section: 'petitions',
        sentBy: 'richard',
        sentBySection: 'petitions',
        sentByUserId: '3805d1ab-18d0-43ec-bafb-654e83405416',
      },
    ]);

    const userSectionInbox = await getWorkItemsForUser({
      applicationContext,
    });
    expect(userSectionInbox).toMatchObject([
      {
        assigneeId: '3805d1ab-18d0-43ec-bafb-654e83405416',
        assigneeName: 'richard',
        caseStatus: 'Recalled',
        docketNumber: '101-19',
        docketNumberSuffix: 'S',
        document: {
          documentType: 'Petition',
          filedBy: 'richard',
          userId: 'a805d1ab-18d0-43ec-bafb-654e83405416',
          workItems: [],
        },
        isInitializeCase: true,
        messages: [
          {
            from: 'richard',
            fromUserId: 'a805d1ab-18d0-43ec-bafb-654e83405416',
            message: 'Petition filed by Rick Petitioner is ready for review.',
          },
          {
            from: 'richard',
            fromUserId: '3805d1ab-18d0-43ec-bafb-654e83405416',
            message: 'Petition batched for IRS',
            to: 'IRS Holding Queue',
            toUserId: '63784910-c1af-4476-8988-a02f92da8e09',
          },
          {
            from: 'IRS Holding Queue',
            fromUserId: '63784910-c1af-4476-8988-a02f92da8e09',
            message: 'Petition recalled from IRS Holding Queue',
            to: 'richard',
            toUserId: '3805d1ab-18d0-43ec-bafb-654e83405416',
          },
        ],
        section: 'petitions',
        sentBy: 'richard',
        sentBySection: 'petitions',
        sentByUserId: '3805d1ab-18d0-43ec-bafb-654e83405416',
      },
    ]);
  });
});
