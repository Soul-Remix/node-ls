#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const target = process.argv[2] || process.cwd();

fs.readdir(target, async (err, files) => {
  if (err) {
    console.log(err);
    throw new Error(err);
  }
  const statPromises = files.map((file) => {
    return fs.promises.lstat(path.join(target, file));
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
