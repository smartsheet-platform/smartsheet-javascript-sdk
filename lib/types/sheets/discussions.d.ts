import { DefaultSDKFunction } from "../defaults";

export interface DiscussionsResource {
  getDiscussions: DefaultSDKFunction;
  getDiscussion: DefaultSDKFunction;
  listDiscussionAttachments: DefaultSDKFunction;
  createDiscussion: DefaultSDKFunction;
  addDiscussionComment: DefaultSDKFunction;
  deleteDiscussion: DefaultSDKFunction;
}
