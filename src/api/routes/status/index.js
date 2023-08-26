// Path: /routes/status/index.js
var express = require('express');
var router = express.Router();
const config = require('../../utilities/config');
const oaiUtilities = require('../../utilities/oai');
const aoaiUtilities = require('../../utilities/aoai');

/* GET /api/status */
router.get('/', async (req, res, next) => {
  let response = { status: '200OK' };
  try {
    // Set type
    response.openAI = {
      type: config.values.openAI.type,
    }

    // Add available models
    let models = config.values.openAI.type === 'azure' ?
      await aoaiUtilities.getModelsAsync() :
      await oaiUtilities.getModelsAsync();
    response.openAI.availableModels = models;

    // Add Azure configuration and validations
    if (config.values.openAI.type === 'azure') {
      response.openAI.azure = {
        baseUrl: config.values.openAI.azure.baseUrl,
        apiVersion: config.values.openAI.azure.apiVersion,
        models: {
          text: config.values.openAI.azure.models.text,
          chat: config.values.openAI.azure.models.chat
        },
        validateModels: await aoaiUtilities.validateModelAsync()
      }
    }

    res.json(response);
  } catch (error) {
    res.status(400).send('There was an error fetching status.');
    console.log(error);
  }
});

module.exports = router;
