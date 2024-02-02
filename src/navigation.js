import { homedir } from 'os';
import { sep, isAbsolute, parse, resolve, join } from 'path';
import { readdir, stat } from 'fs/promises';

import { InputError, OperationError } from './custom_errors.js';
import { sortFolderItems, getFolderItemsInfo } from './utils.js';

const FOLDER_NOT_EXISTS_MSG = 'The folder at this path does not exist!';
const NOT_FOLDER_ERR_MSG = 'The path entered refers to a file, not a folder!'

let workDirPath = homedir();

const getAbsolutePath = path => {
  const { root } = parse(workDirPath);
  const { root: pathRoot } = parse(path);
  const wrongSep = sep === '\\' ? '/' : '\\';

  if (path.includes(wrongSep)) 
    throw new InputError(`You use wrong path separator for this OS. Use '${sep}' instead!`);

  if (isAbsolute(path)) {
    const pathWithDelRoot = path.split(sep).slice(1).join(sep);
    return (pathRoot === sep ? root : pathRoot) + pathWithDelRoot;
  }

  return resolve(workDirPath, path);
};

const up = () => {
  const cutParts = workDirPath.split(sep).slice(0, -1);

  if (cutParts.length <= 1) {
    workDirPath = `${cutParts[0]}${sep}`;
    return;
  }
  workDirPath = cutParts.join(sep);
};

const cd = async (pathToDir) => {  
  const path = getAbsolutePath(pathToDir[0]);
  try {
    const stats = await stat(path);
    if (!stats.isDirectory()) throw new InputError(NOT_FOLDER_ERR_MSG)

    workDirPath = path;
  } catch(err) {
    if (err instanceof InputError) throw err;
    throw new OperationError(FOLDER_NOT_EXISTS_MSG); 
  }
};

const ls = async () => {
  const folderItemsNames = await readdir (workDirPath);
  const isDirPromises = folderItemsNames.map(item => stat(join(workDirPath, item)).then(stat => stat.isDirectory()));
  const isDirObjs = await Promise.allSettled(isDirPromises);
  const itemsInfo = getFolderItemsInfo(folderItemsNames, isDirObjs);
  const sortedItemsInfo = sortFolderItems(itemsInfo);

  console.table(sortedItemsInfo);
};

export {
  workDirPath,
  getAbsolutePath,
  up,
  cd,
  ls,
};