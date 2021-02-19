# Endpoint

* **/api/contact** (**POST**) - To create data contact, which will later be distributed to agents,
```sh
// JSON BODY
{
  "contacts": [
   {"name": string, "email": string, "phone": string, "userId": number},
   ...
  ]
}
```
* **/api/contact/:user_id** (**GET**) - To get list of contacts that have been created by {user_id}
* **/api/seeder/regular** (**GET**) - To execute seeder for regular data like role, team, user
* **/api/seeder/contacts** (**GET**) - To execute seeder for contacts

## Installation

Rename .env.example to .env

Change to all you server need

Installation requires [Node.js](https://nodejs.org/) v4+ to run.
Installation requires [Typescrript](https://www.typescriptlang.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install typescript -g
$ npm install
```

## Usage

Before start app for development or production, migrate the database first:

```sh
$ npm run migrate
$ npm run seeder

```

### To start the app for development: 

```sh
// Development
$ npm run start:dev

```

### To start the app for prodcution:

First change the .env to
```sh
APP_DEBUG=false
```

then start the app:

```sh
// Build to production
$ npm run build

// Start the app + build
$ npm run start
```

