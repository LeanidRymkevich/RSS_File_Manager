import { createReadStream, } from 'fs';
import { createHash } from 'crypto';

import { OperationError } from './custom_errors.js';
import { getAbsolutePath } from './navigation.js';
import { checkMissingAgs } from './utils.js';
import { finished, pipeline } from 'stream/promises';

const calcHash = async (pathToFile) => {
  checkMissingAgs([pathToFile]);

  const filePath = getAbsolutePath(pathToFile);

  try {
    const rs = createReadStream(filePath, {encoding: 'utf-8'});
    const hash = createHash('sha256');

    await pipeline(rs, hash);
    console.log(`Hash for the file ${filePath} is:\n${hash.digest('hex')}`);
  } catch(err) {
    throw new OperationError(err.message);
  }
};

export default calcHash;