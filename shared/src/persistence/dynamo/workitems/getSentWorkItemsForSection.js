const moment = require('moment');
const {
  getSortRecordsViaMapping,
} = require('../../dynamo/helpers/getSortRecordsViaMapping');
const {
  updateWorkItemsUsingCases,
} = require('../../dynamo/helpers/updateWorkItemsUsingCases');

exports.getSentWorkItemsForSection = async ({
  section,
  applicationContext,
}) => {
  const workItems = await getSortRecordsViaMapping({
    afterDate: moment
      .utc(new Date().toISOString())
      .startOf('day')
      .subtract(7, 'd')
      .utc()
      .format(),
    applicationContext,
    foreignKey: 'workItemId',
    key: section,
    type: 'outbox',
  });

  return updateWorkItemsUsingCases({ applicationContext, workItems });
};
