#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import WebClient from './WebClient.js';

const server = new McpServer({
  name: '@hackle-io/hackle-mcp',
  version: '1.0.3',
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
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            await WebClient.get(
              `/api/v1/experiments?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}`,
            ),
          ),
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
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            await WebClient.get(
              `/api/v1/in-app-messages?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}`,
            ),
          ),
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
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            await WebClient.get(
              `/api/v1/push-messages?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}`,
            ),
          ),
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
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            await WebClient.get(`/api/v1/workspaces/auto-metrics/active-user-series?unit=${unit}&date=${date}`),
          ),
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
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            await WebClient.get(`/api/v1/workspaces/auto-metrics/retention-series?unit=${unit}&date=${date}`),
          ),
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
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            await WebClient.get(`/api/v1/workspaces/auto-metrics/stickiness-series?unit=${unit}&date=${date}`),
          ),
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
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            await WebClient.get(
              `/api/v1/analytics/charts?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}${chartType ? `&chartType=${chartType}` : ''}`,
            ),
          ),
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
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(await WebClient.get(`/api/v1/analytics/charts/${chartId}?chartType=${chartType}`)),
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
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            await WebClient.get(
              `/api/v1/remote-configs?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}&status=${status}`,
            ),
          ),
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

const transport = new StdioServerTransport();
await server.connect(transport);
