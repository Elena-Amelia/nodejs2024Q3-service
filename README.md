# Home Library Service

## Prerequisites

Git - [Download & Install Git](https://git-scm.com/downloads).

Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

Docker Deskstop or Docker Engine

Use 22.x.x version (22.9.0 or upper) of Node.js

## Downloading

```
git clone https://github.com/Elena-Amelia/nodejs2024Q3-service.git
```

Go to folder nodejs2024Q3-service

Go to development branch:

```
git checkout develop-part3
```

## Installing NPM modules

```
npm install
```

## Running application

Based on the `.env.example` file, create a `.env` file (change settings if necessary).

```
npm run docker:start
```

When you first launch an application, postgres and application images is downloaded from Docker Hub.

After starting the app you can open
in your browser OpenAPI documentation by typing http://localhost:{PORT}/doc/.

## Stop application

The command must be run from another terminal.

```
npm run docker:stop
```

## Testing

After application running open new terminal and enter:

To run all tests with authorization

```
npm run test:auth
```

To run refresh test

```
npm run test:refresh
```

To test inside of container

```
npm run docker:test:auth
```

```
npm run docker:test:refresh
```

## Vulnerability scanning

To scan for postgres image vulnerabilities

```
npm run scan:postgres
```

To scan for app image vulnerabilities

```
npm run scan:app
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
