#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { stringify } from 'qs';
import WebClient from './WebClient.js';

const server = new McpServer({
  name: '@hackle-io/hackle-mcp',
  version: '1.2.0',
});

// Experiment List Tool
server.tool(
  'experiment-list',
  'Fetches a paginated list of A/B test experiments with search functionality.',
  {
    pageNumber: z.number().optional().default(1),
    pageSize: z.number().optional().default(100),
    searchKeyword: z.string().optional().describe('name, description, or experimentKey of an experiment.'),
  },
  async ({ pageNumber = 1, pageSize = 100, searchKeyword = '' }) => {
    const qs = stringify(
      {
        pageNumber,
        pageSize,
        searchKeyword,
      },
      { addQueryPrefix: true },
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/experiments${qs}`)),
        },
      ],
    };
  },
);

// Experiment Detail Tool
server.tool(
  'experiment-detail',
  'Retrieves detailed information for a specific A/B test experiment.',
  {
    experimentId: z.number(),
  },
  async ({ experimentId }) => {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/experiments/${experimentId}`)),
        },
      ],
    };
  },
);

// In-App Message List Tool
server.tool(
  'in-app-message-list',
  'Fetches a paginated list of in-app messages with search functionality.',
  {
    pageNumber: z.number().optional().default(1),
    pageSize: z.number().optional().default(100),
    searchKeyword: z.string().optional().describe('name, description, or campaignKey of an in-app message.'),
  },
  async ({ pageNumber = 1, pageSize = 100, searchKeyword = '' }) => {
    const qs = stringify(
      {
        pageNumber,
        pageSize,
        searchKeyword,
      },
      { addQueryPrefix: true },
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/in-app-messages${qs}`)),
        },
      ],
    };
  },
);

// In-App Message Detail Tool
server.tool(
  'in-app-message-detail',
  'Retrieves detailed information for a specific in-app message.',
  {
    inAppMessageId: z.number(),
  },
  async ({ inAppMessageId }) => {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/in-app-messages/${inAppMessageId}`)),
        },
      ],
    };
  },
);

// Push Message List Tool
server.tool(
  'push-message-list',
  'Fetches a paginated list of push messages with search functionality.',
  {
    pageNumber: z.number().optional().default(1),
    pageSize: z.number().optional().default(100),
    searchKeyword: z.string().optional().describe('name, description, or campaignKey of a push message.'),
  },
  async ({ pageNumber = 1, pageSize = 100, searchKeyword = '' }) => {
    const qs = stringify(
      {
        pageNumber,
        pageSize,
        searchKeyword,
      },
      { addQueryPrefix: true },
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/push-messages${qs}`)),
        },
      ],
    };
  },
);

// Push Message Detail Tool
server.tool(
  'push-message-detail',
  'Retrieves detailed information for a specific push message.',
  {
    pushMessageId: z.number(),
  },
  async ({ pushMessageId }) => {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/push-messages/${pushMessageId}`)),
        },
      ],
    };
  },
);

// Active User Series Tool
server.tool(
  'active-user-series',
  'Retrieves time-series data of active users. Available in daily, weekly, and monthly units.',
  {
    unit: z.enum(['DAY', 'WEEK', 'MONTH']),
    date: z.string().optional().describe('End date in YYYY-MM-DD format.'),
  },
  async ({ unit = 'DAY', date = '' }) => {
    const qs = stringify({ unit, date }, { addQueryPrefix: true });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/workspaces/auto-metrics/active-user-series${qs}`)),
        },
      ],
    };
  },
);

// Retention Series Tool
server.tool(
  'retention-series',
  'Retrieves time-series data of user retention. Available in daily, weekly, and monthly units.',
  {
    unit: z.enum(['DAY', 'WEEK', 'MONTH']),
    date: z.string().optional().describe('End date in YYYY-MM-DD format.'),
  },
  async ({ unit = 'DAY', date = '' }) => {
    const qs = stringify({ unit, date }, { addQueryPrefix: true });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/workspaces/auto-metrics/retention-series${qs}`)),
        },
      ],
    };
  },
);

