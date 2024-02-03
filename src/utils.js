import { sep, isAbsolute, parse, resolve, join } from 'path';

import { InputError } from './custom_errors.js';

const parseCommand = data => {
  const parts = data.toString().trim()
                               .split(' ')
                               .map(part => part.startsWith('--') ? part.slice(2) : part);
  return {
    name: parts[0],
    args: parts.slice(1),
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