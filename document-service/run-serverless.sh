#!/bin/bash
slsStage=$1
region=$2
pushd src
  find . -type f -exec chmod -R ugo+r {} ";"
popd
SLS_DEPLOYMENT_BUCKET=gov.ustaxcourt.ef-cms.apis.${slsStage}.${region}.deploys ./node_modules/.bin/sls create_domain --stage ${slsStage} --region ${region} --verbose
ENVIRONMENT=${slsStage} SLS_DEPLOYMENT_BUCKET=gov.ustaxcourt.ef-cms.apis.${slsStage}.${region}.deploys ./node_modules/.bin/sls deploy --stage ${slsStage} --region ${region} --verbose
./configure-custom-api-access-logging.sh ${slsStage} ./config-custom-access-logs.json ${region}