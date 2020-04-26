@echo off
setlocal ENABLEDELAYEDEXPANSION

if %1 == local (
  cmd /k "mongod" -new_console:t:"mongod"
  cmd /k "yarn start-local" -new_console:t:"api"
  goto:end
)

:end
