@echo off

call rimraf -rf "src/lib/temp"

call git subtree add --prefix src/lib/temp https://gitlab.com/Karmello/ask-the-world-shared.git master --squash

call rimraf -rf "src/lib/atw-shared"
call xcopy  "src/lib/temp/src" "src/lib/atw-shared" /e /i /h
call rimraf -rf "src/lib/atw-shared/**/spec.ts"
