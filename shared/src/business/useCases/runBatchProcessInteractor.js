const sanitize = require('sanitize-filename');
const {
  isAuthorized,
  UPDATE_CASE,
} = require('../../authorization/authorizationClientService');
const { Case } = require('../entities/Case');
const { IRS_BATCH_SYSTEM_SECTION } = require('../entities/WorkQueue');
const { UnauthorizedError } = require('../../errors/errors');

/**
 * runBatchProcess
 *
 * @param caseId
 * @param caseToUpdate
 * @param userId
 * @param applicationContext
 * @returns {*}
 */
exports.runBatchProcess = async ({ applicationContext }) => {
  const user = applicationContext.getCurrentUser();

  if (!isAuthorized(user, UPDATE_CASE)) {
    throw new UnauthorizedError('Unauthorized for send to IRS Holding Queue');
  }

  const workItemsInHoldingQueue = await applicationContext
    .getPersistenceGateway()
    .getWorkItemsBySection({
      applicationContext,
      section: IRS_BATCH_SYSTEM_SECTION,
    });

  let zips = [];
  for (let workItem of workItemsInHoldingQueue) {
    const caseToBatch = await applicationContext
      .getPersistenceGateway()
      .getCaseByCaseId({
        applicationContext,
        caseId: workItem.caseId,
      });

    await applicationContext.getPersistenceGateway().deleteWorkItemFromSection({
      applicationContext,
      section: IRS_BATCH_SYSTEM_SECTION,
      workItemId: workItem.workItemId,
    });

    const s3Ids = caseToBatch.documents.map(document => document.documentId);
    const fileNames = caseToBatch.documents.map(
      document => `${document.documentType}.pdf`,
    );
    let zipName = sanitize(`${caseToBatch.docketNumber}`);

    if (caseToBatch.contactPrimary && caseToBatch.contactPrimary.name) {
      zipName += sanitize(
        `_${caseToBatch.contactPrimary.name.replace(/\s/g, '_')}`,
      );
    }
    zipName += '.zip';

    await applicationContext.getPersistenceGateway().zipDocuments({
      applicationContext,
      fileNames,
      s3Ids,
      zipName,
    });

    const stinDocument = caseToBatch.documents.find(
      document => document.documentType === Case.documentTypes.stin,
    );

    if (stinDocument) {
      await applicationContext.getPersistenceGateway().deleteDocument({
        applicationContext,
        key: stinDocument.documentId,
      });
    }

    const caseEntity = new Case(caseToBatch).markAsSentToIRS(
      new Date().toISOString(),
    );

    const petitionDocument = caseEntity.documents.find(
      document => document.documentType === Case.documentTypes.petitionFile,
    );
    const initializeCaseWorkItem = petitionDocument.workItems.find(
      workItem => workItem.isInitializeCase,
    );

    //set the work item as completed
    initializeCaseWorkItem.setAsSentToIRS();

    await applicationContext.getPersistenceGateway().updateCase({
      applicationContext,
      caseToUpdate: caseEntity.validate().toRawObject(),
    });

    await applicationContext.getPersistenceGateway().updateWorkItem({
      applicationContext,
      workItemToUpdate: initializeCaseWorkItem,
    });

    zips = zips.concat({
      fileNames,
      s3Ids,
      zipName,
    });
  }

  return {
    processedCases: zips,
  };
};
