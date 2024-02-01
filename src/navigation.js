import { homedir } from 'os';
import { sep } from 'path';

let workingDirPath = homedir();

const up = () => {
  const cutParts = workingDirPath.split(sep).slice(0, -1);

  if (cutParts.length <= 1) {
    workingDirPath = `${cutParts[0]}${sep}`;
    return;
  }
  workingDirPath = cutParts.join(sep);
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