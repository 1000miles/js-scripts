#! /usr/bin/env node

// Node buil-in modules
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const findAllAndSaveToFile = async () => {
  const ext = '.log'
  const printFile = 'print-stdout' + ext;
  const printErrors = 'print-errors' + ext;

  // If print file exists clear content with truncate
  // if (printFile) {
  //   exec('truncate -s 0 ' + printFile, error => {
  //     if (error) return console.error(`exec error: ${error}`);
  //   });
  // };

  // If stdout dir does not exist create one with prints as parent and redirect stdout (1) to print file
  // If stdout dir exists only redirect stdout to print file
  await exec(`
    [ -d ./prints/stdout ] ||  mkdir -p ./prints/stdout &&  find . 1> ./prints/stdout/${printFile}`,
    stderr => {
    if (stderr) {
      console.error('STDERROR:', stderr);
      // If stderr dir does not exist create one with prints as parent dir and redirect stderr (2) to error file
      // If stderr folder exists only redirect stderr to error file
      exec(`
      [ -d ./prints/stderr ] || mkdir -p ./prints/stderr | find .  2> ./prints/stderr/${printErrors}`
      )
    }
    // For better debugging
    process.on('unhandledRejection', err => {
      console.log(err);
    });
  });
}

findAllAndSaveToFile();

module.exports = findAllAndSaveToFile;