// Stickiness Series Tool
server.tool(
  'stickiness-series',
  'Retrieves time-series data of user stickiness (return visit frequency). Available in weekly and monthly units.',
  {
    unit: z.enum(['WEEK', 'MONTH']),
    date: z.string().optional().describe('End date in YYYY-MM-DD format.'),
  },
  async ({ unit = 'WEEK', date = '' }) => {
    const qs = stringify({ unit, date }, { addQueryPrefix: true });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/workspaces/auto-metrics/stickiness-series${qs}`)),
        },
      ],
    };
  },
);

// Data report list tool
server.tool('data-report-list', 'fetch data report list.', {}, async () => {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(await WebClient.get(`/api/v1/data-reports`)),
      },
    ],
  };
});

// Data report detail tool
server.tool(
  'data-report-detail',
  'fetch data report detail.',
  {
    dataReportId: z.number().positive(),
  },
  async ({ dataReportId }) => {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/data-reports/${dataReportId}`)),
        },
      ],
    };
  },
);

// chart list tool
server.tool(
  'analytics-chart-list',
  'fetch data analytics chart list.',
  {
    pageNumber: z.number().optional().default(1),
    pageSize: z.number().optional().default(100),
    searchKeyword: z.string().optional(),
    chartType: z.enum(['FUNNEL', 'DATA_INSIGHT', 'RETENTION', 'USER_PATH']).optional(),
  },
  async ({ pageNumber = 1, pageSize = 100, searchKeyword = '', chartType }) => {
    const qs = stringify(
      {
        pageNumber,
        pageSize,
        searchKeyword,
        chartType,
      },
      { addQueryPrefix: true },
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/analytics/charts${qs}`)),
        },
      ],
    };
  },
);

// Chart detail tool
server.tool(
  'analytics-chart-detail',
  "fetch analytics chart detail. You can visualize the chart using this tool's result.",
  {
    chartId: z.number().positive().describe('Chart id'),
    chartType: z
      .enum(['FUNNEL', 'DATA_INSIGHT', 'RETENTION', 'USER_PATH'])
      .describe("Type of the chart. Will throw an error if given chartId's chart type is different from chartType."),
  },
  async ({ chartId, chartType }) => {
    const qs = stringify({ chartType }, { addQueryPrefix: true });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/analytics/charts/${chartId}${qs}`)),
        },
      ],
    };
  },
);

// Remote Config List Tool
server.tool(
  'remote-config-list',
  'Fetch Remote Config list.',
  {
    pageNumber: z.number().optional().default(1),
    pageSize: z.number().optional().default(100),
    searchKeyword: z.string().optional(),
    status: z.enum(['ACTIVE', 'ARCHIVED']).optional().default('ACTIVE'),
  },
  async ({ pageNumber = 1, pageSize = 100, searchKeyword = '', status = 'ACTIVE' }) => {
    const qs = stringify(
      {
        pageNumber,
        pageSize,
        searchKeyword,
        status,
      },
      { addQueryPrefix: true },
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/remote-configs${qs}`)),
        },
      ],
    };
  },
);

// Remote Config Detail Tool
server.tool(
  'remote-config-detail',
  'Fetch remote config detail.',
  {
    remoteConfigId: z
      .number()
      .positive()
      .describe("Remote config's id. You can get this information by using Remote Config List Tool."),
  },
  async ({ remoteConfigId }) => {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/remote-configs/${remoteConfigId}`)),
        },
      ],
    };
  },
);

// Remote Config Creation Tool
server.tool(
  'remote-config-create',
  'Creates an empty remote config. It is recommended to update an existing RC first if there is an associated RC with the one you want to create since the total number of RC is limited.',
  {
    body: z.object({
      key: z.string().nonempty().describe("Remote config's name."),
      description: z.string().optional(),
      dataType: z.enum(['STRING', 'JSON', 'NUMBER', 'BOOLEAN']).describe("Type of Remote Config's value."),
      userIdentifierCriteria: z
        .string()
        .optional()
        .default('$deviceId')
        .describe(
          'User identifier criteria for targeting. You can use criteria provided by Hackle($deviceId, $userId) or your own criteria created at Hackle dashboard website.',
        ),
    }),
  },
  async ({ body }) => {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.post(`/api/v1/remote-configs`, body)),
        },
      ],
    };
  },
);

