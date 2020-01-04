#! /usr/bin/env node

// Node built-in modules
const path = require('path');

const fs = require('fs-extra'); // Extends native fs api w/ promise support, most methods are async
const shell = require('shelljs'); // Unix shell command in js

// SRC + DEST folders from original-files > copied-files
const originalDir = path.join("original-files");
const copiedDir = path.join("copied-files");

const processReadAndCopy = (srcPath, destPath) => {
  fs.readdir(srcPath, (err, items) => {
    if (err) throw err;

    copyFiles(srcPath, destPath, items);
  });
}

const copyFiles = (srcPath, destPath, items) => {
  // Clean up before copy
  if (destPath) {
    console.log(`Removing copied-files dir....`);

    shell.rm('-rf', './copied-files');
  }

  items.map(item => {
    const fullSrcPath = srcPath + '/' + item;
    const fullCopiedPath = destPath + '/' + item;

    // fs.copy removes and replaces existing files in dest dir
    fs.copy(fullSrcPath, fullCopiedPath, err => {
      if (err) return console.error(err);

      const srcFilename = path.parse(fullSrcPath).base;

      console.log(`Successfully copied "${srcFilename}" to "${fullCopiedPath}."`);
    });
  });
}

processReadAndCopy(originalDir, copiedDir);