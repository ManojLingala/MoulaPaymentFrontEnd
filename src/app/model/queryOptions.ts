import { HttpHeaders, HttpParams } from '@angular/common/http'

/*
  handler to pass custom headers
*/

// tslint:disable-next-line:interface-over-type-literal
export type QueryOptions = {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
};
