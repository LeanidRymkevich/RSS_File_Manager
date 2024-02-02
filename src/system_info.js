import {EOL, arch, cpus, homedir, userInfo} from 'os';

import { checkMissingAgs } from './utils.js';
import { InputError, OperationError } from './custom_errors.js';

const printEOL = () => {
  const res = EOL === '\r\n' ? '\\r\\n' : '\\n';
  console.log(`OS end-of-line marker is ${res}`);
};

const printSPUs = () => {
  const res = cpus().map(cpu => {
    return {
      model: cpu.model,
      ['clock rate']: `${cpu.speed / 1000} GHz`,
    }
  })
  console.log(`Overall amount of CPUS is ${res.length}`);
  console.table(res);
};

const printArch = () => {
  console.log(`OS CPU architecture is ${arch()}`);
}

const printHomedir = () => {
  console.log(`The path to current user's home directory is ${homedir()}`);
}

const printUserName = () => {
  console.log(`The currently effective user name is - ${userInfo().username}`);
}

const actions = {
  EOL: printEOL,
  cpus: printSPUs,
  homedir: printHomedir,
  username: printUserName,
  architecture: printArch,
}

const sysInfo = flag => {
  checkMissingAgs([flag]);
  
  const action = actions[flag];
  if (!action)
    throw new InputError(`Flag "${flag}" of 'os'-command doesn't exist`);

  try {
    action();
  } catch(err) {
    throw new OperationError(err.message);
  }
};

export default sysInfo;