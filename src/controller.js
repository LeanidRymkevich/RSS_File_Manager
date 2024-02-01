import { COMMANDS } from './constants.js'
import { finishAppExecution } from './UI.js';
import CustomError from './CustomError.js';
import { up, cd, ls } from './navigation.js';

const NO_SUCH_CMD_ERR_MSG = 'Such a command not found';

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
      await action(command.args);
    } else {
      throw new CustomError(NO_SUCH_CMD_ERR_MSG);
    }
  } catch(err) {
    console.log(err.message);
  }

  console.log(); // for formatting output
};

export default executeCommand;
