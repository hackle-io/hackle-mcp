# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

From the next release onward, this file is maintained automatically by
[release-please](https://github.com/googleapis/release-please) based on
[Conventional Commits](https://www.conventionalcommits.org/). See
[CONTRIBUTING.md](./CONTRIBUTING.md) for the commit and PR title convention.

## [1.3.0] - 2025-05-12

### Added

- `remote-config-create` tool for creating an empty remote config.
- `remote-config-update` tool for updating a remote config's content,
  including the default value and conditional values with targeting rules.

## [1.2.0] - 2025-04-30

### Added

- Remote config tools: `remote-config-list`, `remote-config-detail`,
  `remote-config-update-user-identifier-criteria`,
  `remote-config-update-description`.

### Changed

- Use `qs` to format request URLs (consistent query string serialization for
  nested/array parameters).
- Fall back to `node-fetch` when global `fetch` is unavailable, so the server
  also runs on Node.js < 18 / restricted runtimes.

## [1.1.1] - 2025-04-29

### Fixed

- `analytics-chart-list`: missing `&` separator before the `chartType` query
  parameter caused the previous parameter to be concatenated with `chartType`.
- Declare `zod` as an explicit dependency in `package.json` (previously
  resolved transitively via `@modelcontextprotocol/sdk`).

## [1.1.0] - 2025-04-28

### Added

- Data analytics tools: `data-report-list`, `data-report-detail`,
  `analytics-chart-list`, `analytics-chart-detail`.
- Time-series tools: `active-user-series`, `retention-series`,
  `stickiness-series`.
- Descriptions on tool schemas to improve LLM tool selection accuracy.

### Changed

- Include the client timezone in request headers so date-based queries are
  evaluated in the caller's local time.

## [1.0.0] - 2025-04-24

Initial public release of `@hackle-io/hackle-mcp`. Versions `1.0.1` through
`1.0.3` were follow-up patch releases on the same week that hardened the
initial rollout; their changes are rolled into this entry.

### Added

- A/B test tools: `experiment-list`, `experiment-detail`.
- In-app message tools: `in-app-message-list`, `in-app-message-detail`.
- Push message tools: `push-message-list`, `push-message-detail`.

[1.3.0]: https://github.com/hackle-io/hackle-mcp/releases/tag/v1.3.0
[1.2.0]: https://github.com/hackle-io/hackle-mcp/releases/tag/v1.2.0
[1.1.1]: https://github.com/hackle-io/hackle-mcp/releases/tag/v1.1.1
[1.1.0]: https://github.com/hackle-io/hackle-mcp/releases/tag/v1.1.0
[1.0.0]: https://github.com/hackle-io/hackle-mcp/releases/tag/v1.0.0
