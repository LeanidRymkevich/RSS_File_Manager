import { dirname } from 'path';
import { fileURLToPath } from 'url';

const getCommonJSProps = importMetaUrl => {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirName = dirname(__filename);

  return {__filename, __dirName};
}

export { getCommonJSProps };