export interface InputOption {
  release?: string;
  environment?: string;
  sdk?: string;
  os?: string;
  browser?: string;
  url?: string;
  message?: string;
  version?: string;
  serverName?: string;
  transaction?: string;
  userIp?: string;
  level?: string;
}

export interface SearchOption {
  release?: string;
  environment?: string;
  'sdk.name'?: string;
  'sdk.version'?: string;
  'os.name'?: string;
  'os.version'?: string;
  'browser.name'?: string;
  'browser.version'?: string;
  url?: string;
  message?: string;
  version?: string;
  serverName?: string;
  transaction?: string;
  userIp?: string;
  level?: string;
}
