import * as path from 'path';
import * as fsExtra from 'fs-extra';

create();
async function create() {
  const tempPath = path.join(__dirname, '..', 'temp-resource');
  const samplePath = path.join(__dirname, '..', 'sample');
  const srcPath = path.join(__dirname);

  try {
    await fsExtra.ensureDir(tempPath);
    console.error('temp-resource directory exists.');
    process.exit(1);
  } catch (err) {}

  await fsExtra.emptyDir(srcPath);
  await fsExtra.copy(samplePath, tempPath, {
    filter(src, dest) {
      if (src.includes('node_modules')) return false;

      return true;
    },
    recursive: true,
  });
}
