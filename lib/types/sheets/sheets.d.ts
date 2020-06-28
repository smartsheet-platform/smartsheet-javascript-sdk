import { DefaultSDKFunction } from "../defaults";
import { AttachmentsResource } from "./attachments";
import { AutomationRulesResource } from "./automationRules";
import { ColumnsResource } from "./columns";
import { CommentsResource } from "./comments";
import { CreateSheetsResource } from "./create";
import { CrossSheetReferencesResource } from "./crossSheetReferences";
import { DiscussionsResource } from "./discussions";
import { SheetResource } from "./get";
import { SummariesResource } from "./sheetSummaries";
import { RowsResource } from "./rows";
import { SentUpdateRequestsResource } from "./sendUpdateRequests";
import { SharesResource } from "../share/share";
import { UpdateRequestsResource } from "./updateRequests";

export interface SheetsResource
  extends AttachmentsResource,
    AutomationRulesResource,
    ColumnsResource,
    CommentsResource,
    CreateSheetsResource,
    CrossSheetReferencesResource,
    DiscussionsResource,
    SheetResource,
    SummariesResource,
    RowsResource,
    SentUpdateRequestsResource,
    SharesResource,
    UpdateRequestsResource {
  sendSheetViaEmail: DefaultSDKFunction;
  getPublishStatus: DefaultSDKFunction;
  setPublishStatus: DefaultSDKFunction;
  sortRowsInSheet: DefaultSDKFunction;
}
