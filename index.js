#!/usr/bin/env node

const fs = require('fs');

fs.readdir(process.cwd(), async (err, files) => {
  if (err) {
    console.log(err);
    throw new Error(err);
  }
  for (let i = 0; i < files.length; i++) {
    try {
      const stat = await fs.promises.lstat(files[i]);
      if (stat.isDirectory()) {
        console.log(files[i] + '/');
      } else {
        console.log(files[i]);
      }
    } catch (err) {
      console.log(err);
    }
  }
});
