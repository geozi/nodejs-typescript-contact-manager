export class UniqueConstraintError extends Error {
  public static httpCode = 409;

  constructor(message: string) {
    super(message);
    this.name = "UniqueConstraintError";
    this.message = message;
  }
}
