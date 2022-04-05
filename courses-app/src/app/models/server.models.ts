export interface Response<T> {
    successful: boolean;
    result: T;
  }
  
export interface FailedResponse {
    successful: false;
    message?: string;
    errors?: string[];
  }