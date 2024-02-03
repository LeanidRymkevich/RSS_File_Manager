import { sep, parse } from 'path';

import { InputError } from './custom_errors.js';

const parseCommand = data => {
  const input = data.toString().trim();

  let args = [];
  let buffer = '';
  let isQuoteOpen = false;

  for(let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === '"' && !isQuoteOpen) {
      isQuoteOpen = true;
      continue;
    }
    
    if (char === '"' && isQuoteOpen) {
      isQuoteOpen = false;
      args.push(buffer);
      buffer = '';
      continue;
    } 
    
    if (isQuoteOpen) {
      buffer += char;
      continue;
    }
    
    if (char === ' ' && !isQuoteOpen) {
      if (!buffer) continue;

      args.push(buffer);
      buffer = ''
      continue;
    }

    buffer += char;
    
    if(buffer && i === input.length - 1) args.push(buffer);
  }

  args = args.map(arg => arg.startsWith('--') ? arg.slice(2) : arg);

  return {
    name: args[0],
    args: args.slice(1),
  };
};

const sortFolderItems = items => items.sort((a, b) => {
  if ((a.type === 'directory' && b.type === 'directory') ||
    (a.type === 'file' && b.type === 'file')) {
    return a.name.localeCompare(b.name);
  } else if (a.type === 'directory' && b.type === 'file') {
    return -1;
  } else {
    return 1;
  }
});

const getFolderItemsInfo = (names, isDirObjs) => {
  const itemsInfo = [];

  for (let i = 0; i < isDirObjs.length; i++) {
    const isDirObj = isDirObjs[i];

    if (isDirObj.status === 'rejected') continue;

    const info = {
      name: names[i],
      type: isDirObj.value ? 'directory' : 'file',
    };
    itemsInfo.push(info);
  }

  return itemsInfo;
};

const checkMissingAgs = args => {
  args.forEach(arg => {
    if (!arg || typeof arg !== 'string')
      throw new InputError('The arguments needed for the operation has not been provided!');
  });
};

const checkPathOnForbidChars = path => {
  const { root } = parse(path);
  const pathToCheck = path.replace(root.slice(0, -1), '');
  const wrongSep = sep === '\\' ? '/' : '\\';
  const forbiddenPathChars = [wrongSep, '*', '?', ':', '"', '<', '>', '|'];
  const errMsg = `Path shouldn't include next chars: ${forbiddenPathChars.toString()} (except : for root in Windows). ` + 
    `The ${sep} char will be treated as a path separator`;

  forbiddenPathChars.forEach(char => {
    if (pathToCheck.includes(char))
      throw new InputError(errMsg);
  });
};

export {
  parseCommand,
  sortFolderItems,
  getFolderItemsInfo,
  checkMissingAgs,
  checkPathOnForbidChars,
};