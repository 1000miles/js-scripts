#! /usr/bin/env node

// Node buil-in modules
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Find all non-hidden files without process args
const findAllOnly = async () => {
  await exec('find . && find . | wc -l', (stdout, stderr) => {
    if (stderr) return console.error(`exec error: ${stderr}`);

    data = stdout;

    console.log(`stdout:`, stdout);
  });

  setTimeout(() => {
    console.log(`After 1 s: ${data}`);
  }, 1000)
}

findAllOnly();

module.exports = findAllOnly;