# TLV Flight Information Web Server

## Overview

This project implements a web server that provides information about inbound and outbound flights from TLV airport using the [data.gov.il API](https://data.gov.il/dataset/flydata/resource/e83f763b-b7d7-479e-b172-ae981ddc6de5).

## Features

The web server supports the following APIs:

### 1. Count All Flights (Inbound & Outbound)
- **Endpoint**: `/api/flights/count`
- **Method**: `GET`
- **Description**: Returns the total number of flights (both inbound and outbound).
- **Response Example**: `192`

### 2. Count Outbound Flights
- **Endpoint**: `/api/flights/outbound/count`
- **Method**: `GET`
- **Description**: Returns the number of outbound flights.
- **Response Example**: `64`

### 3. Count Inbound Flights
- **Endpoint**: `/api/flights/inbound/count`
- **Method**: `GET`
- **Description**: Returns the number of inbound flights.
- **Response Example**: `128`

### 4. Count Flights from a Specific Country (Inbound & Outbound)
- **Endpoint**: `/api/flights/country/count`
- **Method**: `GET`
- **Query Parameter**: `country=<Country Name>`
- **Description**: Returns the number of flights (inbound and outbound) from the specified country.
- **Response Example**: `68`

### 5. Count Outbound Flights from a Specific Country
- **Endpoint**: `/api/flights/country/outbound/count`
- **Method**: `GET`
- **Query Parameter**: `country=<Country Name>`
- **Description**: Returns the number of outbound flights from the specified country.
- **Response Example**: `16`

### 6. Count Inbound Flights from a Specific Country
- **Endpoint**: `/api/flights/country/inbound/count`
- **Method**: `GET`
- **Query Parameter**: `country=<Country Name>`
- **Description**: Returns the number of inbound flights from the specified country.
- **Response Example**: `52`

### 7. Count Delayed Flights
- **Endpoint**: `/api/flights/delayed/count`
- **Method**: `GET`
- **Description**: Returns the number of delayed flights.
- **Response Example**: `200`

### 8. Most Popular Destination
- **Endpoint**: `/api/flights/destination/popular`
- **Method**: `GET`
- **Description**: Returns the city with the highest number of outbound flights.
- **Response Example**: `"AMSTERDAM"`

### 9. Quick Getaway Flights
- **Endpoint**: `/api/flights/getaway`
- **Method**: `GET`
- **Description**: Returns a pair of flights (one departing from Israel and one arriving in Israel) that someone can take for a quick getaway. If no such flights are found, returns an empty object.
- **Response Example**: `{ "departure": "LX2526", "arrival": "LX257" }` or `{}`

## Requirements

- **Language**: Node.js
- **Port**: 8080, 3000

## Running the Server Locally

1. Clone the repository
2. Install dependencies:
    - npm install
3. Start the server:
    - npm start
4. Access the server at http://localhost:3000.

## Dockerizing the Web Server

1. Build the Docker image:
    - docker build -t tlv-flight-web-server .
2. Run the Docker container 
    - docker run -d -p 8080:3000 tlv-flight-web-server
3. Access the server at http://localhost:8080.

   
