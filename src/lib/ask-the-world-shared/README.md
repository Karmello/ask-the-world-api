# Ask The World Shared Repo

- App

        [master]  https://ask-the-world-master-1144547669.eu-central-1.elb.amazonaws.com
        [feature] https://ask-the-world-feature-507989894.eu-central-1.elb.amazonaws.com

- Api

        [master]  https://ask-the-world-master-1144547669.eu-central-1.elb.amazonaws.com/api
        [feature] https://ask-the-world-feature-507989894.eu-central-1.elb.amazonaws.com/api

- SSH to AWS EC2 instance

        [master]  ssh -i ask-the-world-dev.pem ubuntu@18.156.121.80
        [feature] ssh -i ask-the-world-dev.pem ubuntu@52.59.157.83

- connect to MONGO

        mongo "mongodb+srv://cluster0.wrpq7.mongodb.net/ask-the-world-dev" --username admin

- Step by step EC2 instance preparation
    - install Node from https://github.com/nodesource/distributions
    - use NPM to install Yarn and PM2
    - set `PM2_HOME` to `/etc/.pm2` and other necessary environment variables in `/etc/environment`
    - reload system environment with `source /etc/environment`
    - install `codedeploy-agent` with https://github.com/aws/aws-codedeploy-agent/issues/239#issuecomment-622630774
    - create `/home/ubuntu/{app-folder}`
    - place `key.pem`, `cert.pem` and `ca.pem` in `/home/ubuntu/{app-folder}/ssl`
