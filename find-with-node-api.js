#! /usr/bin/env node

/**
 * Task: Loop through list of items and print out files
 * If it is a directory call itself until the end of each dir (file) => Recursion
 * If it is a file print out the current fullpath
 * Precede with './' for every fullpath
 *
 * LINKS:
 * https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_stat_path_options_callback
 * https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_stats_isdirectory
 */

const fs = require('fs');
const path = require('path')

var currentDir = '.';

// Depth-first binary tree traversal in pre-order mode DLR (data, left, right) = Dirs (branches) go before files (leafs)
const walkThroughDir = (dir, done) => {
  fs.readdir(dir, (err, items) => {
    if (err) return done(err);

    let i = 0;
    let statsList = [];

    // Self-executing function to walk through items list
    (function walk () {
      // Increment item out of items by 1
      let item = items[i++];

      // If item does not exist return null
      if (!item) return done(null);

      let str = '.'
      itemPath = path.join('/' + dir + '/' + item);

      // Prepend '.' on every itemPath
      fullItemPath = str + itemPath;

      let newItemPath;
      let newItemCtime;

      // Get stats to retrieve filetype out of itemPath
      fs.stat(fullItemPath, (err, stats) => {
        if (err) return console.log(err);

        // Assign ctime props to stats for sorting by changed time (ctime)
        let itemStats = {
          fullpath: fullItemPath,
          ctime: stats.ctime
        }

        newItemPath = itemStats.fullpath;
        newItemCtime = itemStats.ctime;

        if (stats && stats.isDirectory()) {
          // Trigger recursive function walkThroughDir() to call itself if directory
          walkThroughDir(newItemPath, function (err) {
            if (err) return console.log(err);

            // Keep looping through items (recursion)
            walk();
          });
        } else {
          // Keep looping through items (recursion)
          walk();
        }

        statsList.push({ fullpath: newItemPath, ctime: newItemCtime });

        // return statsList;

        // Sorting Option
        // TODO: Sorting adopted to shell command `find .`
        statsList
          .sort((a, b) => {
            return b.ctime - a.ctime // desc order
          })
          .map(file => {
            console.log(file.fullpath)
          })
      })
        // Non-Sorting Option
        // statsList.map(file => {
        //   console.log(file.fullpath)
        // })
    })();
  });
};

walkThroughDir(currentDir, (err) => {
  if (err) throw err;
});