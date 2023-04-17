#!/bin/bash

if [ "$1" = "dev" ]; then
  cd bill-splitter-backend
  rm environment/prod.env
  docker build -t bill-splitter/bill-splitter-backend-dev .
  docker-compose -f docker-compose-dev.yaml up -d
  exit 1
fi

docker-compose up -d

cd bill-splitter-backend
docker build -t bill-splitter/bill-splitter-backend .
docker-compose up -d
