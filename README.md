# Create Express App

Simplifies the process of setting up a new project using Node.js, Express, and Mongoose and REST API's.

By running a single command, you will get a production-ready Node.js app installed and fully configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation, allowing you to focus on building your application rather than dealing with the initial configuration.. For more details, check the features list below.

- [Setting up Express app](#creating-an-app) – How to setup an express app using create-express-lite.
- Create Express Lite works on macOS and Windows.
- If something doesn’t work, please [file an issue](https://github.com/the-developer-org/create-express-lite/issues/new).

## Quick Overview

```sh
npx create-express-lite my-app
cd my-app
npm run dev
```

If you've previously installed `create-lite-app` globally via `npm install -g create-express-lite`, you can aslo create the app using `create-express-lite my-app`.

If you are running in development environment the app will be running at [http://localhost:3000](http://localhost:3000).

## Creating an App

To create a new app, you may choose one of the following methods:

### npx

```sh
npx create-express-lite my-app
```

### npm

```sh
npm i create-express-lite
create-express-lite my-app
```

It will create a directory called `my-app` inside the current folder.
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-app/
│
├── config/
│   ├── config.js
│   ├── database.js
│   ├── logger.js
│   ├── email.config.js
│   └── ...
│
├── controllers/
│   ├── authController.js
│   └── ...
│
├── middlewares/
│   ├── error.js
│   ├── validate.js
│   └── ...
│
├── models/
│   ├── User.js
│   ├── plugins
│       └── toJSON.plugin.js
│
├── routes/
│   ├── authRoutes.js
│   └── ...
│
├── services/
│   ├── userService.js
│   ├── authService.js
│   ├── emailService.js
│   └── ...
│
├── templates/
│   ├── emailTemplates/
│   └── ...
│
├── utils/
│   ├── apiError.js
│   ├── async.js
│   ├── errorMessage.js
│   ├── pick.js
│   └── ...
│
├── validations/
│   ├── authValidations.js
│   ├── customValidations.js
│   ├── validationHelper.js
│   └── ...
│
├── .env
├── .eslintrc.json
├── .gitignore
├── .prettierrc.json
├── app.js
├── package.json
└── server.js

```

Once the installation is done, you can open your project folder:

```sh
cd my-app
```

Inside the newly created project, you can run some built-in commands:

### `npm run dev` or `npm run prod`

Runs the app in development mode.
The app will be available at [http://localhost:3000](http://localhost:3000) and is up and running.

The page will automatically reload if you make changes to the code when in development environment.
You will see the build errors and lint warnings in the console.

## User Guide

You can find detailed instructions on using Create Express Lite and many tips in [its documentation](DOCUMENTATION.md).

## What’s Included?

Your environment will have everything you need to build a express application:

- NoSQL database: MongoDB object data modeling using Mongoose
- Validation: request data validation using Joi
- Logging: logging using winston
- Error handling: centralized error handling mechanism
- Dependency management: with npm
- Environment variables: using dotenv
- Security: set security HTTP headers using helmet
- CORS: Cross-Origin Resource-Sharing enabled using cors
- Compression: gzip compression with compression
- Git hooks: with husky
- Linting: with ESLint and Prettier

The tradeoff is that **these tools are preconfigured to work in a specific way**. If your project needs more customization, you can customize it, but then you will need to maintain this configuration.

## Contributing

If you encounter any issues, have suggestions, or want to contribute to create-express-lite, please check out the [contribution guidelines](CONTRIBUTING.md).

## License

Create Express Lite is open source software [licensed as MIT](https://github.com/the-developer-org/create-express-lite/blob/main/LICENSE)

Happy coding with create-express-lite
