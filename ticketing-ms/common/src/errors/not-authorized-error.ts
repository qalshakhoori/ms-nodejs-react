import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  // This method is used to serialize the error for sending in the response
  // It returns an array of error objects with a message and an optional field
  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: 'Not authorized' }];
  }
}
