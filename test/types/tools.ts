import * as sinon from "sinon";
import smartsheet, { SmartsheetClient, HttpRequestor } from "../..";
const requestorFactory: any = require("../../lib/utils/httpRequestor.js");

/**
 * Creates a `requestor` that is stubbed so methods can be provided to the client. 
 * Use the returned stub like so:
 * ```
 * import smartsheet from "../..";
  const client = smartsheet.createClient({
    accessToken: "1234",
    requestor: requestorStub,
  });
  ```
 */
export function createRequestorStub(): HttpRequestor {
  const requestor = requestorFactory.create({}) as HttpRequestor;
  return sinon.stub(requestor);
}

/**
 * Creates a smartsheetclient with its underlyign requestor stubbed
 */
export function createClientStub(): SmartsheetClient {
  return smartsheet.createClient({
    accessToken: "1234",
    requestor: createRequestorStub(),
  });
}
