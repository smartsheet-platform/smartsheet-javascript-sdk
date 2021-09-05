import { DefaultSDKFunction } from "../defaults";
import { DateString } from "../date";
import { Column } from "./columns";
import { RowData } from "./rows";
import { PageOptions } from "../pagination";

export interface SheetResource {
  getSheet: DefaultSDKFunction<GetSheetOptions, SheetData>;
  listSheets: DefaultSDKFunction;
  getSheetAsCSV: DefaultSDKFunction;
  getSheetAsExcel: DefaultSDKFunction;
  getSheetAsPDF: DefaultSDKFunction;
  getSheetVersion: DefaultSDKFunction;
  listOrganizationSheets: DefaultSDKFunction;
}

export type GetSheetOptions = {
  id: number;
  queryParameters?: PageOptions & {
    include?: string;
    exclude?: string;
    columnIds?: string;
    filterId?: number;
    ifVersionAfter?: number;
    level?: number;
    /** a comma-separated list of row Ids on which to filter the rows included in the result */
    rowIds?: string;
    /** a comma-separated list of row numbers on which to filter the rows included in the result. Non-existent row numbers are ignored. */
    rowNumbers?: string;
    /** filter to return only rows that have been modified since the date/time provided. Date should be in ISO-8601 format, for example, rowsModifiedSince=2020-01-30T13:25:32-07:00. */
    rowsModifiedSince?: string;
  }
};

/**
 * Represents the sheet data returned from `GET /sheets/{sheetId}`
 * References:
 * - https://smartsheet-platform.github.io/api-docs/#objects-23
 */
export interface SheetData {
  id: number;
  name: string;
  version: number;
  totalRowCount: number;
  accessLevel:
    | "ADMIN"
    | "EDITOR"
    | "EDITOR_SHARE"
    | "OWNER"
    | "VIEWER"
    | string;
  effectiveAttachmentOptions: string[];
  ganttEnabled: boolean;
  dependenciesEnabled: boolean;
  resourceManagementEnabled: boolean;
  cellImageUploadEnabled: boolean;
  favorite: boolean;
  userSettings: {
    criticalPathEnabled: boolean;
    displaySummaryTasks: boolean;
    appliedSheetFilterId: number;
  };
  userPermissions: {
    summaryPermissions: "ADMIN" | "READ_DELETE" | "READ_ONLY" | "READ_WRITE";
  };
  workspace: { id: number; name: string };
  hasSummaryFields: boolean;
  permalink: string;
  createdAt: DateString;
  modifiedAt: DateString;
  isMultiPicklistEnabled: boolean;
  columns: Column[];
  filters?: Filter[];
  rows: RowData[];
}

export interface Filter {
  name: string;
  id: number;
  filterType: "PERSONAL" | "SHARED";
  excludeSelected?: boolean;
  query: {
    operator: FilterOperator;
    criteria: FilterCriteria[];
    includeParent: boolean;
  };
}

interface FilterCriteria {
  operator: FilterOperator;
  values: string[];
  columnId: number;
}

type FilterOperator =
  | "BETWEEN"
  | "CONTAINS"
  | "EQUAL"
  | "NOT_EQUAL"
  | "FUTURE"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "HAS_ANY_OF"
  | "HAS_NONE_OF"
  | "HAS_ALL_OF"
  | "IS_BLANK"
  | "IS_NOT_BLANK"
  | "IS_CHECKED"
  | "IS_NOT_CHECKED"
  | "IS_DATE"
  | "IS_NOT_DATE"
  | "IS_NUMBER"
  | "IS_NOT_NUMBER"
  | "LAST_N_DAYS"
  | "NEXT_N_DAYS"
  | "MULTI_IS_EQUAL"
  | "MULTI_IS_NOT_EQUAL"
  | "NOT_ALL_OF"
  | "PAST"
  | "TODAY"
  | "AND";
