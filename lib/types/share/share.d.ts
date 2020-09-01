import { DefaultSDKFunction } from "../defaults";

export interface SharesResource {
  getShare: DefaultSDKFunction;
  listShares: DefaultSDKFunction;
  share: DefaultSDKFunction;
  deleteShare: DefaultSDKFunction;
  updateShare: DefaultSDKFunction;
}
