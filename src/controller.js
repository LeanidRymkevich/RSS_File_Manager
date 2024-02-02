import { finishAppExecution } from './ui.js';
import { InputError } from './custom_errors.js';
import { up, cd, ls } from './navigation.js';
import { customCopyFile } from './file_operations.js';

const NO_SUCH_CMD_ERR_MSG = 'Such a command not found';

const COMMANDS = {
  EXIT: '.exit',
  MOVE_UP_FOLDER_TREE: 'up',
  MOVE_TO_PATH: 'cd',
  SHOW_FOLDER_ITEMS: 'ls',
  COPY_FILE: 'cp',
}

const actions = {
  [COMMANDS.EXIT]: finishAppExecution,
  [COMMANDS.MOVE_UP_FOLDER_TREE]: up,
  [COMMANDS.MOVE_TO_PATH]: cd,
  [COMMANDS.SHOW_FOLDER_ITEMS]: ls,
  [COMMANDS.COPY_FILE]: customCopyFile,
};

const executeCommand = async (command) => {
  const action = actions[command.name];
  
  console.log(); // for formatting output

  try {
    if (action) {
      await action(...command.args);
    } else {
      throw new InputError(NO_SUCH_CMD_ERR_MSG);
    }
  } catch(err) {
    console.log(err.message);
  }

  console.log(); // for formatting output
};

export { executeCommand, COMMANDS};
