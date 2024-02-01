import { COMMANDS } from './constants.js'
import { finishAppExecution } from './UI.js';
import CustomError from './CustomError.js';

const NO_SUCH_CMD_ERR_MSG = 'Such a command not found';

const actions = {
  [COMMANDS.EXIT]: finishAppExecution,
};

const executeCommand = command => {
  const action = actions[command.name];
  
  try {
    if (action) {
      action(command.args);
    } else {
      throw new CustomError(NO_SUCH_CMD_ERR_MSG);
    }
  } catch(err) {
    console.log(err.message);
  }
};

export default executeCommand;
