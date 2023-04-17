#!/bin/bash

if [ "$1" = "dev" ]; then
  cd ../temp/bill-splitter/bill-splitter-backend

  rm environment/prod.env
  docker build -t bill-splitter/bill-splitter-backend-dev .
  docker-compose up -f docker-compose-dev.yaml -d
  exit 1
fi

docker-compose up -d

cd bill-splitter-backend
docker build -t bill-splitter/bill-splitter-backend .
docker-compose up -d
