#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const currentDir = path.join('.')
const bufDir = Buffer.from(currentDir).toString('utf8');

const walkThroughDir = (dir) => {
  // withFileTypes set to true gives us access to Dirent.name, Dirent.type (file or dir)
  fs.readdir(dir, { withFileTypes: true }, (err, items) => {
    if (err) return console.error(err);

    let listOfFiles = [];

    // Iterate through all items of the current dir
    items.map(item => {
      let itemName = item.name;
      let itemPath = path.join(dir + '/' + itemName);

      if (item.isFile()) {
        // Only push item to file list if type is a file
        listOfFiles.push(itemPath);

        // Get list of all items:
        listOfFiles.forEach(item => console.log(item))
      } else if (item.isDirectory()) {
        // Recursion func w/ current path calls itself as long as item is a dir
        walkThroughDir(itemPath);
      }
    });
  });
}

walkThroughDir(currentDir);

