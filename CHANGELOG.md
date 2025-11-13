# Change log

All notable changes to this kit will be documented in this file.

- Uses [semantic versioning](http://semver.org/) to declare changes.

Continue reading to see the changes included in the latest version.

## Unreleased
- Major dependency updates (November 2025)
  - **Breaking Changes:**
    - Updated `@azure/ai-text-analytics` to `@azure/ai-language-text` (1.1.0) - migrated to new Azure AI Language SDK
    - Updated `@azure/openai` from beta (1.0.0-beta.5) to GA (2.0.0) with new API patterns
    - Updated Azure OpenAI API version to `2024-10-21` (latest GA release)
    - Removed standalone `openai` package dependency (now included via langchain)
    - Updated `microsoft-cognitiveservices-speech-sdk` to 1.47.0
    - Updated MUI components to v6 (@mui/material@6.3.0, @mui/icons-material@6.3.0)
    - Updated `web-vitals` to 4.2.4 with API changes
    - Updated `universal-cookie` to 7.2.2
  - **Other Updates:**
    - Updated langchain to 0.3.x
    - Updated axios to 1.7.9
    - Updated express to 4.21.2
    - Updated dotenv to 16.4.7
    - Replaced rimraf with native Node.js fs.rm
    - Updated React to 18.3.1
    - Updated react-router-dom to 6.28.0
    - Modernized OpenAI client usage across all utilities
  - **Documentation:**
    - Updated .env-sample files with new API versions
    - Updated README with Node.js 20 LTS requirement
    - Added support for newer model deployments (gpt-4o, gpt-4, etc.)
- Readme updates
- Engineering changes to include Contributing and version changes

## v0.1.0
- Initial preview release