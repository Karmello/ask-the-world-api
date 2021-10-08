@echo off
setlocal ENABLEDELAYEDEXPANSION

SET ATW_CERTS_PATH="C:/Dev/certs"
SET ATW_API_PATH="C:/Dev/ask-the-world-api"
SET ATW_FE_PATH="C:/Dev/ask-the-world-fe"
SET ATW_SHARED_PATH="C:/Dev/ask-the-world-shared"

if %1 == app (
  cmd /k -new_console:t:"ec2-uat":d:%ATW_CERTS_PATH% ssh -i ask-the-world-dev.pem ubuntu@18.159.126.80
  cmd /k -new_console:t:"ec2-master":d:%ATW_CERTS_PATH% ssh -i ask-the-world-dev.pem ubuntu@3.126.86.4
  cmd /k -new_console:t:"ec2-feature":d:%ATW_CERTS_PATH% ssh -i ask-the-world-dev.pem ubuntu@3.69.212.40
  cmd /k -new_console:t:"mongo" mongod
  cmd /k -new_console:t:"api":d:%ATW_API_PATH% yarn start-local
  cmd /k -new_console:t:"server":d:%ATW_FE_PATH% yarn dev-server
  cmd /k -new_console:t:"client":d:%ATW_FE_PATH% yarn dev-client
  cmd /k -new_console:t:"storybook":d:%ATW_FE_PATH% yarn storybook
  cmd /k -new_console:t:"ask-the-world-fe":d:%ATW_FE_PATH% git status
  cmd /k -new_console:t:"ask-the-world-api":d:%ATW_API_PATH% git status
  cmd /k -new_console:t:"ask-the-world-shared":d:%ATW_SHARED_PATH% git status
  exit
  goto:end
)

:end
