# Endpoint

* **/api/notification** (**POST**) - To create data contact, which will later be distributed to agents,
```sh
{
  "name": string,
  "email": string,
  "phone": string,
  "sender": number,
  "target": number
}
```
* **/api/contact/:user_id** (**POST**) - HTML enhanced for web apps!

## Installation

Rename .env.example to .env

Change this to your database settings
```sh
DATABASE_HOST=127.0.0.1
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
```

Installation requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install typescript -g
$ npm install
```

## Usage

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
