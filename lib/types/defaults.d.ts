/* eslint-disable @typescript-eslint/no-explicit-any */
export type DefaultOptions = any;

/**
 * The default callback signature used throughout the SDK.
 */
export type DefaultSDKCallback<TResponse> = (
  error: any,
  data?: TResponse
) => void;
/**
 * Default essentially untyped function overload in the SDK when caller uses callbacks.
 */
export type DefaultSDKFunctionWithCallback<
  TOptions = DefaultOptions,
  TResponse = any[]
> = (options: TOptions, callback: DefaultSDKCallback<TResponse>) => void;
/**
 * Default essentially untyped function overload in the SDK when caller uses promises (by not passing a callback).
 */
export type DefaultSDKFunctionWithPromise<
  TOptions = DefaultOptions,
  TResponse = any
> = (options: TOptions) => Promise<TResponse>;

/**
 * Default essentially untyped function overload used in the SDK.
 * Each endpoint takes two arguments: a set of options, and an optional callback function.
 * If the callback is not specified, the SDK will return a promise instead.
 */
export interface DefaultSDKFunction<
  TOptions = DefaultOptions,
  TResponse = any
> {
  (options: TOptions, callback: DefaultSDKCallback<TResponse>): void;
  (options: TOptions): Promise<TResponse>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
