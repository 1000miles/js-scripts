# js-scripts

## Getting started

```shell
$ npm install
$ node main.js

# OR:
$ node multisteps-sync.js
```

## Notes

- `find.js` is a simple script to just run basic `find .` commands
- `findAndSave.js` saves all content from the current directory into a separate file.
- `main.js` pulls all together + lists, renames and syncs files and folders.
- `multisteps-sync.js` is an extended version of `main.js`.
- `stream.js` streams the content of each file in a specified dir

## Use cases for unreadable files

 - [x] File name contains blank spaces
 - [x] File name contains reserved chars, e.g. /, >, <, |, :, & , ?, ", '
 - [x] File name contains special chars or symbols
 - [x] File name contains '.' and is hidden
 - [x] File name contains emojis

  ## Bonus

 - [x] File is an image
  - [x] JPEG (.jpg)
 - [x] File is too big (1GB)
 - [x] File name is in different locale chars, japanese
 - [ ] File is a Bitmap image (.bmp)
 - [ ] File is a corrupt PDF
 - [ ] File name contains camel case, uppercase
 - [ ] File name is longer than 255 chars
