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

    // Self-executing function to walk through items list
    function walk() {
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
          ctime: stats.ctime,
          isDirectory: false
        }

        newItemPath = itemStats.fullpath;
        newItemCtime = itemStats.ctime;
        isDir = itemStats.isDirectory;

        let statsList = [];

        if (stats && stats.isDirectory()) {
          statsList.push({ fullpath: newItemPath, ctime: newItemCtime, isDirectory: !isDir });

          // Trigger recursive function walkThroughDir() to call itself if directory
          walkThroughDir(newItemPath, function (err) {
            if (err) return console.log(err);

            walk();
          });
        } else {
          statsList.push({ fullpath: newItemPath, ctime: newItemCtime, isDirectory: isDir });

          walk();
        }

        // Non-Sorting Option
        // statsList.map(file => {
        //   console.log(file.fullpath)
        // })

        // Sorting Option
        // TODO: Sorting adopted to shell command `find .` to also sort dirs
        statsList
          .sort((a, b) => {
            //console.log(`A:`, a); console.log(`B:`, b);
            return b.ctime - a.ctime // Sort by last recent changed file in desc, then abc-order
          })
          .map(file => {
            console.log(file.fullpath)
          })
      });
    };
    walk();
  })
};

walkThroughDir(currentDir, (err) => {
  if (err) throw err;
});