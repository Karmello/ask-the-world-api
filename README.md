# Ask The World Shared Repo

Step by step EC2 instance preparation
- install Node from https://github.com/nodesource/distributions
- use NPM to install Yarn and PM2
- set `PM2_HOME` to `/etc/.pm2` and other necessary environment variables in `/etc/environment`
- reload system environment with `source /etc/environment`
- install `codedeploy-agent` with https://github.com/aws/aws-codedeploy-agent/issues/239#issuecomment-622630774
- create `/home/ubuntu/{app-folder}`
- place `key.pem`, `cert.pem` and `ca.pem` in `/home/ubuntu/{app-folder}/ssl`
