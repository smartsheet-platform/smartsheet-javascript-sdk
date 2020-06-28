import { DefaultSDKFunction } from "../defaults";

export interface SummariesResource {
  getSummary: DefaultSDKFunction;
  getSummaryFields: DefaultSDKFunction;
  addSummaryFields: DefaultSDKFunction;
  deleteSummaryFields: DefaultSDKFunction;
  updateSummaryFields: DefaultSDKFunction;
  addSummaryFieldImage: DefaultSDKFunction;
}
