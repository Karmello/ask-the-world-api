#!/bin/bash
cd /home/ubuntu/ask-the-world-api

if [ "$APPLICATION_NAME" == "ask-the-world-api-feature" ]
then
  sudo pm2 start ecosystem.config.js --env feature
else
  sudo pm2 start ecosystem.config.js
fi

sudo pm2 save
