const config = require("./config");
const {
  AzureKeyCredential,
  TextAnalysisClient,
} = require("@azure/ai-language-text");

const client = new TextAnalysisClient(
  config.values.language.endpointUrl,
  new AzureKeyCredential(config.values.language.key)
);

const options = {
  includeStatistics: true,
  modelVersion: "latest",
};

const languageUtilities = {
  extractKeyPhrases: async (transcript) => {
    // Get the key phrases from the transcript
    const documents = [transcript];
    const actions = [
      {
        kind: "KeyPhraseExtraction",
      },
    ];
    const poller = await client.beginAnalyzeBatch(actions, documents, "en");
    const results = await poller.pollUntilDone();
    
    // Transform results to match original format
    const keyPhrases = [];
    for await (const actionResult of results) {
      if (actionResult.kind === "KeyPhraseExtraction") {
        for (const doc of actionResult.results) {
          keyPhrases.push({
            id: doc.id,
            keyPhrases: doc.keyPhrases,
            statistics: doc.statistics,
            error: doc.error,
          });
        }
      }
    }
    return keyPhrases;
  },
  recogniseEntities: async (transcript) => {
    // Get the entities from the transcript
    const documents = [transcript];
    const actions = [
      {
        kind: "EntityRecognition",
      },
    ];
    const poller = await client.beginAnalyzeBatch(actions, documents, "en");
    const results = await poller.pollUntilDone();

    // Transform results to match original format
    const entities = [];
    for await (const actionResult of results) {
      if (actionResult.kind === "EntityRecognition") {
        for (const doc of actionResult.results) {
          entities.push({
            id: doc.id,
            entities: doc.entities,
            statistics: doc.statistics,
            error: doc.error,
          });
        }
      }
    }
    return entities;
  },
  recogniseLinkedEntities: async (transcript) => {
    // Get the linked entities from the transcript
    const documents = [transcript];
    const actions = [
      {
        kind: "EntityLinking",
      },
    ];
    const poller = await client.beginAnalyzeBatch(actions, documents, "en");
    const results = await poller.pollUntilDone();

    // Transform results to match original format
    const entities = [];
    for await (const actionResult of results) {
      if (actionResult.kind === "EntityLinking") {
        for (const doc of actionResult.results) {
          entities.push({
            id: doc.id,
            entities: doc.entities,
            statistics: doc.statistics,
            error: doc.error,
          });
        }
      }
    }
    return entities;
  },
  analyseSentiment: async (transcript) => {
    // Get the sentiment from the transcript
    const documents = [transcript];
    const actions = [
      {
        kind: "SentimentAnalysis",
        includeOpinionMining: true,
      },
    ];
    const poller = await client.beginAnalyzeBatch(actions, documents, "en");
    const results = await poller.pollUntilDone();

    // Transform results to match original format
    const sentiment = [];
    for await (const actionResult of results) {
      if (actionResult.kind === "SentimentAnalysis") {
        for (const doc of actionResult.results) {
          sentiment.push({
            id: doc.id,
            sentiment: doc.sentiment,
            confidenceScores: doc.confidenceScores,
            sentences: doc.sentences,
            statistics: doc.statistics,
            error: doc.error,
          });
        }
      }
    }
    return sentiment;
  },
  recognisePii: async (transcript) => {
    // Get the PII from the transcript
    const documents = [transcript];
    const actions = [
      {
        kind: "PiiEntityRecognition",
        domainFilter: "none",
      },
    ];
    const poller = await client.beginAnalyzeBatch(actions, documents, "en");
    const results = await poller.pollUntilDone();

    // Transform results to match original format
    const pii = [];
    for await (const actionResult of results) {
      if (actionResult.kind === "PiiEntityRecognition") {
        for (const doc of actionResult.results) {
          pii.push({
            id: doc.id,
            entities: doc.entities,
            redactedText: doc.redactedText,
            statistics: doc.statistics,
            error: doc.error,
          });
        }
      }
    }
    return pii;
  },
  detectLanguage: async (transcript) => {
    const documents = [transcript];
    const actions = [
      {
        kind: "LanguageDetection",
      },
    ];
    const poller = await client.beginAnalyzeBatch(actions, documents);
    const results = await poller.pollUntilDone();

    // Transform results to match original format
    const language = [];
    for await (const actionResult of results) {
      if (actionResult.kind === "LanguageDetection") {
        for (const doc of actionResult.results) {
          language.push({
            id: doc.id,
            primaryLanguage: doc.primaryLanguage,
            statistics: doc.statistics,
            error: doc.error,
          });
        }
      }
    }
    return language;
  },
  recogniseHealthcareEntities: async (transcript) => {
    // Learn more at https://learn.microsoft.com/en-us/azure/ai-services/language-service/text-analytics-for-health/overview
    const documents = [transcript];
    const actions = [
      {
        kind: "Healthcare",
      },
    ];
    const poller = await client.beginAnalyzeBatch(actions, documents, "en");
    const results = await poller.pollUntilDone();
    
    let recognised = {
      summary: [],
      entities: [],
      entityRelations: [],
    };

    // Process healthcare entities results
    for await (const actionResult of results) {
      if (actionResult.kind === "Healthcare") {
        for (const result of actionResult.results) {
          recognised.summary.push(`- Document ${result.id}`);
          if (!result.error) {
            recognised.summary.push("\tRecognized Entities:");
            recognised.entities.push(result.entities);
            for (const entity of result.entities) {
              recognised.summary.push(
                `\t- Entity "${entity.text}" of type ${entity.category}`
              );
              if (entity.dataSources && entity.dataSources.length > 0) {
                recognised.summary.push(
                  "\t and it can be referenced in the following data sources:"
                );
                for (const ds of entity.dataSources) {
                  recognised.summary.push(
                    `\t\t- ${ds.name} with Entity ID: ${ds.entityId}`
                  );
                }
              }
            }
            if (result.entityRelations && result.entityRelations.length > 0) {
              recognised.summary.push(`\tRecognized relations between entities:`);
              recognised.entityRelations.push(result.entityRelations);
              for (const relation of result.entityRelations) {
                recognised.summary.push(
                  `\t\t- Relation of type ${relation.relationType} found between the following entities:`
                );
                for (const role of relation.roles) {
                  recognised.summary.push(
                    `\t\t\t- "${role.entity.text}" with the role ${role.name}`
                  );
                }
              }
            }
          } else console.error("\tError:", result.error);
        }
      }
    }

    return recognised;
  },
};

module.exports = languageUtilities;
