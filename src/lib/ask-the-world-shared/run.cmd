@echo off
setlocal ENABLEDELAYEDEXPANSION

if %1 == app (
  cmd /k "cd ../certs & ssh -i ask-the-world-dev.pem ubuntu@18.194.139.71" -new_console:t:"ec2-master"
  cmd /k "cd ../certs & ssh -i ask-the-world-dev.pem ubuntu@18.196.70.139" -new_console:t:"ec2-feature"
  cmd /k "mongod" -new_console:t:"mongo"
  cmd /k "cd ../ask-the-world-api & yarn start-local" -new_console:t:"api"
  cmd /k "cd ../ask-the-world-fe & yarn start-server" -new_console:t:"server"
  cmd /k "cd ../ask-the-world-fe & yarn start-client" -new_console:t:"client"
  cmd /k "cd ../ask-the-world-fe & git status" -new_console:t:"ask-the-world-fe"
  cmd /k "cd ../ask-the-world-api & git status" -new_console:t:"ask-the-world-api"
  cmd /k "cd ../ask-the-world-shared & git status" -new_console:t:"ask-the-world-shared"
  exit
  goto:end
)

:end
