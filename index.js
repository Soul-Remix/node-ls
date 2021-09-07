#!/usr/bin/env node

const fs = require('fs');

fs.readdir(process.cwd(), async (err, files) => {
  if (err) {
    console.log(err);
    throw new Error(err);
  }
  const arr = files.map((file) => {
    return fs.promises.lstat(file);
  });
  await Promise.all(arr);
  for (let i = 0; i < arr.length; i++) {
    if ((await arr[i]).isDirectory()) {
      console.log(files[i] + '/');
    } else {
      console.log(files[i]);
    }
  }
});
