# js-scripts

## Getting started

```shell
$ npm install
$ node <filename>.js
```

## Notes

## List all items of a specified dir, e.g. current dir
- `find-with-shell.js` is a simple script to just run basic `find .` commands
- `find-with-node-api-v1.js` does the same as the shell command `find .` but with node api.

## List all items of specified dir and copy list to a separate file
- `find-and-save-with-shell.js` saves all content from the current directory into a separate file each with shell command.

## List all items of specified dir and copy items of current dir to a destination dir
- `sync.js` saves all content from the current directory into a separate dir with node api.

## List all items, rename and copy to specified dirs (src > dest > final dest)
- `multisteps-sync.js` is an extended version of `sync.js`.

## List all items and stream content of items
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
