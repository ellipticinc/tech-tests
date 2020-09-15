# Elliptic Senior DevOps Role

### Task - Deploying an Application via Docker Compose
Within this repository you will find an ./app folder which contains a basic nodejs application.
This application is a simple webserver that will respond to a GET request on port 5000. Your task is to create a docker-compose.yaml file that is able to deploy out this application, this will involve a few simple steps.

- You will need to write a Dockerfile for the node application contained in ./app and build the image to use in your docker-compose.yaml 
  - To run the application you need node installed and you need to run
    - ```$ npm  install```
    - ```$ npm start```
- You will need to write a docker-compose.yaml file with the node application container you created above, an nginx container and a redis container
- The nginx container will require custom config to route traffic on nginx port 80 to the node application on port 5000
- The redis container is used by the node application for caching, it has a TTL of 60 seconds, the node application will find it via the ENV vars REDIS_HOST and REDIS_PORT so these need to be set

### Getting Started

To get started try the following (you will need node and docker installed locally)

- https://nodejs.org/en/download/
- https://docs.docker.com/get-docker/

```sh
cd app
docker run -p 6379:6379 --name some-redis -d redis
export REDIS_HOST=localhost
export REDIS_PORT=6379
npm install
npm start
```

now navigate to a new terminal and run 

```sh
# Take note of how long the endpoint takes to respond, immediately run this command (curl localhost:5000) again how long did it take the second time, whats causing this?
curl localhost:5000
# The response from localhost:5000 should be the same as the response from https://httpbin.org/get, see below command
curl https://httpbin.org/get
```

### Helpful Resources
- https://hub.docker.com/_/nginx
- https://hub.docker.com/_/redis
- https://hub.docker.com/_/node
- https://www.baeldung.com/docker-compose

### Submission
Submission requires only 2 files a Dockerfile to create the node application image and a docker-compose.yaml file to run and deploy the application with nginx and redis.

Confirmation of a successful deployment can be determined by checking if the response of hitting nginx on port 80 matches the response when hitting https://httpbin.org/get 