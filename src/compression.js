import { basename, join, parse } from 'path';
import { createWriteStream, createReadStream, } from 'fs';
import { mkdir } from 'fs/promises';
import { pipeline } from 'stream/promises';
import {createBrotliCompress, createBrotliDecompress} from 'zlib';

import { OperationError } from './custom_errors.js';
import { getAbsolutePath } from './navigation.js';
import { checkMissingAgs } from './utils.js';

const compressORdecompress = async (pathToFile, pathToZipFile, zip) => {
  checkMissingAgs([pathToFile, pathToZipFile]);

  const filePath = getAbsolutePath(pathToFile);
  const zipPath = getAbsolutePath(pathToZipFile);
  const { dir } = parse(zipPath);

  try {
    await mkdir(dir, {recursive: true});

    const rs = createReadStream(filePath);
    const ws = createWriteStream(zipPath);

    await pipeline(rs, zip, ws);
  } catch(err) {
    throw new OperationError(err.message);
  }
};

const compress = async (pathToFile, pathToZipFile) => {
  const zip = createBrotliCompress();
  await compressORdecompress(pathToFile, pathToZipFile, zip);
};

const decompress = async (pathToFile, pathToZipFile) => {
  const zip = createBrotliDecompress();
  await compressORdecompress(pathToFile, pathToZipFile, zip);
};

export { compress, decompress };