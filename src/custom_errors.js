const OPERATION_ERR_MSG = 'Operation failed';
const INPUT_ERR_MSG = 'Invalid input';

class OperationError extends Error {
  constructor(msg) {
    super(OPERATION_ERR_MSG + (msg ? `: ${msg}` : ''));
  }
}

class InputError extends Error {
  constructor(msg) {
    super(INPUT_ERR_MSG + (msg ? `: ${msg}` : ''));
  }
}

export {OperationError, InputError };