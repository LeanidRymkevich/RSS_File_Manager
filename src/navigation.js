import { homedir } from 'os';

const homeDirPath = homedir();

let workingDirPath = homeDirPath;

export {
  homeDirPath,
  workingDirPath,
};