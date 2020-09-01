import { DefaultSDKFunction } from "../defaults";

export interface AttachmentsResource {
  getAttachment: DefaultSDKFunction;
  listAttachments: DefaultSDKFunction;
  listAttachmentVersions: DefaultSDKFunction;
  addAttachment: DefaultSDKFunction;
  addUrlAttachment: DefaultSDKFunction;
  addFileAttachment: DefaultSDKFunction;
  attachNewVersion: DefaultSDKFunction;
  deleteAttachment: DefaultSDKFunction;
  deleteAllAttachmentVersions: DefaultSDKFunction;
}
