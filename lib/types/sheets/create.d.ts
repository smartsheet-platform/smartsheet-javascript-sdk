import { DefaultSDKFunction } from "../defaults";

export interface CreateSheetsResource {
  createSheet: DefaultSDKFunction;
  createSheetFromExisting: DefaultSDKFunction;
  createSheetInFolder: DefaultSDKFunction;
  createSheetInWorkspace: DefaultSDKFunction;
  copySheet: DefaultSDKFunction;
  importCsvSheet: DefaultSDKFunction;
  importXlsxSheet: DefaultSDKFunction;
  importCsvSheetIntoFolder: DefaultSDKFunction;
  importXlsxSheetIntoFolder: DefaultSDKFunction;
  importCsvSheetIntoWorkspace: DefaultSDKFunction;
  importXlsxSheetIntoWorkspace: DefaultSDKFunction;
}
