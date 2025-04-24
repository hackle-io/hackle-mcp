# Hackle MCP Server

[![smithery badge](https://smithery.ai/badge/@hackle-io/hackle-mcp)](https://smithery.ai/server/@hackle-io/hackle-mcp)

A Model Context Protocol server for Hackle API providing tools and resources for querying A/B Test data.

<a href="https://glama.ai/mcp/servers/@hackle-io/hackle-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@hackle-io/hackle-mcp/badge" alt="hackle-mcp MCP server" />
</a>

## Features

### Tools

#### Experiment List Tool

- **Name**: `experiment-list`
- **Description**: Fetches a paginated list of A/B test experiments with search functionality.
- **Parameters**:
  - `pageNumber`: Page number (default: 1)
  - `pageSize`: Number of items per page (default: 100)
  - `searchKeyword`: Search keyword (optional)

#### Experiment Detail Tool

- **Name**: `experiment-detail`
- **Description**: Retrieves detailed information for a specific A/B test experiment.
- **Parameters**:
  - `experimentId`: Experiment ID

#### In-App Message List Tool

- **Name**: `in-app-message-list`
- **Description**: Fetches a paginated list of in-app messages with search functionality.
- **Parameters**:
  - `pageNumber`: Page number (default: 1)
  - `pageSize`: Number of items per page (default: 100)
  - `searchKeyword`: Search keyword (optional)

#### In-App Message Detail Tool

- **Name**: `in-app-message-detail`
- **Description**: Retrieves detailed information for a specific in-app message.
- **Parameters**:
  - `inAppMessageId`: In-app message ID

#### Push Message List Tool

- **Name**: `push-message-list`
- **Description**: Fetches a paginated list of push messages with search functionality.
- **Parameters**:
  - `pageNumber`: Page number (default: 1)
  - `pageSize`: Number of items per page (default: 100)
  - `searchKeyword`: Search keyword (optional)

#### Push Message Detail Tool

- **Name**: `push-message-detail`
- **Description**: Retrieves detailed information for a specific push message.
- **Parameters**:
  - `pushMessageId`: Push message ID

#### Active User Series Tool

- **Name**: `active-user-series`
- **Description**: Retrieves time-series data of active users. Available in daily, weekly, and monthly units.
- **Parameters**:
  - `unit`: Time unit (DAY, WEEK, MONTH) (default: DAY)
  - `date`: Date (optional)

#### Retention Series Tool

- **Name**: `retention-series`
- **Description**: Retrieves time-series data of user retention. Available in daily, weekly, and monthly units.
- **Parameters**:
  - `unit`: Time unit (DAY, WEEK, MONTH) (default: DAY)
  - `date`: Date (optional)

#### Stickiness Series Tool

- **Name**: `stickiness-series`
- **Description**: Retrieves time-series data of user stickiness (return visit frequency). Available in weekly and monthly units.
- **Parameters**:
  - `unit`: Time unit (WEEK, MONTH) (default: WEEK)
  - `date`: Date (optional)

## Installation

Add this entry to your claude_desktop_config.json:

- On Mac: ~/Library/Application Support/Claude/claude_desktop_config.json
- On Windows: %APPDATA%\Claude\claude_desktop_config.json
- On Linux: ~/.config/Claude/claude_desktop_config.json

```json
{
  "mcpServers": {
    "hackle-mcp": {
      "command": "npx",
      "args": ["-y", "@hackle-io/hackle-mcp@latest"],
      "env": {
        "API_KEY": "YOUR_API_KEY"
      }
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

## License

MIT
