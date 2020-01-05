#! /usr/bin/env node

/**
 * Task: Loop through list of items and print out files
 * If it is a directory call itself until the end of each dir (file) => Recursion
 * If it is a file print out the current fullpath
 * Precede with './' for every fullpath
 *
 * LINKS:
 * https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_readdir_path_options_callback
 * https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_stat_path_options_callback
 * https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_stats_isdirectory
 */

 // Desired output for `find testwalk`
 console.log(`
  ./testwalk/a
  ./testwalk/c
  ./testwalk/d
  ./testwalk/d/e
  ./testwalk/b
 `);

const fs = require('fs');
const path = require('path');

const currentDir = path.join('walk-files');

const walkThroughDir = (dir) => {
  //console.log(`==== PROCESS 2: Inside walkthroughDir() ====`)
  // withFileTypes set to true gives us access to Dirent.name, Dirent.type (file or dir)
  fs.readdir(dir, { withFileTypes: true }, (err, items) => {
    //console.log(`==== PROCESS 3: Inside fs.readdir() ====`)
    if (err) return console.error(err);

    // Iterate through all items of the current dir
    items.map(item => {
      //console.log(`==== PROCESS 4: Inside items.map() ====`)
      let itemName = item.name;
      let itemPath = path.join(dir + '/' + itemName);

      let listOfFiles = [];

      if (item.isDirectory()) {
        //console.log(`==== PROCESS 5: if directory, recurse walkThroughDir()`)
        // Recursion func w/ current path calls itself as long as item is a dir
        walkThroughDir(itemPath);
      }

      //console.log(`==== PROCESS 5/6: Push all items to statsList ====`)
      listOfFiles.push(itemPath);

      //console.log(`==== PROCESS 7: OUTPUT ====`)
      // Print all items: files, folders and subfolders
      listOfFiles.forEach(item => console.log(item))
    });
  });
}

//console.log(`==== PROCESS 1: Start => Call walkThroughDir() ====`)
walkThroughDir(currentDir);
