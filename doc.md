
## List all files and folders and redirect stderr (2) to stdout
- `find . > file.log 2>&1` => saves output of command to file.log and redirects stderr (2) to stdout (1)


  //   // Loop through all file names and count down by 1 until i = 0
  //   for (let i = files.length - 1; i >= 0; i--) {
  //     // console.log(`File name:`, files[i]);

  //     let file = files[i];

  //     let whiteSpace = /\s+/g;
  //     // Special char = NOT alpha numeric, whitespace, emoji and "-" or "."
  //     let specialChars = /[^a-zA-Z\d\s-.]+/g;

  //     let newFileName;

  //     if (file.match(whiteSpace)) {
  //       return newFileName = file.replace(whiteSpace, '-');
  //     } else if (file.match(specialChars)) {
  //       return newFileName = file.replace(specialChars, '');
  //     }

  //     fs.rename(originalDir + '/' + file, copiedDir + '/' + newFileName, err => {
  //       if(err) return console.log('ERROR:', err);
  //       console.log(`Rename complete`)
  //     });
  //   }
  // })
   )}