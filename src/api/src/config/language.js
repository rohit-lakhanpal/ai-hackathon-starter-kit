const config = require("./config");
const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient(
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
    const keyPhrases = await client.extractKeyPhrases(
      [transcript],
      "en",
      options
    );
    // Return the key phrases
    return keyPhrases;
  },
  recogniseEntities: async (transcript) => {
    // Get the entities from the transcript
    const entities = await client.recognizeEntities(
      [transcript],
      "en",
      options
    );

    // Return the entities
    return entities;
  },
  recogniseLinkedEntities: async (transcript) => {
    // Get the entities from the transcript
    const entities = await client.recognizeLinkedEntities(
      [transcript],
      "en",
      options
    );

    // Return the entities
    return entities;
  },
  analyseSentiment: async (transcript) => {
    // Get the sentiment from the transcript
    const sentiment = await client.analyzeSentiment(
      [transcript],
      "en",
      options
    );

    // Return the sentiment
    return sentiment;
  },
  recognisePii: async (transcript) => {
    // Get the PII from the transcript
    const pii = await client.recognizePiiEntities([transcript], "en", options);

    // Return the PII
    return pii;
  },
  detectLanguage: async (transcript) => {
    const language = await client.detectLanguage([transcript], "en", options);

    // Return the language
    return language;
  },
  recogniseHealthcareEntities: async (transcript) => {
    // Learn more at https://learn.microsoft.com/en-au/azure/cognitive-services/language-service/text-analytics-for-health/overview
    const poller = await client.beginAnalyzeHealthcareEntities(
      [transcript],
      "en",
      options
    );
    const results = await poller.pollUntilDone();
    let recognised = {
      summary: [],
      entities: [],
      entityRelations: [],
    };

    // TODO: Cleanup this code
    for await (const result of results) {
      recognised.summary.push(`- Document ${result.id}`);
      if (!result.error) {
        recognised.summary.push("\tRecognized Entities:");
        recognised.entities.push(result.entities);
        for (const entity of result.entities) {
          recognised.summary.push(
            `\t- Entity "${entity.text}" of type ${entity.category}`
          );
          if (entity.dataSources.length > 0) {
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
        if (result.entityRelations.length > 0) {
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

    return recognised;
  },
};

module.exports = languageUtilities;
