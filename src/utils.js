import { dirname } from 'path';
import { fileURLToPath } from 'url';

const getCommonJSProps = importMetaUrl => {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirName = dirname(__filename);

  return {__filename, __dirName};
}

const parseCommand = data => {
  const parts = data.toString().trim().split(' ').map(part => part.replaceAll('-', ''));
  return {
    name: parts[0],
    args: parts.slice(1),
  };
};

export { 
  getCommonJSProps,
  parseCommand,
};