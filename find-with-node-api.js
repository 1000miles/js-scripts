const path = require('path')
const fs = require('fs');

var currentDir = '.';

/**
 * Task: Loop through list of items and print out files
 * If it is a directory call itself until the end of each dir (file) => Recursion
 * If it is a file print out the current filepath
 * Precede with './' for every filepath
 */

// Depth-first binary tree in pre-order mode DLR (data, left, right) = Dirs (branches) go before files (leafs)
const walkThroughDir = function (dir, done) {
  // https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_stat_path_options_callback
  fs.readdir(dir, function (err, items) {
      if (err) return done(err);

      let newItemPath;
      let i = 0;

      // Self-executing function to walk through items list
      (function walk () {
          // Increment item out of items by 1
          let item = items[i++];

          // If item does not exist return null
          if (!item) return done(null);

          let str = '.'
          itemPath = path.join('/' + dir + '/' + item);

          // Prepend '.' on every itemPath
          newItemPath = str + itemPath;

          // Get stats to retrieve filetype out of itemPath
          fs.stat(newItemPath, function (err, stats) {
            if (!item) return console.log(err);

            // https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_stats_isdirectory
            if (stats && stats.isDirectory()) {
                // Trigger recursive function walkThroughDir() to call itself if directory
                walkThroughDir(newItemPath, function (err) {
                  if (!item) return console.log(err);
                  // Keep looping through items
                  walk();
                });
            } else {
              // Keep looping through items
              walk();
            }
          });
          // Print out result of each item
          console.log(newItemPath);
      })();
  });
};

// Call walkThroughDir() w/ callback
walkThroughDir(currentDir, function(error) {
  if (error) throw error;
});