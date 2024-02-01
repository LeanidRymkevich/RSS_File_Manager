import { parse, sep } from 'path';
import { createWriteStream, createReadStream } from 'fs';
import { mkdir } from 'fs/promises';
import { pipeline } from 'stream/promises';

import CustomError from './CustomError.js';

const MKDIR_ERR_MSG = 'Error on new directory creation';
const COPY_ERR_MSG = 'Error on file copying';


const customCopyFile = async (pathToFile, pathToFolder) => {
  let {dir: fileDir, ext: fileExt, name: fileName} = parse(pathToFile);

  if (fileDir === pathToFolder) fileName = `${fileName}-copy`;
  const destinationPath = `${pathToFolder}${sep}${fileName}${fileExt}`;

  try {
    await mkdir(pathToFolder, {recursive: true});
  } catch {
    throw new CustomError(MKDIR_ERR_MSG);
  }

  try {
    const rs = createReadStream(pathToFile);
    const ws = createWriteStream(destinationPath);
  
    await pipeline(rs, ws);
  } catch {
    throw new CustomError(COPY_ERR_MSG);
  }
};

export { customCopyFile }
