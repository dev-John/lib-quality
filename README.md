# lib-quality

## Table of Contents

- [About](#about)
- [Project Structure](#structure)
- [Running locally](#run_locally)
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

## Running Locally <a name = "run_locally"></a>

You will need NodeJS (V. 14 or +) and Docker

Don't worry, a local Mongodb will run on a docker container.

```
docker-compose up
```

## Unit tests <a name = "tests"></a>

For the unit tests, the project uses an [In Memory Mongodb Server](https://github.com/nodkz/mongodb-memory-server). To execute the unit tests run:

```
npm test
```
