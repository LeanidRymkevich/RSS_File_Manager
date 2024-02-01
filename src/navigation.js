import { homedir } from 'os';
import { sep, isAbsolute, parse, resolve, join } from 'path';
import { access, readdir, stat } from 'fs/promises';

import CustomError from './CustomError.js';

const FOLDER_NOT_EXISTS_MSG = 'The folder at this path does not exist';

let workingDirPath = homedir();

const getAbsolutePath = path => {
  const { root } = parse(workingDirPath);
  const { root: pathRoot } = parse(path);
  const wrongSep = sep === '\\' ? '/' : '\\';

  if (path.includes(wrongSep)) 
    throw new CustomError(`You use wrong path separator for this OS. Use '${sep}' instead!`);

  if (isAbsolute(path)) {
    const pathWithDelRoot = path.split(sep).slice(1).join(sep);
    return (pathRoot === sep ? root : pathRoot) + pathWithDelRoot;
  }

  return resolve(workingDirPath, path);
};

const up = () => {
  const cutParts = workingDirPath.split(sep).slice(0, -1);

  if (cutParts.length <= 1) {
    workingDirPath = `${cutParts[0]}${sep}`;
    return;
  }
  workingDirPath = cutParts.join(sep);
};

const cd = async (pathToDir) => {
  const {ext} = parse(pathToDir[0]);
  if (ext) throw new CustomError(FOLDER_NOT_EXISTS_MSG);
  
  const path = getAbsolutePath(pathToDir[0]);
  try {
    await access(path);
    workingDirPath = path;
  } catch {
    throw new CustomError(FOLDER_NOT_EXISTS_MSG); 
  }
};

const ls = async () => {
  const folderItemsNames = await readdir (workingDirPath);
  const isDirsPromises = folderItemsNames.map(item => stat(join(workingDirPath, item)).then(stat => stat.isDirectory()));
  const isDirObjs = await Promise.allSettled(isDirsPromises);
  const itemsInfo = [];

  for (let i = 0; i < isDirObjs.length; i++) {
    const isDirsObj = isDirObjs[i];

    if (isDirsObj.status === 'rejected') continue;

    const info = {
      name: folderItemsNames[i],
      isDir: isDirsObj.value,
    };
    itemsInfo.push(info);
  }
  const sortedItemsInfo = itemsInfo.sort((a, b) => {
    if ((a.isDir && b.isDir) || (!a.isDir && !b.isDir)) {
      return a.name.localeCompare(b.name);
    } else if (a.isDir && !b.isDir){
      return -1;
    } else {
      return 1;
    }
  });
  sortedItemsInfo.forEach(item => console.log(item));
  // add console.table
};
ls()
export {
  workingDirPath,
  getAbsolutePath,
  up,
  cd,
  ls,
};