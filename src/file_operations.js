import { join, parse, sep } from 'path';
import { createWriteStream, createReadStream, } from 'fs';
import { mkdir, writeFile, rename, unlink } from 'fs/promises';
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

    const rs = createReadStream(filePath);
    const ws = createWriteStream(destinationPath);

    await pipeline(rs, ws);
  } catch(err) {
    throw new OperationError(err.message);
  }
};

const customReadFile = async (pathToFile) => {
  checkMissingAgs([pathToFile]);

  const filePath = getAbsolutePath(pathToFile);

  let rs;
  try {
    rs = createReadStream(filePath, {encoding: 'utf-8'});

    await pipeline(rs, process.stdout, {end: false});

    console.log(); // for formatting
  } catch(err) {
    throw new OperationError(err.message);
  }
};

const createEmptyFile = async (fileName) => {
  checkMissingAgs([fileName]);

  const filePath = join(workDirPath, fileName);

  try {
    await writeFile(filePath, '');
  } catch(err) {
    throw new OperationError(err.message);
  }
};

const renameFile = async (pathToFile, newName) => {
  checkMissingAgs([pathToFile, newName]);

  const filePath = getAbsolutePath(pathToFile);
  const newPath = filePath.slice(0, filePath.lastIndexOf(sep) + 1) + newName;
  
  try {
    await rename(filePath, newPath);
  } catch(err) {
    throw new OperationError(err.message);
  }
};

const deleteFile = async (pathToFile) => {
  checkMissingAgs([pathToFile]);

  const filePath = getAbsolutePath(pathToFile);

  try {
    await unlink(filePath);
  } catch(err) {
    throw new OperationError(err.message);
  }
};

const moveFile = async (pathToFile, pathToFolder) => {
  await customCopyFile(pathToFile, pathToFolder);
  await deleteFile(pathToFile);
};

export {
  customCopyFile,
  customReadFile,
  createEmptyFile,
  renameFile,
  deleteFile,
  moveFile,
};
