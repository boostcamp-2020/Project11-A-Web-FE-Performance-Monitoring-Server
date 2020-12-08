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
  sdk?: {
    name: string;
    version?: string;
  };
  os?: {
    name: string;
    version?: string;
  };
  browser?: {
    name: string;
    version?: string;
  };
  url?: string;
  message?: string;
  version?: string;
  serverName?: string;
  transaction?: string;
  userIp?: string;
  level?: string;
}
