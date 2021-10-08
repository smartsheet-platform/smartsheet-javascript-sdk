import { IncomingMessage } from "http";
import { DefaultSDKFunction } from "../defaults";

export interface HttpRequestor {
  get: DefaultSDKFunction<RequestorRequestOptions, RequestorResponse>;
  put: DefaultSDKFunction<RequestorRequestOptions, RequestorResponse>;
  post: DefaultSDKFunction<RequestorRequestOptions, RequestorResponse>;
  postFile: DefaultSDKFunction<RequestorRequestOptions, RequestorResponse>;
  delete: DefaultSDKFunction<RequestorRequestOptions, RequestorResponse>;
}

export interface RequestorRequestOptions {
  // buildUrl:
  baseUrl?: string;
  id?: number | string;
  // buildHeaders:
  accept?: string;
  contentType?: string;
  accessToken?: string;
  assumeUser?: string;
  fileName?: string;
  contentDisposition?: string;
  path?: string;
  fileSize?: string;
  changeAgent?: string;
  customProperties?: string;
  // makeRequest:
  // note: queryParmeters could be tighter but this is how request defines qs which they are eventually mapped to anyway: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/request/
  queryParameters: any;
  encoding?: string | null | undefined;
  // retryOptions:
  maxRetryDurationMillis?: number;
  calcRetryBackoff?: (numRetries: number, errorReason: any) => number;
}

export type RequestorResponse = any;
