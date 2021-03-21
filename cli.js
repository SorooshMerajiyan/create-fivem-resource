#!/usr/bin/env node
const { exec } = require('child_process');

exec('npm run create-fivem-resource', (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
