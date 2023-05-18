#!/usr/bin/env bash
yarn prettier
yarn lint
yarn typecheck
yarn test
yarn test-int
