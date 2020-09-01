import { DefaultSDKFunction } from "../defaults";

export interface ColumnsResource {
  getColumns: DefaultSDKFunction<GetColumnsOptions, GetColumnsResponse>;
  getColumn: DefaultSDKFunction;
  addColumn: DefaultSDKFunction;
  deleteColumn: DefaultSDKFunction;
  updateColumn: DefaultSDKFunction;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type GetColumnsOptions = any;
export type GetColumnsResponse = any;
/* eslint-enable @typescript-eslint/no-explicit-any */
