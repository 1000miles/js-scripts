#! /usr/bin/env node

const path = require('path');
// This module extends the native fs with promise support
const fs = require('fs-extra');

// const find = require('./find');
const findAndSave = require('./findAndSave');

// SRC + DEST folders
const originalFiles = "original-files";
const copiedFiles = "copied-files";

const originalDir = path.join(__dirname + "/" + originalFiles + "/");
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
    let hiddenFile = /^\.+/g;
    // Any char that is not alphanumeric, digit, whitespace, '-', '.' and more is not allowed
    // With this regex negation we can catch symbols as well as emojis
    let specialChars = /[^a-zA-Z\d\s-.]+/g;

    // Iterate through each file in src dir
    files.map(async (file) => {
      let newFile;

      if (file.match(whiteSpace)) {
        newFile = file.replace(whiteSpace, "-");

        console.log(`Whitespace not allowd. Sanitized filename: '${file}' => '${newFile}'`);
      } else if (file.match(specialChars)) {
        newFile = file.replace(specialChars, "");

        console.log(`Special char not allowed. Sanitized filename: '${file}' => '${newFile}'`);
      } else if (file.match(hiddenFile)) {
        let removed = file;
        console.log(`Removed hidden file from list to copy:`, removed);
      } else {
        newFile = file;
      }

      const syncProcess = async () => {
        try {
          const filterFiles = () => {
            console.log(`CHECK for hidden files...`);

            // Do sth.
          }

          // Copy files and folders from src to dest dir
          console.log(`COPY process starting...`);

          // TODO: filter options
          fs.copySync(originalDir + file, copiedDir + newFile);
        } catch (err) {
          console.error(`Error while copying`, err);
        }
      }
      await syncProcess();
    })
  })
}

findAndSave();
ensureDirExists();
readAndCopyDir();
