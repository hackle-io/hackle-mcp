import { MCPServer } from "mcp-framework";

const server = new MCPServer();

// Check for API key
if (!process.env.API_KEY) {
  console.error("Error: API_KEY environment variable is required");
  process.exit(1);
}

server.start();
