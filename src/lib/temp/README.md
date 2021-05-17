# Ask The World Shared Repo

- App

        [master]  https://ask-the-world-master-1144547669.eu-central-1.elb.amazonaws.com
        [feature] https://ask-the-world-feature-507989894.eu-central-1.elb.amazonaws.com

- Api

        [master]  https://ask-the-world-api-master-2011553807.eu-central-1.elb.amazonaws.com
        [feature] https://ask-the-world-api-feature-228670306.eu-central-1.elb.amazonaws.com
        
- SSH to AWS EC2 instance

        [master]  ssh -i ask-the-world-dev.pem ubuntu@18.194.139.71
        [feature] ssh -i ask-the-world-dev.pem ubuntu@18.196.70.139

- connect to MONGO

        mongo "mongodb+srv://cluster0.wrpq7.mongodb.net/ask-the-world-dev" --username admin

- Step by step EC2 instance preparation
    - install Node from https://github.com/nodesource/distributions
    - use NPM to install Yarn and PM2
    - set `PM2_HOME` to `/etc/.pm2` and other necessary environment variables in `/etc/environment`
    - reload system environment with `source /etc/environment`
    - install `codedeploy-agent` with https://github.com/aws/aws-codedeploy-agent/issues/239#issuecomment-622630774
    - create `/home/ubuntu/{app-folder}`
    - place `key.pem`, `cert.pem` and `ca.pem` in `/home/ubuntu/ssl`
