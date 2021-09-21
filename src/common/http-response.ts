import { IError } from './error';

export class HttpResponse {
  private constructor(data: any, success: boolean, error: IError) {
    this.data = data;
    this.success = success;
    this.error = error;
  }

  data: any;
  success: boolean;
  error: IError;

  public static getSuccessResponse<T>(entity: T): HttpResponse {
    return new HttpResponse(entity, true, null);
  }

  public static getFailedResponse<T>(
    errorMessage: string,
    errorCode: number = 500,
  ): HttpResponse {
    const error = { errorMessage, errorCode };
    return new HttpResponse(null, false, error);
  }
}
