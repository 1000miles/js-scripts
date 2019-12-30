#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const currentDir = path.join('.');

const walkThroughDir = (dir) => {
  // withFileTypes set to true gives us access to Dirent.name, Dirent.type (file or dir)
  fs.readdir(dir, { withFileTypes: true }, (err, items) => {
    if (err) return console.error(err);

    let listOfFiles = [];

    // Iterate through all items of the current dir
    items.map(item => {
      let itemName = item.name;
      let itemPath = path.join(dir + '/' + itemName);

      if (item.isDirectory()) {
        // Recursion func w/ current path calls itself as long as item is a dir
        walkThroughDir(itemPath);
      }

      listOfFiles.push(itemPath);

      // Print all items: files, folders and subfolders
      listOfFiles.forEach(item => console.log(item))
    });
  });
}

walkThroughDir(currentDir);

