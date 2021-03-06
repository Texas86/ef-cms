#!/bin/bash -e
ISSUE_COUNT=$(npm audit --json | jq -r '.actions' | jq -r '.[] | .module' | grep -cv -e 'static-eval' | tr -d ' ')
if [ "${ISSUE_COUNT}" -ne "0" ] ; then
  echo "Audit issues found"
  exit 1;
fi
