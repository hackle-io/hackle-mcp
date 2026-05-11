# Contributing

Thanks for your interest in `@hackle-io/hackle-mcp`. This document covers the
commit and release conventions that the project relies on for automation.

## Branching

- `main` is the release branch. Do not push to it directly.
- Create a feature branch off `main` for every change.

## Conventional Commits / PR titles

This repository uses [release-please](https://github.com/googleapis/release-please)
to manage versions and generate the [CHANGELOG](./CHANGELOG.md). The release
notes are built from the commit history on `main`, so the **squash-merge PR
title is what ends up in the changelog**.

PR titles **must** follow
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```text
<type>[optional scope]: <subject>
```

### Allowed types

| Type       | Bumps version | Section in CHANGELOG |
|------------|---------------|----------------------|
| `feat`     | minor         | Added                |
| `fix`      | patch         | Fixed                |
| `perf`     | patch         | Changed              |
| `refactor` | patch         | Changed              |
| `revert`   | patch         | Changed              |
| `docs`     | none          | (hidden)             |
| `test`     | none          | (hidden)             |
| `build`    | none          | (hidden)             |
| `ci`       | none          | (hidden)             |
| `chore`    | none          | (hidden)             |

### Breaking changes

To trigger a major version bump, mark the change as breaking:

- Append `!` after the type/scope: `feat!: drop Node 18 support`, or
- Add a `BREAKING CHANGE:` footer in the PR description body.

### Examples

```text
feat: add cohort-list tool
fix: handle 401 responses from analytics API
docs: clarify API key acquisition flow
feat(remote-config)!: change default user identifier criteria to $userId
```

A GitHub Action (`pr-title.yml`) validates the PR title on every pull request.

## Release flow

1. PR is opened, reviewed, and squash-merged into `main` with a Conventional
   Commits title.
2. The `release-please` workflow opens (or updates) a **Release PR** that
   bumps the version in `package.json`, updates `CHANGELOG.md`, and bumps
   `.release-please-manifest.json`.
3. Merging the Release PR triggers:
   - A git tag `vX.Y.Z` and a GitHub Release with the generated notes.
   - `npm publish` to the `@hackle-io/hackle-mcp` package (requires the
     `NPM_TOKEN` repository secret).

Manual version bump commits to `package.json` are no longer needed.

## Local development

```bash
npm install
npm run build
npm run format
```

## Required repository secrets

- `NPM_TOKEN`: automation token for publishing to npm. Required only for the
  publish step.
