#!/bin/bash

docker-compose up -d

cd bill-splitter-backend
docker build -t bill-splitter/bill-splitter-backend
docker-compose up --recreate -d