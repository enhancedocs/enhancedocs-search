# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.0] - 2023-05-23

- 🆕 Get stream answer using `X-EnhanceDocs-Version 1.0`.
- 🆕 Improve sources UX/UI.
- 🆕 Export `SearchModal` as standalone component.
- 🛠 BREAKING: Simplify `config` prop. Migrate from `config={{ enhancedConfig: { projectId, accessToken } }}` to `config={{ projectId, accessToken }}`.

## [0.2.1] - 2023-05-08

- 🆕 Send answer feedback.

## [0.2.0] - 2023-05-01

- 🛠 Remove doc search config - `typesense` ([#13](https://github.com/enhancedocs/enhancedocs-search/issues/13)).
- 🐞 Search button `min-width` for mobile devices ([#12](https://github.com/enhancedocs/enhancedocs-search/issues/12)).

## [0.1.9] - 2023-04-22

- 🛠 Build output name `EnhancedocsSearch`.

## [0.1.8] - 2023-04-22

- 🆕 Render enhanced search component utility - `renderEnhancedSearch`.
- 🛠 Build output with named exports.

## [0.1.7] - 2023-04-20

- 🆕 Support param apiBaseURL

## [0.1.6] - 2023-04-15

- 🛠 Rename CSS variable from `--color` to `--enhancedocs` to avoid collision.
- 🐞 Search button `min-width`.

## [0.1.5] - 2023-04-10

- 🆕 Custom theme - Set up primary color.
- 🛠 ESLint config.

## [0.1.4] - 2023-04-07

- 🆕 Improved source url card information.
- 🐞 Browser compatibility styling.
- 🐞 Large source url overflow.

## [0.1.3] - 2023-04-06

- 🆕 Add and remove recent searches from local storage.
- 🛠 Unify export default and types exports.
- 🐞 Improve logo colors in dark mode.

## [0.1.2] - 2023-04-06

- 🐞 Modal height for mobile devices.
- 🐞 ESC key smaller font size.
- 🐞 Recent searches check for empty `answer`.

## [0.1.1] - 2023-04-06

- 🆕 CHANGELOG.
- 🛠 Improved search storybook examples.
- 🐞 Recent searches proper displaying when there are no results from any search.

## [0.1.0] - 2023-04-06

- 🆕 Split config into `enhancedSearch` and `docSearch`.
- 🆕 Extract types into declaration files.
- 🛠 Upgrade devDependencies.
- 🐞 Enhanced search storybook values `enhancedSearch.projectId` and `enhancedSearch.accessToken`.
