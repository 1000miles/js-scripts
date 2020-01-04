#! /usr/bin/env node

// Node buil-in modules
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const findAllOnly = async () => {
  // Find all files and folders in current dir and count lines of words of output
  // Store the output of find . (stdout) in data var and print out data in terminal
  await exec('find . && find . | wc -l', (stdout, stderr) => {
    if (stderr) return console.error(`exec error: ${stderr}`);

    data = stdout;

    console.log(`stdout:`, stdout);
  });

  // Wait for data to be assembled before printout to terminal
  setTimeout(() => {
    console.log(`After 1 s: ${data}`);
  }, 1000)
}

findAllOnly();

module.exports = findAllOnly;