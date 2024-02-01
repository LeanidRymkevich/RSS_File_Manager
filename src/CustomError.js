import { ERROR_MSG } from './constants.js';

export default class CustomError extends Error {
  constructor(msg) {
    super(ERROR_MSG + (msg ? `: ${msg}.` : ''));
  }
}