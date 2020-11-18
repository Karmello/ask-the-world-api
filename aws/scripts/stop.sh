#!/bin/bash
PID=`pm2 pid ask-the-world-api`
$PID && pm2 stop ask-the-world-api || exit 0
