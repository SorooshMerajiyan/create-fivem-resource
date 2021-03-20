import * as path from 'path';
import * as fsExtra from 'fs-extra';

create();
async function create() {
  const samplePath = path.join(__dirname, '..', 'sample');
  const mainPath = path.join(__dirname, '..');

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

  console.log(`>> Removing files.`);
  for (const file of filesToRemove) {
    await fsExtra.remove(path.join(mainPath, file));
  }

  console.log(`>> Removed ${filesToRemove.length} files.`);

  console.log(`>> Copying files.`);
  await fsExtra.copy(samplePath, mainPath, {
    filter(src) {
      if (src.includes('node_modules')) return false;

      return true;
    },
    recursive: true,
  });
  console.log(`>> All files are copied.`);
}
