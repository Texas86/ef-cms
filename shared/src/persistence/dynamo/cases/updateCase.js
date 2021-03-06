const { saveVersionedCase } = require('./saveCase');

/**
 * createWorkItem
 *
 * @param workItemId
 * @param message
 * @param userId
 * @param applicationContext
 * @returns {*}
 */
exports.updateCase = async ({ caseToUpdate, applicationContext }) => {
  return await saveVersionedCase({
    applicationContext,
    caseToSave: caseToUpdate,
    existingVersion: (caseToUpdate || {}).currentVersion,
  });
};
