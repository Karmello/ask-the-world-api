# Ask The World API

- urls

        [feature] https://ask-the-world-api-feature-422752572.eu-central-1.elb.amazonaws.com
        [master]  https://ask-the-world-api-master-795011334.eu-central-1.elb.amazonaws.com

- SSH to AWS EC2 instance

        [feature] ssh -i ask-the-world-dev.pem ubuntu@18.192.65.96
        [master]  ssh -i ask-the-world-dev.pem ubuntu@18.193.119.53

- connect to MONGO

        mongo "mongodb+srv://cluster0.wrpq7.mongodb.net/ask-the-world-dev" --username admin
