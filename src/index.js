import { 
  printWelcomeMsg,
  printEnterCommandMsg
} from './UI.js';
import { parseCommand } from './utils.js';
import executeCommand from './controller.js';
import { COMMANDS } from './constants.js';

const launchApp = async () => {
  printWelcomeMsg();
  printEnterCommandMsg();

  process.stdin.on('data', async (data) => {
    const command = parseCommand(data);
    await executeCommand(command);
    printEnterCommandMsg();
  });
  
  process.on('SIGINT', () => executeCommand({name: COMMANDS.EXIT, args: undefined}));
};

await launchApp();
