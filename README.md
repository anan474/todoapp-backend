# Node.js express.js MongoDB JWT REST API

## Features

- Multiple environment ready (development, production)
- Compressed responses.
- Secured HTTP headers.
- CORS ready.
- Cache ready (Redis).
- HTTP request logger in development mode.
- Pagination ready.
- API autogenerated documentation by Postman.
- API collection example for Postman.
- Testing with mocha/chai for API endpoints.
- NPM scripts for cleaning and seeding the MongoDB database.
- NPM script for keeping good source code formatting using prettier and ESLint.
- Use of ESLint for good coding practices.

## Requirements

- Node.js **10+**
- MongoDB **3.6+**
- Redis **5.0+**

## How to install

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
npm update
```

### Setting up environments (development or production)

1.  In the root this repository you will find a file named `.env.example`
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment (development or production)
5.  Upload the `.env` to your environment server(development or production)
6.  If you use the postman collection to try the endpoints, change value of the variable `server` on your environment to the url of your server, for development mode use <http://localhost:3001>

## How to run

### Database cleaning and seeding samples

There are 3 available commands for this: `fresh`, `clean` and `seed`.

```bash
npm run command
```

- `fresh` cleans and then seeds the database with dynamic data.
- `clean` cleans the database.
- `seed` seeds the database with dynamic data.

### Running in development mode (lifting API server)

```bash
npm run dev
```

You will know server is running by checking the output of the command `npm run dev`

```bash
****************************
*    Memulai Server
*    Port: 3001
*    NODE_ENV: development
*    Database: MongoDB
*    DB Connection: OK
****************************
```

### Running tests

It´s a good practice to do tests at your code, so a sample of how to do that in `mocha/chai` is also included in the `/test` directory

```bash
npm run test
```

### Formatting code

Format your code with prettier by typing:

```bash
npm run format
```

### Formatting markdown files

Format all your markdown files with remark by typing:

```bash
npm run remark
```

### Linting code

Lint your code with ESLint by typing:

```bash
npm run lint
```

### Postman API example collection

You can import the example collection to Postman. To import, click the import button located and select `postman.json` located within the root directory.

Go to `manage environments` to create environments for development, production, etc. On each of the environments you create you will need to create a second key `server` with the url of your server, for development mode use <http://localhost:3001>

This is a REST API, so it works using the following HTTP methods:

- GET (Read): Gets a list of items, or a single item
- POST (Create): Creates an item
- PATCH (Update): Updates an item
- DELETE: Deletes an item

### Creating new models

If you need to add more models to the project just create a new file in `/app/models/` and it will be loaded dynamically.

### Creating new routes

If you need to add more routes to the project just create a new file in `/app/routes/` and it will be loaded dynamically.

### Creating new controllers

When you create a new controller file, try to also create another file with validations. Ex. `todos.js` and `todos.validate.js`. An example of this is included in the repository.