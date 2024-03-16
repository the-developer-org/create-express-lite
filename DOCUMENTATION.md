## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Development Environment Variables
DEV_PORT=3000
MONGODB_DEV_URI=mongodb://localhost:27017/mydatabase
SMTP_HOST_DEV=smtp.example.com
SMPT_PORT_DEV=587
SMTP_USERNAME_DEV=your_smtp_username
SMTP_PASSWORD_DEV=your_smtp_password
EMAIL_FROM_DEV=your_email@example.com
API_BASE_URL_DEV=http://localhost:3000/api

# Production Environment Variables
PROD_PORT=80
MONGODB_PROD_URI=mongodb://prod.example.com:27017/mydatabase
SMTP_HOST_PROD=smtp.prod.example.com
SMPT_PORT_PROD=587
SMTP_USERNAME_PROD=prod_smtp_username
SMTP_PASSWORD_PROD=prod_smtp_password
EMAIL_FROM_PROD=prod_email@example.com
API_BASE_URL_PROD=https://api.example.com

# Additional Information
# HASH_SALT is used for hashing passwords.
# It should be a long, random string to ensure security.
HASH_SALT=your_random_hash_salt_here

```

## Project Structure

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

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /auth/v1/signup` - signup\
`POST /auth/v1/login` - login\

**email**:\
`POST /auth/v1/verify-email` - verify email

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const { catchAsync } = require('../util/async');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error(code, message, name);
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "name": "user not found",
  "message": "NOTFOUND"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
const User = require('../models/User');
const { EMAIL_ALREADY_IN_USE } = require('../util/errorMessages');
const ApiError = require('../util/ApiError');

exports.createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    const { code, name, message } = EMAIL_ALREADY_IN_USE;
    throw new ApiError(code, message, name);
  }
  return User.create(userBody);
};
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const express = require('express');
const { validate } = require('../middlewares/validate');
const router = express.Router();
const authValidation = require('../validations/authValidations');
const authController = require('../controllers/authController');

router.post('/signup', validate(authValidation.signup), authController.signup);
```

## Logging and Response

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const { Logger } = require('../config/logger');
exports.errorHandler = (err, req, res, next) => {
  Logger.log('error', {
    req: req,
    errorCode: err.name || 'INTERNAL_SERVER_ERROR',
    message: err.message || 'Internal Server Error',
    user: req.body || req.user || 'User data not provided',
  });
  return res.status(err.statusCode).json({
    error: {
      errorCode: err.name || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'Please try again later',
    },
  });
};
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `warn`, and `error` logs will be printed to the console.\

Note: API request information (request url, response code, ) are not automatically logged. You have to pass it as a parameter, but timestamps are automatically logged.

## Custom Mongoose Plugins

The app also contains 1 custom mongoose plugin that you can attach to any mongoose model schema. You can find the plugins in `src/models/plugins`.

```javascript
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    /* schema definition here */
  },
  { timestamps: true }
);

userSchema.plugin(toJSON);

const User = mongoose.model('User', userSchema);
```

### toJSON

The toJSON plugin applies the following changes in the toJSON transform call:

- removes \_\_v, createdAt, updatedAt, and any schema path that has private: true
- replaces \_id with id

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## License

[MIT](LICENSE)
