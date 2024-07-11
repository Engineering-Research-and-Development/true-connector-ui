#!/bin/bash

echo "Creating Docker Container from TRUE Connector UI repo..."
sudo docker build -f Dockerfile -t rdlabengpa/ids_true_connector_ui:develop .
cd ..
echo "TRUE Connector UI is ready"
echo "Starting deployment to Docker Hub"
sudo docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}
sudo docker push rdlabengpa/true_connector_ui:develop
echo "TRUE Connector UI deployed to Docker Hub"