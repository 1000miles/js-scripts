#! /usr/bin/env node

// Node built-in modules
const path = require('path');

// This module extends the native fs with promise support; most methods are async by default
const fs = require('fs-extra');
const shell = require('shelljs');

// const find = require('./find');
const findAndSave = require('./find-and-save-with-shell');

// SRC + DEST folders from original-files > copied-files
const originalDir = path.join(__dirname + "/original-files");
const copiedDir = path.join(__dirname + "/copied-files");

const processReadAndCopy = (srcPath, destPath) => {
  fs.readdir(srcPath, (err, items) => {
    if (err) throw err;

    copyFiles(srcPath, destPath, items);
  });
}

const copyFiles = (srcPath, destPath, items) => {
  // Clean up before copy in case of cluttering files
  if (destPath) shell.rm('-rf', './copied-files');

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