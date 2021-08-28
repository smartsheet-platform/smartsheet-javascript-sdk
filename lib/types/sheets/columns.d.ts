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

/**
 * Represents a column within a sheet or report.
 */
export interface Column {
  id: number;
  version: number;
  index: number;
  title: string;
  type:
    | "ABSTRACT_DATETIME"
    | "CHECKBOX"
    | "CONTACT_LIST"
    | "DATE"
    | "DATETIME"
    | "DURATION"
    | "MULTI_CONTACT_LIST"
    | "MULTI_PICKLIST"
    | "PICKLIST"
    | "PREDECESSOR"
    | "TEXT_NUMBER"
    | string;
  systemColumnType?:
    | "AUTO_NUMBER"
    | "CREATED_BY"
    | "CREATED_DATE"
    | "MODIFIED_BY"
    | "MODIFIED_DATE"
    | string;
  primary: boolean;
  validation: boolean;
  width: number;
  autoNumberFormat?: AutoNumberFormat;
  contactOptions?: ContactOption[];
  format?: string;
  formula?: string;
  hidden?: boolean;
  locked?: boolean;
  lockedForUser?: boolean;
  options?: string[];
  symbol?: string;
  tags?: string[];
}

export interface ContactOption {
  email: string;
  name: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AutoNumberFormat = any;
/* eslint-enable @typescript-eslint/no-explicit-any */
