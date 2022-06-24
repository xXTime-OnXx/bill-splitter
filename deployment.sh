#!/bin/bash

if [ "$1" = "dev" ]; then
  cd ../temp/bill-splitter/bill-splitter-backend

  rm environments/prod.env
  docker build -t bill-splitter/bill-splitter-backend-dev .
  docker-compose up -d -f docker-compose-dev.yaml
fi

docker-compose up -d

cd bill-splitter-backend
docker build -t bill-splitter/bill-splitter-backend .
docker-compose up -d
