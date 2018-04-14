# Advanced Big Data Indexing App

Created an application where the user can add data in the form of JSON object into the redis database. Before storing in the database, the JSON document will be validated with the defined JSON Schema. The user can perform CRUD operations in the application. The token is also generated using JSON Web Tokens and it should be valid when the user will be adding the data into the database. The user can also search the data on the kibana server which is implemented using elastic search.

## Steps to run the application

Clone the repository on your local machine using command

```sh
git clone https://github.com/imar26/advanced-big-data-indexing-app.git
```

Go inside the folder and run the commands to install the dependencies

```sh
cd advanced-big-data-indexing-app
npm install
```

Once, all the dependencies are installed, run the below command in the terminal to start the server

```sh
nodemon server.js
```

Also to make sure the elastic search and kibana server is up, run the below two commands in separate terminals

```sh
cd {{path to elastic-search}}
.\bin.elasticsearch.bat

cd {{path to elastic-search}}
.\bin\kibana.bat

```

## Features

- JSON Schema Validation
- E-tag
- Create, Read, Update and Delete plans
- Token Generation and Token Verification
- Elastic Search

## Technologies Used

- Node.js
- Express.js
- Redis
- REST API
- JSON Web Tokens
- Elastic Search
- Kibana

## Tools Used

- Postman