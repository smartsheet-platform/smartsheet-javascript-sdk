import { DefaultSDKFunction } from "../defaults";

export interface SheetResource {
  getSheet: DefaultSDKFunction;
  listSheets: DefaultSDKFunction;
  getSheetAsCSV: DefaultSDKFunction;
  getSheetAsExcel: DefaultSDKFunction;
  getSheetAsPDF: DefaultSDKFunction;
  getSheetVersion: DefaultSDKFunction;
  listOrganizationSheets: DefaultSDKFunction;
}
