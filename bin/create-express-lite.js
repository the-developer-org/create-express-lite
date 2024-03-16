#!/usr/bin/env node

const util = require('util');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const cliProgress = require('cli-progress');

const exec = util.promisify(require('child_process').exec);

async function runCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    return { stdout, stderr };
  } catch (error) {
    throw new Error(stderr);
  }
}

async function hasGit() {
  try {
    await execSync('git --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function setup() {
  try {
    console.log('Welcome to Create Express Lite!');
    console.log(
      'This utility will help you set up a new Express.js project quickly.'
    );

    // Check if git is installed
    const hasGitInstalled = await hasGit();
    if (!hasGitInstalled) {
      throw new Error(
        'Git is not installed. Please install Git and try again.'
      );
    }

    // Validate arguments
    if (process.argv.length < 3) {
      throw new Error(
        'Please specify the target project directory.\nFor example: npx create-express-lite my-app'
      );
    }

    // Define constants
    const ownPath = process.cwd();
    const userProvidedName = process.argv[2];
    const folderName =
      userProvidedName === '.' ? path.basename(ownPath) : userProvidedName;
    const appPath = path.join(ownPath, folderName);
    const repo = 'https://github.com/the-developer-org/create-express-lite.git';

    // Check if directory already exists
    try {
      fs.mkdirSync(appPath);
    } catch (err) {
      if (err.code === 'EEXIST') {
        throw new Error(
          'Directory already exists. Please choose another name for the project.'
        );
      } else {
        throw err;
      }
    }

    // Clone repo
    console.log(`\nDownloading files from ${repo}`);
    await runCmd(`git clone --depth 1 ${repo} ${folderName}`);
    console.log('Cloned successfully.\n');

    // Change directory
    process.chdir(appPath);

    // Install dependencies
    console.log('Installing dependencies...');
    const progressBar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    progressBar.start(100, 0);
    const { stderr } = await runCmd('npm install');
    progressBar.stop();
    if (stderr) {
      throw new Error(stderr);
    }
    console.log('Dependencies installed successfully.\n');

    // Copy environment variables
    fs.copyFileSync(
      path.join(appPath, '.env.example'),
      path.join(appPath, '.env')
    );
    console.log('Environment files copied.\n');

    // Delete .git folder
    await runCmd('npx rimraf ./.git');

    // Remove unnecessary files
    fs.unlinkSync(path.join(appPath, 'CONTRIBUTING.md'));
    fs.unlinkSync(path.join(appPath, 'bin', 'create-express-lite.js'));
    fs.rmdirSync(path.join(appPath, 'bin'));
    fs.unlinkSync(path.join(appPath, 'package-lock.json'));

    console.log('Installation is now complete!\n');
    console.log('To start the application, navigate to the project directory:');
    console.log(`  cd ${folderName}`);
    console.log('Then run the following command:');
    console.log('  npm run dev\n');
    console.log(
      'Enjoy your production-ready Node.js app, which supports a number of ready-made features!'
    );
    console.log('Check README.md for more info.');
  } catch (error) {
    console.error(`\nError: ${error.message}`);
  }
}

setup();
