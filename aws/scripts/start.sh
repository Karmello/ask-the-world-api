#!/bin/bash
cd /home/ubuntu/ask-the-world-api

pm2 delete ask-the-world-api

if [ "$APPLICATION_NAME" == "ask-the-world-api-feature" ]
then
  pm2 start ecosystem.config.js --env feature
else
  pm2 start ecosystem.config.js
fi
