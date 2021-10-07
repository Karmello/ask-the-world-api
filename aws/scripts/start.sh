#!/bin/bash
cd /home/ubuntu/ask-the-world-api

if [ "$APPLICATION_NAME" == "ask-the-world-api-feature" ]
then sudo pm2 start ecosystem.config.js --env feature

else if [ "$APPLICATION_NAME" == "ask-the-world-api-master" ]
then sudo pm2 start ecosystem.config.js --env master

else if [ "$APPLICATION_NAME" == "ask-the-world-api-uat" ]
then sudo pm2 start ecosystem.config.js --env uat

else 
  sudo pm2 start ecosystem.config.js --env prod
fi

sudo pm2 save
