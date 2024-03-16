#!/usr/bin/env node

const util = require('util');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const exec = util.promisify(require('child_process').exec);

async function runCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.error(stderr);
  } catch (error) {
    console.error(error);
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

// Validate arguments
if (process.argv.length < 3) {
  console.log('Please specify the target project directory.');
  console.log('For example:');
  console.log('    npx create-nodejs-app my-app');
  process.exit(1);
}

// Define constants
const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/the-developer-org/create-express-lite.git';

// Check if directory already exists
try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      'Directory already exists. Please choose another name for the project.'
    );
  } else {
    console.error(err);
  }
  process.exit(1);
}

async function setup() {
  try {
    // Check if git is installed
    const hasGitInstalled = await hasGit();
    if (!hasGitInstalled) {
      console.error('Git is not installed. Please install Git and try again.');
      process.exit(1);
    }

    // Clone repo
    console.log(`Downloading files from ${repo}`);
    await runCmd(`git clone --depth 1 ${repo} ${folderName}`);
    console.log('Cloned successfully.');

    // Change directory
    process.chdir(appPath);

    // Install dependencies
    console.log('Installing dependencies...');
    await runCmd('npm install');
    console.log('Dependencies installed successfully.');

    // Copy environment variables
    fs.copyFileSync(
      path.join(appPath, '.env.example'),
      path.join(appPath, '.env')
    );
    console.log('Environment files copied.');

    // Delete .git folder
    await runCmd('npx rimraf ./.git');

    fs.unlinkSync(path.join(appPath, 'CONTRIBUTION.md'));
    fs.unlinkSync(path.join(appPath, 'bin', 'create-express-lite.js'));
    fs.rmdirSync(path.join(appPath, 'bin'));
    fs.unlinkSync(path.join(appPath, 'package-lock.json'));

    console.log('Installation is now complete!');
    console.log();
    console.log('To start the application, navigate to the project directory:');
    console.log(`    cd ${folderName}`);
    console.log('Then run the following command:');
    console.log('    npm run dev');
    console.log();
    console.log(
      'Enjoy your production-ready Node.js app, which supports a number of ready-made features!'
    );
    console.log('Check README.md for more info.');
  } catch (error) {
    console.error(error);
  }
}

setup();
