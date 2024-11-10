# Home Library Service

## Prerequisites

Git - [Download & Install Git](https://git-scm.com/downloads).

Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

Use 22.x.x version (22.9.0 or upper) of Node.js

## Downloading

```
git clone https://github.com/Elena-Amelia/nodejs2024Q3-service.git
```
Go to folder nodejs2024Q3-service

Go to development branch:
```
git checkout develop
```
## Installing NPM modules

```
npm install
```
## Running application
Based on the `.env.example` file, create a `.env` file and change the PORT if it's necessary (by default the application runs on port 4000)

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:{PORT}/doc/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Available endpoints:
{entity} can be user, artist, album or track
```
GET      http://localhost:{PORT}/{entity}
GET      http://localhost:{PORT}/{entity}/{uuid}
POST     http://localhost:{PORT}/{entity}
PUT      http://localhost:{PORT}/{entity}/{uuid}
DELETE   http://localhost:{PORT}/{entity}/{uuid}

GET      http://localhost:{PORT}/favs
POST     http://localhost:{PORT}/favs/{entity}/{uuid}
DELETE   http://localhost:{PORT}/favs/{entity}/{uuid}