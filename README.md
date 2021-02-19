
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