// Path: /routes/oai/models.js
var express = require('express');
var router = express.Router();
const oaiUtilities = require('../../utilities/oai');
const aoaiUtilities = require('../../utilities/aoai');
const config = require('../../utilities/config');

/* GET /api/oai/models */
router.get('/', async (req, res, next) => {
    try {  
        let models = 
            config.values.openAI.type === 'azure'?
                await aoaiUtilities.getModelsAsync():
                await oaiUtilities.getModelsAsync();
        res.json(await models);
    } catch (error) {
        res.status(400).send('There was an error fetching models.');
        console.log(error);
    }
});

module.exports = router;