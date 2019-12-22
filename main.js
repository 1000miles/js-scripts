#! /usr/bin/env node

const path = require('path');
// This module extends the native fs with promise support
const fs = require('fs-extra');

// const find = require('./find');
const findAndSave = require('./findAndSave');

// SRC + DEST folders
const originalFiles = "original-files";
const copiedFiles = "copied-files";

const originalDir = path.join(__dirname + "../" + originalFiles + "/");
const copiedDir = path.join(__dirname + "/" + copiedFiles + "/");
const dirs = [originalDir, copiedDir];

const ensureDirExists = async () => dirs.map(dir => {
  // This method is equivalent to mkdirpSync => ensures recursive paths exist on create
  if (!fs.existsSync(dir)) {
    fs.ensureDirSync(dir);
    return console.log(`Source directory ${dir} successfully created.`);
  }
});

const readAndCopyDir = async () => {
  fs.readdir(originalDir, async (err, files) => {
    if (err) throw err;

    // Regex against unallowed chars in filename
    let whiteSpace = /\s+/g;
    let sensitiveFiles = /^\./g
    // Any char that is not alphanumeric, digit, whitespace, '-', '.' and more is not allowed
    // With this regex negation we can catch symbols as well as emojis
    let specialChars = /[^a-zA-Z\d\s-.]+/g;

    // Iterate through each file in src dir
    try {
      files.map(async (file) => {
        if (typeof file !== 'undefined') {
          let newFile;

          if (file.match(whiteSpace)) {
            newFile = file.replace(whiteSpace, "-");

            console.log(`Removed white space and sanitized: '${file}' => '${newFile}'`);
          } else if (file.match(specialChars)) {
            newFile = file.replace(specialChars, "");

            console.log(`Removed special chars and sanitzed: '${file}' => '${newFile}'`
            );
          } else {
            newFile = file;
          }

          const syncProcess = async () => {
            try {
              // Copy files and folders from src to dest dir
              console.log(`COPY process starting...`);

              fs.copySync(originalDir + file, copiedDir + newFile);

              console.log(`${files.length} files or folders successfully copied.`);

              if (file.match(sensitiveFiles)) {
                // This will remove all sensitive files only from dest dir
                fs.unlink(copiedDir + file, (err) => {
                  if (err) throw err;
                  console.log(`Sensitive file ${file} has been removed from dest directory ${copiedDir}.`);
                });
              }
            } catch (err) {
              console.error(`Error while copying`, err);
            }
          }
          await syncProcess();
        }
      })
    } catch (err) {
      console.error(`Error while iterating through files.`, err)
    }
  })
}

findAndSave();
ensureDirExists();
readAndCopyDir();
