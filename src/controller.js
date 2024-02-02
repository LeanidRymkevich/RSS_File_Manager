import { finishAppExecution } from './ui.js';
import { InputError } from './custom_errors.js';
import { up, cd, ls } from './navigation.js';
import {
  customCopyFile,
  customReadFile,
  createEmptyFile,
  renameFile,
  deleteFile,
  moveFile,
} from './file_operations.js';
import sysInfo from './system_info.js';
import calcHash from './hash.js';

const COMMANDS = {
  EXIT: '.exit',
  MOVE_UP_FOLDER_TREE: 'up',
  MOVE_TO_PATH: 'cd',
  SHOW_FOLDER_ITEMS: 'ls',
  COPY_FILE: 'cp',
  READ_FILE: 'cat',
  CREATE_EMPTY_FILE: 'add',
  RENAME_FILE: 'rn',
  DELETE_FILE: 'rm',
  MOVE_FILE: 'mv',
  SYSTEM_INFO: 'os',
  CALCULATE_HASH: 'hash',
};

const actions = {
  [COMMANDS.EXIT]: finishAppExecution,
  [COMMANDS.MOVE_UP_FOLDER_TREE]: up,
  [COMMANDS.MOVE_TO_PATH]: cd,
  [COMMANDS.SHOW_FOLDER_ITEMS]: ls,
  [COMMANDS.COPY_FILE]: customCopyFile,
  [COMMANDS.READ_FILE]: customReadFile,
  [COMMANDS.CREATE_EMPTY_FILE]: createEmptyFile,
  [COMMANDS.RENAME_FILE]: renameFile,
  [COMMANDS.DELETE_FILE]: deleteFile,
  [COMMANDS.MOVE_FILE]: moveFile,
  [COMMANDS.SYSTEM_INFO]: sysInfo,
  [COMMANDS.CALCULATE_HASH]: calcHash,
};

const executeCommand = async (command) => {
  const action = actions[command.name];
  
  console.log(); // for formatting output

  try {
    if (action) {
      await action(...command.args);
    } else {
      throw new InputError(`Command "${command.name}" doesn't exist`);
    }
  } catch(err) {
    console.log(err.message);
  }

  console.log(); // for formatting output
};

export { executeCommand, COMMANDS};
