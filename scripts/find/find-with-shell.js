#! /usr/bin/env node

// Node built-in modules
const util = require('util');
// https://nodejs.org/docs/latest-v12.x/api/child_process.html#child_process_child_process_exec_command_options_callback
const exec = util.promisify(require('child_process').exec);

const findAllOnly = async () => {
  // Find all files and folders in current dir and count lines of words
  await exec('find . && find . | wc -l', (err, stdout, stderr) => {
    if (err) return console.error(`exec error: ${err}`);

    // Store the output of find . (stdout) in data var
    data = stdout;

    console.log(`stdout:`, stdout);
    console.error(`stderr: ${stderr}`);
  });

  // Wait for data to be assembled before printout to terminal
  setTimeout(() => {
    console.log(`After 1 s: ${data}`);
  }, 1000)
}

findAllOnly();

module.exports = findAllOnly;