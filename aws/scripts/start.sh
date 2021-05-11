#!/bin/bash
cd /home/ubuntu/ask-the-world-api

if [ "$APPLICATION_NAME" == "ask-the-world-api-feature" ]
then
  pm2 startOrReload ecosystem.config.js --env feature
else
  pm2 startOrReload ecosystem.config.js
fi
