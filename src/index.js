import {
  getEnteredUserName,
  printEnterCommandMsg,
  printWelcomeMsg,
  finishAppExecution,
  parseCommand
} from './utils.js';
import { homeDirPath } from './os_logic.js';
import { COMMANDS } from './constants.js'

const launchApp = async () => {
  const userName = getEnteredUserName();
  const rs = process.stdin;

  let workingDirPath = homeDirPath;

  printWelcomeMsg(userName);
  printEnterCommandMsg(workingDirPath);

  rs.on('data', data => {
    const command = parseCommand(data);

    if (command.name === COMMANDS.EXIT) {
      finishAppExecution(userName);
    } else {
      console.log(`CommandName=${command.name} CommandArgs=${command.args}`);
      printEnterCommandMsg(workingDirPath);
    }
  })
  
  process.on('SIGINT', () => finishAppExecution(userName));
};

await launchApp();
