# Migration Guide: Updating to Latest Dependencies (November 2025)

This guide will help you migrate your existing AI Hackathon Starter Kit installation to the latest versions of Azure AI SDKs and other dependencies.

## Overview of Changes

The starter kit has been updated from dependencies circa 2023 to the latest versions available in November 2025. This includes major updates to Azure AI services SDKs, React components, and Node.js packages.

## Breaking Changes

### 1. Azure AI Language SDK Migration

**Old:** `@azure/ai-text-analytics` (v5.1.0)  
**New:** `@azure/ai-language-text` (v1.1.0)

The Text Analytics SDK has been replaced by the newer Azure AI Language SDK. The API has changed significantly:

#### Before:
```javascript
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));
const sentiment = await client.analyzeSentiment([text], "en");
```

#### After:
```javascript
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");

const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(key));
const actions = [{ kind: "SentimentAnalysis", includeOpinionMining: true }];
const poller = await client.beginAnalyzeBatch(actions, [text], "en");
const results = await poller.pollUntilDone();
```

**Migration Steps:**
1. Replace `@azure/ai-text-analytics` with `@azure/ai-language-text` in package.json
2. Update imports from `TextAnalyticsClient` to `TextAnalysisClient`
3. Convert method calls to use the batch analysis pattern with pollers
4. All methods now return results wrapped in action result objects

### 2. Azure OpenAI SDK Update

**Old:** `@azure/openai` (v1.0.0-beta.5)  
**New:** `@azure/openai` (v2.0.0)

The Azure OpenAI SDK has moved from beta to GA with significant API changes:

#### Before:
```javascript
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));
const completion = await client.getChatCompletions(deploymentName, messages);
```

#### After:
```javascript
const { AzureOpenAI } = require("@azure/openai");

const client = new AzureOpenAI({
    endpoint: endpoint,
    apiKey: key,
    apiVersion: "2024-10-21"
});
const completion = await client.chat.completions.create({
    model: deploymentName,
    messages: messages
});
```

**Migration Steps:**
1. Update to `@azure/openai` v2.0.0
2. Change from `OpenAIClient` to `AzureOpenAI` class
3. Pass configuration as object to constructor (endpoint, apiKey, apiVersion)
4. Use the new method structure: `client.chat.completions.create()` instead of `client.getChatCompletions()`
5. Update API version to `2024-10-21` in your .env file

### 3. Environment Variable Updates

**Required Changes to `.env` file:**

```env
# Old
OPENAI_AZURE_API_VERSION_OPTIONAL="2023-05-15"
OPENAI_AZURE_MODELS_TEXT="YOUR_MODEL_DEPLOYMENT_NAME_FOR_text-davinci-003"
OPENAI_AZURE_MODELS_CHAT="YOUR_MODEL_DEPLOYMENT_NAME_FOR_gpt-35-turbo_or_GPT-4"

# New
OPENAI_AZURE_API_VERSION_OPTIONAL="2024-10-21"
OPENAI_AZURE_MODELS_TEXT="YOUR_MODEL_DEPLOYMENT_NAME_FOR_text-davinci-003_or_gpt-35-turbo-instruct"
OPENAI_AZURE_MODELS_CHAT="YOUR_MODEL_DEPLOYMENT_NAME_FOR_gpt-35-turbo_gpt-4_gpt-4o_or_GPT-4"
```

### 4. Speech SDK Update

**Old:** `microsoft-cognitiveservices-speech-sdk` (v1.27.0)  
**New:** `microsoft-cognitiveservices-speech-sdk` (v1.47.0)

The Speech SDK has been updated to the latest version. The API remains largely compatible, but includes new features:
- Improved real-time transcription performance
- Additional voice styles and options
- Better error handling and logging

No breaking changes in the API surface used by this starter kit.

### 5. UI Component Updates

#### Material-UI (MUI)
**Old:** `@mui/material` v5.12.2  
**New:** `@mui/material` v6.3.0

Material-UI v6 includes some breaking changes. Most notably:
- Updated theming API
- Some prop name changes
- Enhanced TypeScript support

