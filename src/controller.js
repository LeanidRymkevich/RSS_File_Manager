import { finishAppExecution } from './ui.js';
import { InputError } from './custom_errors.js';
import { up, cd, ls } from './navigation.js';

const NO_SUCH_CMD_ERR_MSG = 'Such a command not found';

const COMMANDS = {
  EXIT: '.exit',
  UP: 'up',
  CD: 'cd',
  LS: 'ls',
}

const actions = {
  [COMMANDS.EXIT]: finishAppExecution,
  [COMMANDS.UP]: up,
  [COMMANDS.CD]: cd,
  [COMMANDS.LS]: ls,
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
