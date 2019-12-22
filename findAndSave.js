#! /usr/bin/env node

// Node buil-in modules
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

const findAllAndSaveToFile = async () => {
  const ext = '.log'
  const printFile = 'print-stdout' + ext;
  const printErrors = 'print-errors' + ext;

  // If print file exists clear content with truncate
  if (printFile) {
    exec('truncate -s 0 ' + printFile, error => {
      if (error) return console.error(`exec error: ${error}`);
    });
  };

  // List all files and folders in current dir and save standard output
  // to print to file instead of console
  await exec('find . > ../prints/' + printFile, stderr => {
    if (stderr) {
      console.log('STDERROR:', stderr);
      exec(stderr + '>' + printErrors);
    }
    // For better debugging
    process.on('unhandledRejection', err => {
      console.log(err);
    });
  });
}

findAllAndSaveToFile();

module.exports = findAllAndSaveToFile;