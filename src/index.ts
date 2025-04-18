#!/usr/bin/env node

import { MCPServer } from "mcp-framework";
import packageJson from '../package.json' with { type: 'json' };

const server = new MCPServer({
  name: packageJson.name,
  version: packageJson.version,
  basePath: "./dist",
});

server.start();

process.on('SIGINT', async () => {
    await server.stop();
});