The current implementation should work without changes, but review the [MUI v6 migration guide](https://mui.com/material-ui/migration/migration-v5/) for advanced usage.

#### web-vitals
**Old:** `web-vitals` v2.1.4  
**New:** `web-vitals` v4.2.4

The web-vitals API has changed:

#### Before:
```typescript
import { ReportHandler } from 'web-vitals';
import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
  getCLS(onPerfEntry);
});
```

#### After:
```typescript
import { Metric } from 'web-vitals';
import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
  onCLS(onPerfEntry);
});
```

#### universal-cookie
**Old:** `universal-cookie` v4.0.4  
**New:** `universal-cookie` v7.2.2

The API remains compatible, but the package includes improved TypeScript definitions and security updates.

### 6. OpenAI Client Consolidation

**Removed:** Standalone `openai` package dependency  
**Now Included:** Via `langchain` dependency

The standalone OpenAI package is no longer a direct dependency. If you need direct OpenAI API access, it's available through langchain's dependencies. The utilities have been updated to use the modern OpenAI client pattern.

## Non-Breaking Updates

### Node.js and Express
- **Recommended:** Node.js 20.x LTS (up from 18.15)
- **Express:** Updated to 4.21.2 (Express 5 not yet adopted)
- **Langchain:** Updated to 0.3.x with improved TypeScript support

### Other Dependencies
- `axios`: 1.7.9 (security and feature updates)
- `dotenv`: 16.4.7
- `react`: 18.3.1
- `react-router-dom`: 6.28.0
- Removed `rimraf` in favor of native Node.js `fs.rm`

## Migration Steps

### For Existing Installations:

1. **Backup your current `.env` file**
   ```bash
   cp src/api/.env src/api/.env.backup
   ```

2. **Update your repository**
   ```bash
   git pull origin main
   ```

3. **Update API dependencies**
   ```bash
   cd src/api
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Update UI dependencies**
   ```bash
   cd ../ui
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **Update your `.env` file**
   - Compare with `.env-sample` for new variables
   - Update `OPENAI_AZURE_API_VERSION_OPTIONAL` to `2024-10-21`
   - Review model deployment names

6. **Test your installation**
   ```bash
   # Test API
   cd src/api
   npm start
   # Visit http://localhost:8730/api/status
   
   # Test UI (in another terminal)
   cd src/ui
   npm start
   # Visit http://localhost:8700
   ```

### For Fresh Installations:

Follow the standard installation steps in the [README.md](../README.md). All new installations will use the latest dependencies automatically.

## Troubleshooting

### Issue: API version errors with Azure OpenAI
**Solution:** Ensure your Azure OpenAI resource supports the `2024-10-21` API version. If not, you can use an earlier version by setting `OPENAI_AZURE_API_VERSION_OPTIONAL` to a supported version (e.g., `2024-06-01`).

### Issue: Language analysis methods return different result structure
**Solution:** The new SDK uses a batch analysis pattern. Results are wrapped in action result objects. Review the updated `src/api/utilities/language.js` for examples.

### Issue: Build errors with TypeScript
**Solution:** Ensure you're using TypeScript 4.9.5 (compatible with react-scripts 5.0.1). Run `npm list typescript` to verify.

### Issue: Material-UI styling issues
**Solution:** MUI v6 has updated theming. If you've customized themes, review the [MUI v6 migration guide](https://mui.com/material-ui/migration/migration-v5/).

## New Features Available

With the updated SDKs, you now have access to:

1. **Azure OpenAI:**
   - Latest API version (2024-10-21)
   - Support for newer models (GPT-4o, GPT-4 Turbo, etc.)
   - Improved streaming capabilities
   - Function calling improvements

2. **Azure AI Language:**
   - Enhanced sentiment analysis with opinion mining
   - Better healthcare entity recognition
   - Improved PII detection
   - More granular language detection

3. **Speech SDK:**
   - Improved real-time transcription accuracy
   - Additional voice options and styles
   - Better latency and performance

## Support

If you encounter issues during migration:
1. Check the [troubleshooting section](#troubleshooting) above
2. Review the [CHANGELOG.md](../CHANGELOG.md) for detailed changes
3. Open an issue on [GitHub](https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit/issues)

## References

- [Azure AI Language Text SDK](https://learn.microsoft.com/en-us/javascript/api/overview/azure/ai-language-text-readme)
- [Azure OpenAI SDK for JavaScript](https://learn.microsoft.com/en-us/javascript/api/overview/azure/openai-readme)
- [Azure OpenAI API Versions](https://learn.microsoft.com/en-us/azure/ai-services/openai/api-version-deprecation)
- [Speech SDK Release Notes](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/releasenotes)
