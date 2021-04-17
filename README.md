# lib-quality

## Table of Contents

- [About](#about)
- [Project Structure](#structure)
- [Github Personal Access Token](#access_token)
- [Running locally](#run_locally)
- [Swagger Documentation](#docs)
- [Tests](#tests)

## About <a name = "about"></a>

An API for collecting and presenting data about Github Repositories

## Project structure <a name = "structure"></a>

```
├───.github/
│   └───workflows/
│       └───workflow.yml -> Github Actions Workflow
├───src/
│   ├───api/
│   │   └───repository/
│   │       ├───index.ts -> Inits the routes
│   │       ├───repositoryController.ts -> Repository controllers
│   │       ├───repositoryValidator.ts -> Repository schema validators
│   │       └───routes.ts -> Routes related to repository
│   ├───config/
│   ├───constants/
│   ├───db/
│   ├───interfaces/
│   ├───models/
│   ├───services/
│   ├───tests/ -> Automated unit tests
│   │   ├───services/
│   │   ├───utils/
│   │   └───_in-memory-db.ts -> In Memory Mongodb for tests
│   ├───utils/
│   ├───index.ts -> Starts the server, routering, pluggins, etc
│   └───server.ts -> Server configurations
```

## [IMPORTANT] Github Personal Access Token <a name = "access_token"></a>

## Running Locally <a name = "run_locally"></a>

**To access the Github API you need a personal Access Token to be sent in the headers.** See how to generate one [HERE](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

Example sending the token on the request:

on Postman:

<img src="https://user-images.githubusercontent.com/28464939/115126224-e1b2a900-9fa3-11eb-8f0a-96db8e224fa3.png" />

on Swagger:

<img src="https://user-images.githubusercontent.com/28464939/115126280-3e15c880-9fa4-11eb-9722-a1fa68700078.png" />

## Running Locally <a name = "run_locally"></a>

You will need NodeJS (V. 14 or +) and Docker

Clone this repo and run the following commands:

<!-- Don't worry, a local Mongodb will run on a docker container. -->

```
npm install
docker-compose up
```

## Swagger Documentation <a name = "docs"></a>

After running the project open the browser in http://localhost:3000/documentation

## Unit tests <a name = "tests"></a>

For the unit tests, the project uses an [In Memory Mongodb Server](https://github.com/nodkz/mongodb-memory-server). To execute the unit tests run:

```
npm test
```

## Tecnologies used <a name = "techs"></a>

[NodeJs](https://nodejs.org/en/) - Server Environment

[Hapi](https://hapi.dev) - Server Framework

[Docker](https://www.docker.com) - Image deployment

[AVA](https://github.com/avajs/ava) - Test Framework

[Joi](https://joi.dev) - Schema description language and data validator
