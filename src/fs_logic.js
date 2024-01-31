import { parse, sep } from 'path';
import { createWriteStream, createReadStream } from 'fs';
import { mkdir } from 'fs/promises';
import { pipeline } from 'stream/promises';

import { ERROR_MSG } from './constants.js';


const customCopyFile = async (pathToFile, pathToFolder) => {
  let {dir: fileDir, ext: fileExt, name: fileName} = parse(pathToFile);

  if (fileDir === pathToFolder) fileName = `${fileName}-copy`;
  const destinationPath = `${pathToFolder}${sep}${fileName}${fileExt}`;

  try {
    await mkdir(pathToFolder, {recursive: true});
    const rs = createReadStream(pathToFile);
    const ws = createWriteStream(destinationPath);
    await pipeline(rs, ws);
  } catch {
    console.log(ERROR_MSG);
  }
};

export { customCopyFile }
