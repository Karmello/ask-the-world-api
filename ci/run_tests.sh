#!/usr/bin/env bash

set -e
set -o pipefail

yarn prettier
yarn lint
yarn typecheck
yarn test
yarn test-int
