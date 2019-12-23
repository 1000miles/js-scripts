# js-scripts

## Getting started

```
$ npm install
$ rm -rf copied-files/
$ node main.js
```

## Notes

- `find.js` is simple script to just run basic `find .` commands
- `findAndSave.js` saves all content from the current directory into a separate file.
- `main.js` pulls all together + lists, renames and syncs files and folders.

## Use cases for unreadable files

 - [x] File name contains blank spaces
 - [x] File name contains reserved chars, e.g. /, >, <, |, :, & , \, ?, ", '
 - [x] File name contains special chars or symbols
 - [x] File name contains '.' and is hidden
 - [x] File name contains emojis

  ## Bonus

 - [ ] File name contains camel case, uppercase
 - [ ] File name is in different locale chars, japanese
 - [ ] File name is longer than 255 chars
 - [ ] File is too big => chunk();

