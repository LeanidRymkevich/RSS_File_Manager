import { workingDirPath } from './navigation.js';

const enteredUserName = process.argv[2].split('=')[1];

const printWelcomeMsg = () => console.log(`Welcome to the File Manager, ${enteredUserName}!`);

const printFarewellMsg = () => console.log(`\nThank you for using File Manager, ${enteredUserName}, goodbye!`);

const printEnterCommandMsg = () => {
  console.log(`\nYou are currently in ${workingDirPath}`);
  process.stdout.write('Please enter next command > ');
};

const finishAppExecution = () => {
  printFarewellMsg(enteredUserName);
  process.exit(0);
};

export {
  printWelcomeMsg,
  printEnterCommandMsg,
  finishAppExecution,
};