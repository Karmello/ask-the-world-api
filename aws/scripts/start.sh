#!/bin/bash
cd /home/ubuntu/ask-the-world-api
pm2 flush && pm2 startOrReload
