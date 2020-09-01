import {
  SmartsheetClient,
  ClientOptions,
  ClientLoggerOptions,
} from "./lib/types/client";
export { SmartsheetClient } from "./lib/types/client";
import { NPMLoggingLevel } from "winston";
import * as _ from "underscore";
import * as winston from "winston";
import apiUrls from "./lib/utils/apis";

// Possible TODO: Namespace parameters for different subcomponents
// E.g. clientOptions.requestor.instance OR
//      clientOptions.requestor.settings
//          w/ sub-paths maxRetryDurationSeconds and calcRetryBackoff

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildRequestor(clientOptions: any): any {
  if (clientOptions.requestor) return clientOptions.requestor;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestorConfig: any = _.pick(
    clientOptions,
    "maxRetryDurationSeconds",
    "calcRetryBackoff"
  );

  if (requestorConfig.maxRetryDurationSeconds) {
    const SECONDS = 1000;
    requestorConfig.maxRetryDurationMillis =
      requestorConfig.maxRetryDurationSeconds * SECONDS;
  }

  requestorConfig.logger = buildLogger(clientOptions);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require("./lib/utils/httpRequestor.js").create(requestorConfig);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildLogger(clientOptions: ClientLoggerOptions): any {
  if (hasMultipleLogOptions(clientOptions)) {
    throw new Error(
      "Smartsheet client options may specify at most one of " +
        "'logger', 'loggerContainer', and 'logLevel'."
    );
  }

  if (clientOptions.logger) return clientOptions.logger;

  if (clientOptions.logLevel)
    return buildLoggerFromLevel(clientOptions.logLevel);

  if (clientOptions.loggerContainer)
    return buildLoggerFromContainer(clientOptions.loggerContainer);

  return null;
}

function hasMultipleLogOptions(clientOptions: ClientLoggerOptions): boolean {
  return (
    (clientOptions.logger && clientOptions.loggerContainer) ||
    (clientOptions.logger && clientOptions.logLevel) ||
    (clientOptions.loggerContainer && clientOptions.logLevel)
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildLoggerFromLevel(logLevel: NPMLoggingLevel | string): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((winston as any).levels[logLevel] == null) {
    throw new Error(
      "Smartsheet client received configuration with invalid log level " +
        `'${logLevel}'. Use one of the standard Winston log levels.`
    );
  }

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: logLevel,
        showLevel: false,
        label: "Smartsheet",
      }),
    ],
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildLoggerFromContainer(container: any): any {
  if (container.has("smartsheet")) return container.get("smartsheet");
  else
    throw new Error(
      "Smartsheet client received a logger container, but could not find a logger named " +
        "'smartsheet' inside."
    );
}

export const createClient = function (
  clientOptions: ClientOptions
): SmartsheetClient {
  const requestor = buildRequestor(clientOptions);

  const options = {
    apiUrls: apiUrls,
    requestor: requestor,
    clientOptions: {
      accessToken:
        clientOptions.accessToken || process.env.SMARTSHEET_ACCESS_TOKEN,
      userAgent: clientOptions.userAgent,
      baseUrl: clientOptions.baseUrl,
    },
  };

  return {
    /* eslint-disable @typescript-eslint/no-var-requires */
    constants: require("./lib/utils/constants.js"),
    contacts: require("./lib/contacts/").create(options),
    events: require("./lib/events/").create(options),
    favorites: require("./lib/favorites/").create(options),
    folders: require("./lib/folders/").create(options),
    groups: require("./lib/groups/").create(options),
    home: require("./lib/home/").create(options),
    images: require("./lib/images/").create(options),
    reports: require("./lib/reports/").create(options),
    request: require("./lib/request/").create(options),
    search: require("./lib/search/").create(options),
    server: require("./lib/server/").create(options),
    sheets: require("./lib/sheets/").create(options),
    sights: require("./lib/sights/").create(options),
    templates: require("./lib/templates/").create(options),
    tokens: require("./lib/tokens/").create(options),
    users: require("./lib/users/").create(options),
    webhooks: require("./lib/webhooks/").create(options),
    workspaces: require("./lib/workspaces/").create(options),
    /* eslint-enable @typescript-eslint/no-var-requires */
  };
};

export const smartSheetURIs = {
  defaultBaseURI: "https://api.smartsheet.com/2.0/",
  govBaseURI: "https://api.smartsheetgov.com/2.0/",
};

// the default type that allows compatibility with imports like `import smartsheet from "smartsheet"`
const def = {
  createClient,
  smartSheetURIs,
};
export default def;
