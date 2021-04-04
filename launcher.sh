#!/bin/bash
trap "sudo firewall-cmd --reload" EXIT
trap "sudo firewall-cmd --reload" SIGINT

cd /home/ale/Desktop/node/gpx
sudo firewall-cmd --zone=public --add-port=3000/tcp
nohup firefox https://127.0.0.1:3000    #will create a nohup.out file in this dir
node /home/ale/Desktop/node/gpx/app.js $1