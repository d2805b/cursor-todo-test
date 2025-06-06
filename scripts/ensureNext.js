const { spawnSync } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');

const nextBin = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next');

if (!fs.existsSync(nextBin)) {
  console.error('Next.js is not installed. Please run `npm install` before running this command.');
  process.exit(1);
}

const args = process.argv.slice(2);
const result = spawnSync('node', [nextBin, ...args], { stdio: 'inherit' });
process.exit(result.status);
