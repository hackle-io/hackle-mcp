# Hackle MCP Server

[![smithery badge](https://smithery.ai/badge/@hackle-io/hackle-mcp)](https://smithery.ai/server/@hackle-io/hackle-mcp)

A Model Context Protocol server for Hackle API providing tools and resources for querying A/B Test data.

## Features

### Tools

- list_experiments: List experiments(A/B Test) from your workspace

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
      "args": ["-y", "@hackle-io/hackle-mcp"],
      "env": "YOUR_API_KEY"
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
