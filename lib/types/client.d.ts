import { SheetsResource } from "./sheets/sheets";
import { NPMLoggingLevel } from "winston";

export interface SmartsheetClient {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  constants: any;
  contacts: any;
  events: any;
  favorites: any;
  folders: any;
  groups: any;
  home: any;
  images: any;
  reports: any;
  request: any;
  search: any;
  server: any;
  sheets: SheetsResource;
  sights: any;
  templates: any;
  tokens: any;
  users: any;
  webhooks: any;
  workspaces: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export interface ClientOptions extends ClientLoggerOptions {
  accessToken?: string;
  baseUrl?: string;
  userAgent?: string;
}

export interface ClientLoggerOptions {
  logLevel?: NPMLoggingLevel | string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  logger?: any;
  loggerContainer?: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
