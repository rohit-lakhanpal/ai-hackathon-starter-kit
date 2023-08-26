// Path: routes/oai/completions.js

var express = require('express');
var router = express.Router();
const oaiUtilities = require('../../utilities/oai');
const aoaiUtilities = require('../../utilities/aoai');
const config = require('../../utilities/config');

/* POST /api/oai/completions */
router.post('/', async (req, res) => {
    /** Expected Params:
    {
        "prompt": "Hello, how are you?",
        "options": {
            "max_tokens": 200,
            "temperature": 1,
            "top_p": 0.9,
            "n": 1,
            "stream": false,
            "logprobs": null
        }
    }
    */
    try {
        const prompt = req.body.prompt;        
        const options = req.body.options;


        // Throw an error if the prompt is not set
        if (!prompt) {
            res.status(400).send('The prompt was not set.');
        } else {
            res.json(config.values.openAI.type === 'azure'? 
                    await aoaiUtilities.getCompletionsAsync(prompt, options):
                    await oaiUtilities.getCompletionsAsync(prompt, options));
        }
    } catch (error) {
        console.log(error);
        let message = error.message || 'There was an error generating completion.'
        res.status(400).send(message);
    }
});

module.exports = router;
