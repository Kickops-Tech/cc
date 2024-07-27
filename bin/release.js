#! /usr/bin/env node
import { execSync } from 'child_process';
import { consola, createConsola } from 'consola';

consola.box('@kickops/cc | publish tool');
consola.start('Building...');

try {
  await execSync('npm run build');
  consola.success('Build successful!');
} catch (err) {
  consola.error(err);
  consola.info('Error building the project, exiting...');
  process.exit(1);
}

/** @type {"major" | "minor" | "patch"} */
let prompt;

try {
  prompt = await consola.prompt('Select release type:', {
    type: 'select',
    options: ['major', 'minor', 'patch'],
  });
} catch (err) {
  consola.error(err);
  consola.info('Could not get release type, exiting...');
  process.exit(1);
}

/** @type {string} */
let version;

consola.info(`Patching version number with '${prompt}'`);
try {
  let buff = await execSync(`npm version ${prompt}`);
  version = buff.toString();
  consola.success(`Version number patched successfully!`);
  consola.info(`Version number: ${version}`);
} catch (err) {
  consola.error(err);
  consola.info('Could not patch version number, exiting...');
  process.exit(1);
}

console.info(`Preparing to publish '@kickops/cc@${version}'`);

try {
  await execSync(`npm publish --access public`);
  consola.success(`Published '@kickops/cc@${version}' successfully!`);
} catch (err) {
  consola.error(err);
  consola.info('Could not publish package, exiting...');
  process.exit(1);
}
