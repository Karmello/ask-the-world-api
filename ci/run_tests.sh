#!/usr/bin/env bash

set -e

yarn prettier
yarn lint
yarn typecheck
yarn test
yarn test-int
