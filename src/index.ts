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
    pageNumber: z.number().default(1),
    pageSize: z.number().default(100),
    searchKeyword: z.string().optional(),
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
    pageNumber: z.number().default(1),
    pageSize: z.number().default(100),
    searchKeyword: z.string().optional(),
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
    pageNumber: z.number().default(1),
    pageSize: z.number().default(100),
    searchKeyword: z.string().optional(),
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
    date: z.string().optional(),
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
    date: z.string().optional(),
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
    date: z.string().optional(),
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

const transport = new StdioServerTransport();
await server.connect(transport);
