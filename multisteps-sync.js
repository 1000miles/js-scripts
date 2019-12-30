#! /usr/bin/env node

// Node built-in modules
const path = require('path');

const fs = require('fs-extra'); // Extends the native fs module w/ promise support and async functions
const shell = require('shelljs'); // Unix shell commands in JS
const chalk = require('chalk'); // Colorizes terminal outputs

// const find = require('./find');
const findAndSave = require('./find-and-save-with-shell');

// SRC + DEST folders from original-files > copied-files > final-files
const originalDir = path.join(__dirname + "/original-files");
const copiedDir = path.join(__dirname + "/copied-files");
const finalDir = path.join(__dirname + "/final-files");

// This order method makes sure that files and dirs are existent before they are sanitized or copied
let setTimeoutFunc = (err) => {
  console.log(`============ PROCESS 0 =========`);

  if (err) throw err;

  // setTimeout(() => removeAndCreateDirs, 500); // Process 1
  setTimeout(() => processReadAndCopy, 1500); // Process 2
  setTimeout(() => processRenameAndCopy, 3000); // Process 3
}

setTimeoutFunc();

const processReadAndCopy = (srcPath, destPath) => {
  console.log(`============ PROCESS 1 =========`);

  fs.readdir(srcPath, (err, items) => {
    if (err) throw err;

    setTimeout(() => copyFiles(srcPath, destPath, items), 2000);
  })
}

const processRenameAndCopy = (srcCopiedPath, finalDestPath) => {
  console.log(`============ PROCESS 2 =========`);

  fs.readdir(srcCopiedPath, (err, items)  => {
    if (err) throw err;

    setTimeout(() => readAndRenameItems(srcCopiedPath, finalDestPath, items), 5000);
  });
};

// Copy only from  original-files > copied-files
const copyFiles = (srcPath, destPath, items) => {
  try {
    console.log(`============ PROCESS 3 RMDIR 1: COPIED DIR =========`);
    shell.rm('-rf', copiedDir);

    console.log(`============ PROCESS 4 MKDIR 2: COPIED DIR =========`);
    shell.mkdir('-p', copiedDir);

    console.log(`============ PROCESS 5 COPY FROM ORIGIN DIR TO COPIED DIR =========`);
    items.map(item => {
      // fs.copy removes and replaces existing files in dest dir
      fs.copy(srcPath + '/' + item, destPath + '/' + item, err => {
        if (err) throw err;

        const fullSrcPath = srcPath + '/' + item;
        const fullCopiedPath = destPath + '/' + item;

        // Returns filename of given path
        const srcFilename = path.parse(fullSrcPath).base;

        console.log(`Successfully copied "${srcFilename}" to "${fullCopiedPath}."`);
      })
    });
  } catch (err) {
    console.error(err);
  };
}

// Rename files before copy from 'copied-files' (destDir) to 'final-files' (finalDestDir)
const readAndRenameItems = (srcCopiedPath, finalDestPath, items) => {
  try {
    // Any file name that contains one or more spaces or tabs
    const blankSpace = /(\s|[\t])+/g;
    // Any dot files or folders
    const hiddenFile = /(^|[\/\\])\../g
    // Negation to catch a special char if not word, digit, space, dash, dot one time or more occurrences => e.g. emoji, symbols, reserved chars
    const specialChar = /[^\w\d\s-.]+/g;

    let newFilename;
    let skipped = [];
    let newFileList = []; // This array is just for stats, not really necessary

    console.log(`============ PROCESS 6 RMDIR 1: FINAL DIR =========`);
    shell.rm('-rf', finalDir);

    // console.log(`============ PROCESS 7 MKDIR 2: FINAL DIR =========`);
    // shell.mkdir('-p', finalDir);

    items.map(item => {
      let filename = item;

      // FIXME: Case-when method does not ignore hidden files at the moment
      if (filename.match(hiddenFile)) {
        // Separate hidden files from files list to copy
        skipped.push(filename);
        return console.log(`Hidden file not allowed. Skipped:`, filename);
      } else if (filename.match(specialChar)) {
        newFilename = filename.replace(specialChar, '');
        newFileList.push(newFilename);
      } else if (filename.match(blankSpace)) {
        newFilename = filename.replace(blankSpace, '-');
        newFileList.push(newFilename);
      } else {
        newFilename = filename;
        newFileList.push(newFilename);
      }

      console.log(`============ PROCESS 8 RENAME FILES =========`);
      // Rename files and folders in copied-files dir before copy to final-files dir
      fs.rename(srcCopiedPath + '/' + filename, srcCopiedPath + '/' + filename, (err) => {
        if (err) throw err;

        console.log(`Successfully renamed ${filename} to ${newFilename}`);
      });

      // TODO: Ensure final-files dir exists - clarify why mkdir does not work outside map func
      shell.mkdir('-p', finalDir)

      console.log(`============ PROCESS 9 COPY FROM COPIED DIR TO FINAL DIR =========`);
      // fs.copy chained to make sure fs.rename runs first and returns sanitized item
      fs.copy(srcCopiedPath + '/' + filename, finalDestPath + '/' + newFilename, err => {
        if (err) return console.error(err);

        console.log(`Successfully copied sanitized file from ${srcCopiedPath}/${filename} to ${finalDestPath}/${newFilename}`);
      })
    });

    // Stats to see which items have been skipped, renamed or/and copied
    console.log(chalk.yellow(`
      Skipped: ${skipped} (${skipped.length}),
      File List: ${newFileList} (${newFileList.length})
    `));
  } catch (err) {
    console.error(err);
  }
}

processReadAndCopy(originalDir, copiedDir); // original-files (src) > copied files (dest)
processRenameAndCopy(copiedDir, finalDir); // copied-files (src) > final-files (final dest)
