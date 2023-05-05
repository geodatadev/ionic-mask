#===============================================================================================================
# Getting base image
#===============================================================================================================
FROM ubuntu:20.04

WORKDIR /projeto/

ARG DEBIAN_FRONTEND=noninteractive
ARG GENERATE_BUILD=false

# Reference default value


#===============================================================================================================
# Installing the necessary libraries
#===============================================================================================================

# Install ubutu dependencies
RUN apt-get update 
RUN apt install -y curl jq

# Install NODEJS
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash
RUN apt-get update 
RUN apt-get install -y nodejs

# Install ionic and corodova dependencies
RUN npm install -g gulp-cli @ionic/cli@6.x @angular/cli@15.x

RUN adduser --disabled-password --gecos "" geodev
RUN usermod -aG sudo geodev

EXPOSE 8100
