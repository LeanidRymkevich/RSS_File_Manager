import { 
  printWelcomeMsg,
  printEnterCommandMsg
} from './ui.js';
import { parseCommand } from './utils.js';
import { executeCommand, COMMANDS} from './controller.js';

const launchApp = async () => {
  printWelcomeMsg();
  printEnterCommandMsg();

  process.stdin.on('data', async (data) => {
    const command = parseCommand(data);
    await executeCommand(command);
    printEnterCommandMsg();
  });
  
  process.on('SIGINT', () => executeCommand({name: COMMANDS.EXIT, args: []}));
};

await launchApp();
