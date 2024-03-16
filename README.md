# create-express-lite

create-express-lite is a command-line tool that helps you kickstart your Express.js applications by generating a boilerplate code structure. Similar to `create-react-app` for React, `npx-create-express-lite` simplifies the process of setting up a new Express.js project, allowing you to focus on building your application rather than dealing with the initial configuration.

## Getting Started

To create a new Express.js project using create-express-lite, follow these simple steps:

1. Open your terminal or command prompt.

2. Run the following command:

   ```bash
   npx create-express-lite <your-folder-name>
   ```

   Replace `<your-folder-name>` with the desired name for your project.

   or

   ```bash
   npx create-express-lite .
   ```

   To get the project files in the current directory

3. The tool will prompt you for some basic configuration options, such as package manager (npm or yarn) and whether you want to include additional features like database integration or authentication.

4. Once the setup is complete, navigate to your project folder(skip if you are already in your project folder):

   ```bash
   cd <your-folder-name>
   ```

5. Start your Express.js server:

   ```bash
   npm start
   ```

Now you have a basic Express.js application up and running!

## Features

- **Quick Setup:** Create a new Express.js project with just one command.

- **Customizable:** During project creation, you can choose additional features and configurations according to your project requirements.

- **Opinionated Structure:** Follows a recommended project structure to maintain consistency and best practices.

## Directory Structure

The generated project structure follows best practices for organizing your Express.js application. Here's an overview:

```
my-express-app/
│
├── config/
│   ├── config.js                   // General configurations
│   ├── database.js                 // Database connection setup
│   ├── logger.js                   // Logging configuration
│   ├── email.config.js   // Additional configurations (if needed)
│   └── ...                         // Other configuration files
│
├── controllers/
│   ├── authController.js           // Controllers for authentication-related logic
│   └── ...                         // Other controllers
│
├── middlewares/
│   ├── error.js                    // Error handling middleware
│   ├── validate.js                 // Validation middleware
│   └── ...                         // Other middleware modules
│
├── models/
│   ├── User.js                     // User model (Mongoose schema)
│   ├── pluginToJSON.js             // Plugin to convert model to JSON
│   └── ...                         // Other model files
│
├── routes/
│   ├── authRoutes.js               // Routes for authentication
│   ├── otherRoutes.js              // Other routes
│   └── ...                         // Other route files
│
├── services/
│   ├── userService.js              // Service for user-related operations
│   ├── authService.js              // Service for authentication-related operations
│   ├── emailService.js             // Service for sending emails
│   └── ...                         // Other service modules
│
├── templates/
│   ├── emailTemplates/             // Templates for email content
│   └── ...                         // Other template files
│
├── utils/
│   ├── apiError.js                 // Utility for handling API errors
│   ├── async.js                    // Utility for handling asynchronous operations
│   ├── errorMessage.js             // Utility for generating error messages
│   ├── pick.js                     // Utility for picking specific properties from objects
│   └── ...                         // Other utility modules
│
├── validations/
│   ├── authValidations.js          // Validations for authentication
│   ├── customValidations.js        // Custom validations
│   ├── validationHelper.js         // Helper functions for validation
│   └── ...                         // Other validation files
│
├── .env                            // Environment variables
├── .eslintrc.json                  // ESLint configuration
├── .gitignore                      // Git ignore file
├── .prettierrc.json                // Prettier configuration
├── app.js                          // Express application setup
├── package.json                    // Project dependencies and scripts
└── server.js                       // Entry point for running the server


```

Feel free to customize the generated code to suit your specific needs.

## Contributing

If you encounter any issues, have suggestions, or want to contribute to create-express-lite, please check out the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

Happy coding with create-express-lite
