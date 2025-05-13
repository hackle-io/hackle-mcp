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

#### Data Report List Tool

- **Name**: `data-report-list`
- **Description**: Retrieves all data report metadata.

#### Data Report Detail Tool

- **Name**: `data-report-detail`
- **Description**: Retrieves single data report's detail. It will provide analytics chart id and type inside data report. It is recommended to use Analytics Chart Detail Tool to get further information of each chart.
- **Parameters**:
  - `dataReportId`: Data report's id. This can be found in response of Data Report List Tool.

#### Analytics Chart List Tool

- **Name**: `analytics-chart-list`
- **Description**: Retrieves data analytics chart's metadata list.
- **Parameters**:
  - `pageNumber`: Page number (default: 1) (optional)
  - `pageSize`: Number of items per page (default: 100) (optional)
  - `searchKeyword`: Search keyword (optional) (optional)
  - `chartType`: Chart types that Hackle provides: FUNNEL, DATA_INSIGHT, RETENTION, and USER_PATH. (optional)

#### Analytics Chart Detail Tool

- **Name**: `analytics-chart-detail`
- **Description**: Retrieves data analytics chart's detail. You can visualize the chart using this tool's result.
- **Parameters**:
  - `chartId`: Analytics chart's id. It can be found in the response of Data Report Detail Tool or Analytics Chart List Tool.
  - `chartType`: Analytics chart's type(FUNNEL, DATA_INSIGHT, RETENTION, USER_PATH). It can be found in the response of Data Report Detail Tool or Analytics Chart List Tool.

#### Remote Config List Tool

- **Name**: `remote-config-list`
- **Description**: Retrieves remote config list.
- **Parameters**:
  - `pageNumber`: Page number (default: 1)
  - `pageSize`: Number of items per page (default: 100)
  - `searchKeyword`: Search keyword (optional)
  - `status`: Status of remote config: ACTIVE, ARCHIVED (default: 'ACTIVE')

#### Remote Config Detail Tool

- **Name**: `remote-config-detail`
- **Description**: Retrieves remote config's detail.
- **Parameters**:
  - `remoteConfigId`: Remote config's id. You can get this information by using Remote Config List Tool.

#### Remote Config Creation Tool

- **Name**: `remote-config-create`
- **Description**: Creates an empty remote config. It is recommended to update an existing RC first if there is an associated RC with the one you want to create since the total number of RC is limited.
- **Parameters**:
  - `body`: Request body.
    - `key`: Remote config's name.
    - `description`: Remote config's description.
    - `dataType`: Type of remote config's value: STRING, JSON, NUMBER, BOOLEAN.
    - `userIdentifierCriteria`: User identifier criteria for targeting. You can use criteria provided by Hackle($deviceId, $userId) or your own criteria created at Hackle dashboard website. (default: '$deviceId')

#### Remote Config Content Update Tool

- **Name**: `remote-config-update`
- **Description**: Updates remote config's content.
- **Parameters**:
  - `remoteConfigId`: Remote config's id.
  - `body`: Request body.
    - `dataType`: Type of remote config's value: STRING, JSON, NUMBER, BOOLEAN. The request will not be accepted if dataType and remote config values does not match.
    - `remoteConfigDefaultValue`: Default value of remote config. This value's type should match with dataType field.
    - `conditionalValues`: Array of conditional remote config's value with user group targeting.
      - `ruleName`: Name of targeting condition rule.
      - `remoteConfigValue`: Remote config's value. This value's type should match with dataType field.
      - `target`
        - `conditions`: Targeting rules. Users who The user he satisfies all conditions in this array will see this rule's remote config value.
          - `key`
            - `type`: Condition's type: HACKLE_PROPERTY, USER_PROPERTY, AB_TEST, FEATURE_FLAG, COHORT, SEGMENT.
            - `name`: Property's name if type is HACKLE_PROPERTY or USER_PROPERTY. Experiment key if type is AB_TEST. Feature flag key if type is FEATURE_FLAG. You can put any non-empty string if type is COHORT or SEGMENT.
          - `match`
            - `operator`: Operators that will be used to match key and values of the condition.
            - `valueType`: Type of targeting condition's value: NUMBER, STRING, BOOLEAN, VERSION.
            - `values`: Values of targeting condition's key. Followings are some special cases: The values will be treated as names if you are using SEGMENT. Only strings 'A' and 'B' are allowed if type is AB_TEST. Only boolean values are accepted if type is FEATURE_FLAG. You should put cohort's id if type is COHORT.

#### Remote Config User Identifier Criteria Update Tool

- **Name**: `remote-config-update-user-identifier-criteria`
- **Description**: Updates remote config's user identifier criteria. The change will be applied to both production and development environment.
- **Parameters**:
  - `remoteConfigId`: Remote config's id.
  - `body`: Request body.
    - `userIdentifierCriteria`: User identifier criteria for targeting. You can use criteria provided by Hackle($deviceId, $userId) or your own criteria created at Hackle dashboard website. (default: '$deviceId')

#### Remote Config Description Update Tool

- **Name**: `remote-config-update-description`
- **Description**: Updates remote config's description. The change will be applied to both production and development environment.
- **Parameters**:
  - `remoteConfigId`: Remote config's id.
  - `body`: Request body.
    - `description`: Remote config's description.

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
