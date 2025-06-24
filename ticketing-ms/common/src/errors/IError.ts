interface IErrorHandler extends Error {
  statusCode?: number;
  serializeErrors(): { message: string; field?: string }[] | undefined;
}

export default IErrorHandler;
