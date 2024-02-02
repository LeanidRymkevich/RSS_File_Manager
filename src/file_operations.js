import { join, parse, sep } from 'path';
import { createWriteStream, createReadStream, } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { pipeline } from 'stream/promises';

import { OperationError } from './custom_errors.js';
import { getAbsolutePath, workDirPath } from './navigation.js';
import { checkMissingAgs } from './utils.js';

const customCopyFile = async (pathToFile, pathToFolder) => {
  checkMissingAgs([pathToFile, pathToFolder]);

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
  checkMissingAgs([pathToFile]);

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

const createEmptyFile = async (fileName) => {
  checkMissingAgs([fileName]);

  const filePath = join(workDirPath, fileName);

  try {
    await writeFile(filePath, '');
  } catch {
    throw new OperationError(`Error while file '${filePath}' creating.`);
  }
};

const renameFile = async (pathToFile, newName) => {
  checkMissingAgs([pathToFile, newName]);
};

export {
  customCopyFile,
  customReadFile,
  createEmptyFile,
};
