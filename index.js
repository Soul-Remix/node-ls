#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');

fs.readdir(process.cwd(), async (err, files) => {
  if (err) {
    console.log(err);
    throw new Error(err);
  }
  const statPromises = files.map((file) => {
    return fs.promises.lstat(file);
  });
  const arr = await Promise.all(statPromises);
  for (let stat of arr) {
    const i = arr.indexOf(stat);
    if (stat.isDirectory()) {
      console.log(chalk.redBright(files[i] + '/'));
    } else {
      console.log(files[i]);
    }
  }
});
