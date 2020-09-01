import { DefaultSDKFunction } from "../defaults";

export interface CommentsResource {
  getComment: DefaultSDKFunction;
  deleteComment: DefaultSDKFunction;
  addCommentUrlAttachment: DefaultSDKFunction;
  addCommentAttachment: DefaultSDKFunction;
  addCommentFileAttachment: DefaultSDKFunction;
  editComment: DefaultSDKFunction;
}
