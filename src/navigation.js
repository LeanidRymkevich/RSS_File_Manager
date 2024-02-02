import { homedir } from 'os';
import { sep, isAbsolute, parse, resolve, join } from 'path';
import { access, readdir, stat } from 'fs/promises';

import CustomError from './CustomError.js';
import { sortFolderItems, getFolderItemsInfo } from './utils.js';

const FOLDER_NOT_EXISTS_MSG = 'The folder at this path does not exist';

let workDirPath = homedir();

const getAbsolutePath = path => {
  const { root } = parse(workDirPath);
  const { root: pathRoot } = parse(path);
  const wrongSep = sep === '\\' ? '/' : '\\';

  if (path.includes(wrongSep)) 
    throw new CustomError(`You use wrong path separator for this OS. Use '${sep}' instead!`);

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
  const {ext} = parse(pathToDir[0]);
  if (ext) throw new CustomError(FOLDER_NOT_EXISTS_MSG);
  
  const path = getAbsolutePath(pathToDir[0]);
  try {
    await access(path);
    workDirPath = path;
  } catch {
    throw new CustomError(FOLDER_NOT_EXISTS_MSG); 
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