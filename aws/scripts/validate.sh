#!/bin/bash
PID=`pm2 pid ask-the-world-api`
$PID && exit 1 || exit 0
