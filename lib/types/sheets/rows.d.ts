import { DefaultSDKFunction } from "../defaults";

export interface RowsResource {
  getRow: DefaultSDKFunction<GetRowOptions, GetRowResponse>;
  getRowAttachments: DefaultSDKFunction;
  getRowDiscussions: DefaultSDKFunction;
  getCellHistory: DefaultSDKFunction;
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

/* eslint-disable @typescript-eslint/no-explicit-any */
export type GetRowOptions = { sheetId: number; rowId: number } | any;
export type AddImageToCellOptions = any;
export type AddImageToCellResult = any;
export type UpdateRowOptions = any;
export type UpdateRowResponse = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

export type GetRowResponse = {
  id: number;
  sheetId: number;
  rowNumber: number;
  expanded: boolean;
  cells: CellObject[];
  createdAt: string;
  modifiedAt: string;
};

export interface CellObject {
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
