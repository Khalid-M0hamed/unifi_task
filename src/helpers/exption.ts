export class HttpException extends Error {
    status: number;
    customCode: string;
    constructor(exception: any, message?: string) {
      super(message || exception.message);
      this.customCode = exception.customCode;
      this.status = exception.status;
    }
  }
  
  export class ValidationError extends Error {
    status: number;
    customCode: string;
    constructor(errors: any) {
      let errorsMessages: string = "";
      errors = errors.array();
      for (var i = 0; i < errors.length; i++) {
        errorsMessages += errors[i].msg + "\\n";
      }
      super(errorsMessages);
      this.customCode = "VE400";
      this.status = 400;
    }
  }