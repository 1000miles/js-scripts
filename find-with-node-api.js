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
const path = require('path')

const currentDir = path.join('testwalk');

// Depth-first binary tree traversal in pre-order mode DLR (data, left, right) = Dirs (branches) go before files (leafs)
const walkThroughDir = (dir, done) => {
  // console.log(`==== PROCESS 2: Inside walkthroughDir() ====`)
  fs.readdir(dir, (err, items) => {
    // console.log(`==== PROCESS 3: Inside fs.readdir() ====`)

    if (err) return done(err);

    let i = 0;

    function walk() {
      //console.log(`==== PROCESS 5: Inside function walk() ====`)

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
      let isDir;

      // Get stats to retrieve filetype out of fullItemPath
      fs.stat(fullItemPath, async (err, stats) => {
        //console.log(`==== PROCESS 6: Inside fs.stat() ====`)

        if (err) return console.log(err);

        // Prepare props ctime and isDirectory stats for sorting
        let itemStats = {
          fullpath: fullItemPath,
          ctime: stats.ctime,
          isDirectory: true
        }

        newItemPath = itemStats.fullpath;
        newItemCtime = itemStats.ctime;
        isDir = itemStats.isDirectory;

        let statsList = [];

        if (stats && stats.isDirectory()) {
          //console.log(`==== PROCESS 7: if directory, push to statsList`)
          statsList.push({ fullpath: newItemPath, ctime: newItemCtime, isDirectory: isDir });

          // Trigger recursive function walkThroughDir() to call itself if directory
          walkThroughDir(newItemPath, function (err) {
            //console.log(`==== PROCESS 8: if directory, inside walkThroughDir()` recursion)
            if (err) return console.log(err);

            //console.log(`==== PROCESS 9: if directory, call walk()` - recursion)
            walk(); // Keeo looping
          });
        } else {
          //console.log(`==== PROCESS 7: if file push to statsList ====`)
          statsList.push({ fullpath: newItemPath, ctime: newItemCtime, isDirectory: !isDir });

          //console.log(`==== PROCESS 8: if file, call walk()` - recursion)
          walk(); // Keeo looping
        }

        // console.log(`==== PROCESS: OUTPUT WITHOUT SORTING ====`)
        // Non-Sorting Option
        statsList.map(file => {
          console.log(file.fullpath)
        });

        // Sorting Option
        //console.log(`==== PROCESS: OUTPUT WITH SORTING ====`)
        // TODO: Sorting adopted to shell command `find .` to also sort dirs
        // statsList
        //   .sort((a, b) => {
        //    //console.log(`A:`, a); console.log(`B:`, b);
        //     return b.ctime - a.ctime // Sort by last recent changed file in desc, then abc-order
        //   })
        //   .map(file => {
        //     console.log(file.fullpath)
        //   })
      });
    };
    //console.log(`==== PROCESS 4: Call walk() func`)
    walk();
  })
};

//console.log(`==== PROCESS 1: Start => Call walkThroughDir() func ====`)
walkThroughDir(currentDir, (err) => {
  if (err) throw err;
});