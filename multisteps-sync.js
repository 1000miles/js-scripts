#! /usr/bin/env node

// Node built-in modules
const path = require('path');

const fs = require('fs-extra'); // Extends the native fs module w/ promise support and async functions
const shell = require('shelljs'); // Unix shell commands in JS
const chalk = require('chalk'); // Colorizes terminal outputs

// const find = require('./find');
const findAndSave = require('./findAndSave');

// SRC + DEST folders from original-files > copied-files > final-files
const originalDir = path.join(__dirname + "/original-files");
const copiedDir = path.join(__dirname + "/copied-files");
const finalDir = path.join(__dirname + "/final-files");

// Existing and empty dirs before start
const removeAndCreateDirs = () => {
  shell.exec('rm -rf copied-files final-files', err => {
  if (err) throw err;

  console.log(`Removed ${copiedDir} and ${finalDir} dirs before start.`)
  })

  // Aquivalent to fs.ensureDir();
  shell.exec('mkdir -p copied-files final-files', err => {
  if (err) throw err;

  console.log(`Created ${copiedDir} and ${finalDir} dir before start.`)
  });
}

// First run
const processReadAndCopy = (srcPath, destPath) => {
  fs.readdir(srcPath, (err, items) => {
    if (err) throw err;

    setTimeout(() => copyFiles(srcPath, destPath, items), 2000);
  })
}

// Second run
const processRenameAndCopy = (srcCopiedPath, finalDestPath) => {
  fs.readdir(srcCopiedPath, (err, items)  => {
    if (err) throw err;

    setTimeout(() => readAndRenameItems(srcCopiedPath, finalDestPath, items), 5000);
  });
};

// Copy only from  original-files > copied-files
const copyFiles = (srcPath, destPath, items) => {
  try {
      items.map(item => {
      const fullSrcPath = srcPath + '/' + item;
      const fullCopiedPath = destPath + '/' + item;

      // Ensure copied-files dir exists
      shell.mkdir('-p', copiedDir);

      // fs.copy removes and replaces existing files in dest dir
      fs.copy(fullSrcPath, fullCopiedPath, err => {
        if (err) throw err;
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

      const fullCopiedPath = srcCopiedPath + '/' + filename;
      const fullFinalDestPath = finalDestPath + '/' + newFilename;

      // Sanitize and rename files and folders in copied-files dir before copy to final-files dir
      const renameSingleSrcItems = () => {
        fs.rename(srcCopiedPath + '/' + filename, srcCopiedPath + '/' + newFilename, (err) => {
          if (err) throw err;

          console.log(`Successfully renamed ${filename} to ${newFilename}`);
        });
      }

      // Ensure final-files dir exists
      shell.mkdir('-p', finalDir)

      // fs.copy chained to make sure fs.rename runs first and returns sanitized item
      fs.copy(fullCopiedPath, fullFinalDestPath, err => {
        if (err) return console.error(err);

        console.log(`Successfully copied sanitized file from ${fullCopiedPath} to ${fullFinalDestPath}`);
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

// This order method makes sure that files and dirs are existent before they are sanitized or copied
let setTimeoutFunc = (err) => {
  if (err) throw err;

  setTimeout(() => removeAndCreateDirs, 500);
  setTimeout(() => processReadAndCopy, 1500);
  setTimeout(() => processRenameAndCopy, 3000);
}

setTimeoutFunc();

processReadAndCopy(originalDir, copiedDir); // original-files (src) > copied files (dest)
processRenameAndCopy(copiedDir, finalDir); // copied-files (src) > final-files (final dest)
