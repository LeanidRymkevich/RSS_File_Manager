import { parse, sep, join } from 'path';
import { createWriteStream, createReadStream } from 'fs';
import { mkdir } from 'fs/promises';
import { pipeline } from 'stream/promises';

import { OperationError } from './custom_errors.js';
import { getAbsolutePath } from './navigation.js';

const MKDIR_ERR_MSG = 'Error on new directory creation.';
const COPY_ERR_MSG = 'Error on file copying.';


const customCopyFile = async (pathToFile, pathToFolder) => {
  const filePath = getAbsolutePath(pathToFile);
  const folderPath = getAbsolutePath(pathToFolder);

  let {dir: fileDir, ext: fileExt, name: fileName} = parse(filePath);

  if (fileDir === folderPath) fileName = `${fileName}-copy`;
  const destinationPath = join(folderPath, fileName, fileExt);

  try {
    await mkdir(folderPath, {recursive: true});
  } catch {
    throw new OperationError(MKDIR_ERR_MSG);
  }

  try {
    const rs = createReadStream(filePath);
    const ws = createWriteStream(destinationPath);
  
    await pipeline(rs, ws);
  } catch {
    throw new OperationError(COPY_ERR_MSG);
  }
};

export { customCopyFile }
