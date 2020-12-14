export const sdks = [
  {
    error: {
      type: 'error type',
      value: 'error value',
      stacktrace: [
        {
          filename:
            '/Users/MoonHyeRa/Desktop/boostcamp2020/membership/Project11-A-Web-FE-Performance-Monitoring-SDK/examples/node_modules/express/lib/router/layer.js',
          function: 'Layer.handle [as handle_request]',
          lineno: 95,
          colno: 5,
        },
        {
          filename:
            '/Users/MoonHyeRa/Desktop/boostcamp2020/membership/Project11-A-Web-FE-Performance-Monitoring-SDK/examples/express.example.js',
          function: 'mainHandler',
          lineno: 21,
          colno: 9,
        },
        {
          filename:
            '/Users/MoonHyeRa/Desktop/boostcamp2020/membership/Project11-A-Web-FE-Performance-Monitoring-SDK/examples/node_modules/express/lib/router/route.js',
          function: 'next',
          lineno: 137,
          colno: 13,
        },
      ],
    },
    errorContexts: [
      ['hi', 'hello'],
      ['bye', 'goodBye'],
    ],
    release: 'string',
    environment: 'string',
    createdBy: {
      ipAddress: '1.1.1.1',
    },
    url: 'http://server.com',
    os: {
      version: '10.4',
      name: 'MacOS',
    },
    browser: {
      version: '78.02.1',
      name: 'Chrome',
    },
    sdk: {
      version: '0.0.23',
      name: '@santry/node',
    },
    serverName: '(Express만) munhyelaui-MacBook.local',
    transaction: '(Express만) GET /debug-sentry',
    userIp: '(Express만) 1.1.1.1',
    level: 'info',
    contexts: {
      mes: {
        메세지: 'message',
      },
      not: {
        알림: 'alarm',
      },
    },
  },
  {
    stacktrace: [],
    errorContexts: [],
    serverName: 'testserver',
    contexts: {
      myInfo: {
        name: 'Hera',
        age: 26,
      },
    },
    level: 'fatal',
    timeStamp: '2020-12-10T13:24:10.673Z',
    platform: 'node',
    sdk: {
      name: '@santry/node',
      version: '1.2.5',
    },
    message: "helllo I'm Hera",
    environment: 'production',
    release: 'santry@0.0.1',
  },
];
