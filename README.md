# Hackle MCP Server

[![smithery badge](https://smithery.ai/badge/@hackle-io/hackle-mcp)](https://smithery.ai/server/@hackle-io/hackle-mcp)

A Model Context Protocol server for Hackle API providing tools and resources for querying A/B Test data.

<a href="https://glama.ai/mcp/servers/@hackle-io/hackle-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@hackle-io/hackle-mcp/badge" alt="hackle-mcp MCP server" />
</a>

## Features

### Tools

- experiment-list: Fetches a paginated list of all A/B Test experiments from your Hackle workspace with optional search filtering
- experiment-detail: Retrieves detailed information and results for a specific experiment (A/B Test)
- active-user-series: Retrieves active user count data over time
- retention-series: Retrieves user retention data aggregated by time units (day, week, month)
- stickiness-series: Retrieves user stickiness metrics (frequency of return visits) by time units
- in-app-message-list: Fetches a paginated list of in-app-messages with optional search filtering
- in-app-message-detail: Retrieves detailed information and results for a specific in-app-message
- push-message-list: Fetches a paginated list of all push messages with optional search filtering
- push-message-detail: Retrieves detailed information and results for a specific push message

## Installation

### Option 1: Installing via Smithery

To install hackle-mcp for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@hackle-io/hackle-mcp):

```bash
npx -y @smithery/cli install @hackle-io/hackle-mcp --client claude
```

### Option 2: Add to claude_desktop_config by hand

Add this entry to your claude_desktop_config.json:

- On Mac: ~/Library/Application Support/Claude/claude_desktop_config.json
- On Windows: %APPDATA%\Claude\claude_desktop_config.json
- On Linux: ~/.config/Claude/claude_desktop_config.json

```json
{
  "mcpServers": {
    "hackle-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@hackle-io/hackle-mcp",
        "--config",
        "{\"apiKey\":\"YOUR_API_KEY\"}"
      ]
    }
  }
}
```

Restart Claude if running

## Getting Your API Key

To use the Hackle MCP Server, you will need an API key. To obtain your API key:

1. Contact the Hackle team directly through [Hackle Slack Community](https://hackle-community.slack.com/join/shared_invite/zt-h6yubvyo-pb0oyy3Dna2D9dvNFZGACQ#/)
2. Request an API key for MCP Server access
3. The Hackle team will provide you with a unique API key

**Important**: Never share your API key or commit it to public repositories. Treat your API key as a sensitive credential.