// Remote Config Content Update Tool
server.tool(
  'remote-config-update',
  "Updates remote config's content.",
  {
    remoteConfigId: z.number().positive().describe("Remote config's id."),
    body: z.object({
      dataType: z
        .enum(['STRING', 'JSON', 'NUMBER', 'BOOLEAN'])
        .describe(
          "Type of Remote Config's value. You must provide remote config's value type to match with this field.",
        ),
      remoteConfigDefaultValue: z.union([z.string(), z.number(), z.boolean()]),
      conditionalValues: z
        .array(
          z.object({
            ruleName: z.string(),
            remoteConfigValue: z.union([z.string(), z.number(), z.boolean()]),
            target: z
              .object({
                conditions: z
                  .array(
                    z.object({
                      key: z.object({
                        type: z
                          .enum(['HACKLE_PROPERTY', 'USER_PROPERTY', 'SEGMENT', 'AB_TEST', 'FEATURE_FLAG', 'COHORT'])
                          .describe("Condition's type."),
                        name: z
                          .string()
                          .describe(
                            "Property's name if type is HACKLE_PROPERTY or USER_PROPERTY. Experiment key if type is AB_TEST. Feature flag key if type is FEATURE_FLAG. You can put any non-empty string if type is COHORT or SEGMENT.",
                          ),
                      }),
                      match: z.object({
                        operator: z.enum([
                          'IS_ONE_OF',
                          'IS_NOT_ONE_OF',
                          'IS_STARTS_WITH',
                          'IS_NOT_STARTS_WITH',
                          'IS_ENDS_WITH',
                          'IS_NOT_ENDS_WITH',
                          'IS_CONTAINS',
                          'IS_NOT_CONTAINS',
                          'EQ',
                          'NOT_EQ',
                          'GT',
                          'GTE',
                          'LT',
                          'LTE',
                          'IS_TRUE',
                          'IS_FALSE',
                          'VERSION_EQ',
                          'VERSION_NOT_EQ',
                          'VERSION_GT',
                          'VERSION_GTE',
                          'VERSION_LT',
                          'VERSION_LTE',
                        ]),
                        valueType: z.enum(['NUMBER', 'STRING', 'BOOLEAN', 'VERSION']),
                        values: z
                          .array(z.union([z.string(), z.number(), z.boolean()]))
                          .describe(
                            "Values of targeting condition's key. Followings are some special cases: The values will be treated as names if you are using SEGMENT. Only strings 'A' and 'B' are allowed if type is AB_TEST. Only boolean values are accepted if type is FEATURE_FLAG. You should put cohort's id if type is COHORT.",
                          ),
                      }),
                    }),
                  )
                  .describe(
                    "Users who The user he satisfies all conditions in this array will see this rule's remote config value.",
                  ),
              })
              .describe('Targeting rule.'),
          }),
        )
        .describe('The earlier a condition is placed in the array, the earlier it is applied.'),
    }),
  },
  async ({ remoteConfigId, body }) => {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.put(`/api/v1/remote-configs/${remoteConfigId}/parameters`, body)),
        },
      ],
    };
  },
);

// Remote Config User Identifier Criteria Update Tool
server.tool(
  'remote-config-update-user-identifier-criteria',
  "Updates remote config's user identifier criteria. The change will be applied to both production and development environment.",
  {
    remoteConfigId: z.number().positive().describe("Remote config's id."),
    body: z.object({
      userIdentifierCriteria: z
        .string()
        .describe(
          'User identifier criteria for targeting. You can use criteria provided by Hackle($deviceId, $userId) or your own criteria created at Hackle dashboard website.',
        ),
    }),
  },
  async ({ body, remoteConfigId }) => {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.patch(`/api/v1/remote-configs/${remoteConfigId}/identifierType`, body)),
        },
      ],
    };
  },
);

// Remote Config Description Update Tool
server.tool(
  'remote-config-update-description',
  "Updates remote config's description. The change will be applied to both production and development environment.",
  {
    remoteConfigId: z.number().positive().describe("Remote config's id."),
    body: z.object({
      description: z.string(),
    }),
  },
  async ({ body, remoteConfigId }) => {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.patch(`/api/v1/remote-configs/${remoteConfigId}/description`, body)),
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
