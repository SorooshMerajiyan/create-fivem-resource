#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const devLog = console.log;

create()
  .then(() => {
    console.log(`>> Completed.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(`XX Failed.`);
    console.error(err);
    process.exit(1);
  });

async function create() {
  devLog(`Current path: ${__dirname}`);
  const currentFiles = execSync('ls');
  devLog(`Current files: ${currentFiles}`);

  const dirName = process.argv[2];

  if (!dirName) {
    throw new Error(`Invalid dirname of ${dirName}`);
  }

  const dirPath = path.join(__dirname, dirName);
  devLog(`dirPath: ${dirPath}`);

  const dirExists = fs.existsSync(dirPath);

  if (dirExists) {
    throw new Error(`Dirname of ${dirName} already exists.`);
  }

  fs.mkdirSync(dirPath);
  devLog(`Created dir at ${dirPath}`);

  execSync(`cd ./${dirName} && npm init -y && npm install fs-extra`);

  const internalFsPath = path.join(dirPath, 'node_modules', 'fs-extra');

  devLog(`Internal fs path: ${internalFsPath}`);

  const fsExtra = require(internalFsPath);

  const samplePath = path.join(__dirname, 'sample');

  devLog(`Sample path: ${samplePath}`);

  const mainPath = path.join(__dirname);

  devLog(`Main path: ${mainPath}`);

  const filesToRemove = [
    'package.json',
    'package-lock.json',
    'README.md',
    'tsconfig.json',
    '.npmignore',
    '.gitignore',
    '.github',
    'dist',
  ];

  console.log(`>> Removing files.`);
  for (const file of filesToRemove) {
    await fsExtra.remove(path.join(mainPath, file));
  }

  console.log(`>> Removed ${filesToRemove.length} files.`);

  console.log(`>> Copying files.`);
  await fsExtra.copy(samplePath, mainPath, {
    filter(src) {
      if (src.includes('node_modules')) return false;

      return true;
    },
    recursive: true,
  });
  console.log(`>> All files are copied.`);

  await fsExtra.remove(samplePath);
  console.log(`>> Removed sample dir.`);
}
