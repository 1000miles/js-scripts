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

        listOfFiles.map(file => {
          const stream = fs.createReadStream(file);
          let data;

          // STREAM READ CONTENT
          stream
            // TODO: Fix encoding for non-utf8 files
            .setEncoding('utf8')
            // 'readable' allows to consume readable stream data as chunks
            .on('readable', (err, chunk) => {
              if (err) return console.error(err);

              data += chunk; // Get data in chunks and assign to data

              // Consume data only if not null reduces memory leaks
              while (null !== (data = stream.read())) {
                console.log(`Data Bytes: ${data.length}`);

                console.log(`CHUNK:`, data);

                // Ensure data is consumed before writing
                setTimeout(() => {
                  //console.log('Pause data flow after 1 sec.');
                  stream.pause();
                }, 1000);

                setTimeout(() => {
                  //console.log('Resuming data flow after 2 sec.');
                  stream.resume();
                }, 2000);

                setTimeout(() => {
                  // Prevent infinite data flow
                  stream.close();
                  //console.log('Closing data flow after 3 sec.');
                }, 3000);
              }
            })
            // No more data
            .on('end', () => {
              console.log(`This is the end, my friend.`);
            })
            .on('error', (err) => {
              console.error(`Error while reading data:`, err);
            });
        });
      } else if (item.isDirectory()) {
        // Recursion func w/ current path calls itself as long as item is a dir
        walkThroughDir(itemPath);
      }
    });
  });
}

walkThroughDir(currentDir);

