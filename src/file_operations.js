import { parse, sep } from 'path';
import { createWriteStream, createReadStream, } from 'fs';
import { mkdir } from 'fs/promises';
import { pipeline } from 'stream/promises';

import { OperationError } from './custom_errors.js';
import { getAbsolutePath } from './navigation.js';

const customCopyFile = async (pathToFile, pathToFolder) => {
  const filePath = getAbsolutePath(pathToFile);
  const folderPath = getAbsolutePath(pathToFolder);

  let {dir: fileDir, ext: fileExt, name: fileName} = parse(filePath);

  if (fileDir === folderPath) fileName = `${fileName}-copy`;
  const destinationPath = `${folderPath}${sep}${fileName}${fileExt}`;

  try {
    await mkdir(folderPath, {recursive: true});
  } catch {
    throw new OperationError(`Failed to create folder at the path - ${filePath}.`);
  }

  let rs;
  try {
    rs = createReadStream(filePath);    
  } catch {
    throw new OperationError(`File '${filePath}' was deleted or not exists!`);
  }

  let ws;
  try {
    ws = createWriteStream(destinationPath);
  } catch {
    throw new OperationError(`Failed to create file at the path - ${destinationPath}.`);
  }
  
  try {
    await pipeline(rs, ws);
  } catch {
    throw new OperationError(`Error while copying ${filePath} into ${destinationPath}`);
  }
};

const customReadFile = async (pathToFile) => {
  const filePath = getAbsolutePath(pathToFile);

  let rs;
  try {
    rs = createReadStream(filePath, {encoding: 'utf-8'});
  } catch {
    throw new OperationError(`File '${filePath}' was deleted or not exists!`);
  }

  
  try {
    await pipeline(rs, process.stdout, {end: false});
    console.log(); // for formatting
  } catch {
    throw new OperationError(`Error while file '${filePath}' reading.`);
  }
};

export {
  customCopyFile,
  customReadFile,
};
