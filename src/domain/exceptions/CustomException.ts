export class CustomError extends Error {
  statusCode: number;
  timeStamp: Date;
  error?: any[] = [];

  constructor(
    message: string,
    statusCode: number,
    timeStamp: Date,
    error?: any[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.timeStamp = timeStamp;
    this.error = error || [];
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  toString(): string {
    return `${this.statusCode} - ${this.message} - ${this.timeStamp}`;
  }
}
