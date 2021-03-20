import * as path from 'path';
import * as fsExtra from 'fs-extra';

create();
async function create() {
  const samplePath = path.join(__dirname, '..', 'sample');
  const srcPath = path.join(__dirname);

  const filesToRemove = [
    'package.json',
    'package-lock.json',
    'README.md',
    'tsconfig.json',
    '.npmignore',
    '.gitignore',
    '.github',
    'dist',
  ];

  for (const file of filesToRemove) {
    await fsExtra.remove(path.join(srcPath, file));
  }

  await fsExtra.copy(samplePath, srcPath, {
    filter(src) {
      if (src.includes('node_modules')) return false;

      return true;
    },
    recursive: true,
  });
}
