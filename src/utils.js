import { dirname } from 'path';
import { fileURLToPath } from 'url';

const getCommonJSProps = importMetaUrl => {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirName = dirname(__filename);

  return {__filename, __dirName};
}

const getEnteredUserName = () => process.argv[2].split('=')[1];

const printWelcomeMsg = userName => console.log(`Welcome to the File Manager, ${userName}!`);

const printFarewellMsg = userName => console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);

const printEnterCommandMsg = workingDirPath => {
  console.log(`\nYou are currently in ${workingDirPath}`);
  process.stdout.write('Please enter next command > ');
};

const finishAppExecution = userName => {
  printFarewellMsg(userName);
  process.exit(0);
};

const parseCommand = data => {
  const parts = data.toString().trim().split(' ').map(part => part.replaceAll('-', ''));
  return {
    name: parts[0],
    args: parts.slice(1),
  };
};

export { 
  getCommonJSProps,
  getEnteredUserName,
  printWelcomeMsg,
  printEnterCommandMsg,
  finishAppExecution,
  parseCommand,
};