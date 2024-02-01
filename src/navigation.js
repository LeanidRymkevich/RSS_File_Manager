import { homedir } from 'os';
import { sep } from 'path';

let workingDirPath = homedir();

const up = () => {
  const parts = workingDirPath.split(sep);
  console.log(parts);
};

const cd = pathToDir => {
  console.log(pathToDir);
};

const ls = () => {
  console.log('ls-command');
};


export {
  workingDirPath,
  up,
  cd,
  ls,
};