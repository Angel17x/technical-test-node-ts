export class CustomError extends Error {
  statusCode: number;
  timeStamp: Date;

  constructor(message: string, statusCode: number, timeStamp: Date) {
    super(message);
    this.statusCode = statusCode;
    this.timeStamp = timeStamp;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
