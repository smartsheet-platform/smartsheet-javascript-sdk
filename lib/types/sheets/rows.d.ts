import { DateString } from "../date";
import { DefaultSDKFunction } from "../defaults";
import { Column } from "./columns";
import { PagedResponse, PageOptions } from "../pagination";

export interface RowsResource {
  getRow: DefaultSDKFunction<GetRowOptions, GetRowResponse>;
  getRowAttachments: DefaultSDKFunction;
  getRowDiscussions: DefaultSDKFunction;
  getCellHistory: DefaultSDKFunction<
    GetCellHistoryOptions,
    GetCellHistoryResponse
  >;
  copyRowToAnotherSheet: DefaultSDKFunction;
  moveRowToAnotherSheet: DefaultSDKFunction;
  addRow: DefaultSDKFunction;
  addRows: DefaultSDKFunction;
  addRowUrlAttachment: DefaultSDKFunction;
  addRowAttachment: DefaultSDKFunction;
  addRowFileAttachment: DefaultSDKFunction;
  createRowDiscussion: DefaultSDKFunction;
  sendRows: DefaultSDKFunction;
  deleteRow: DefaultSDKFunction;
  deleteRows: DefaultSDKFunction;
  updateRow: DefaultSDKFunction<UpdateRowOptions, UpdateRowResponse>;
  addImageToCell: DefaultSDKFunction<
    AddImageToCellOptions,
    AddImageToCellResult
  >;
}

export interface GetRowOptions {
  sheetId: number;
  rowId: number;
  include?: string;
  level?: number;
}

export type GetCellHistoryOptions = GetRowOptions &
  PageOptions & {
    columnId: number;
  };

export type GetCellHistoryResponse = PagedResponse & {
  data: CellHistoryCellData[];
};

export interface CellHistoryCellData extends CellData {
  modifiedAt: DateString;
  modifiedBy: RowUser;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AddImageToCellOptions = any;
export type AddImageToCellResult = any;
export type UpdateRowOptions = any;
export type UpdateRowResponse = any;
export type RowAttachment = any;
export type RowDiscussion = any;
export type RowUser = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

// GET /sheets/{sheetId}/rows/{rowId} returns sheetId too
export type GetRowResponse = RowData & { sheetId: number };

export interface RowData {
  id: number;
  version: number;
  rowNumber: number;
  expanded: boolean;
  cells: CellData[];
  createdAt: DateString;
  modifiedAt: DateString;
  attachments?: RowAttachment[];
  columns?: Column;
  conditionalFormat?: string;
  discussions?: RowDiscussion[];
  filteredOut?: boolean;
  format?: string;
  inCriticalPath?: boolean;
  locked?: boolean;
  lockedForUser?: boolean;
  modifiedBy?: RowUser;
  permalink?: string;
}

export interface CellData {
  columnType: ColumnType;
  value: string;
  displayValue: string;
  columnId: number;
}

export type ColumnType =
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
  | "TEXT_NUMBER";
