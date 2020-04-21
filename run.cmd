@echo off
setlocal ENABLEDELAYEDEXPANSION

if %1 == local (
  cmd /c "mongod" -new_console:t:"mongod"
  cmd /c "yarn start-local" -new_console:t:"api"
  goto:end
)

:end
