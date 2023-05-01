var express = require('express');
var router = express.Router();
const { getCompletions } = require('../../utilities/openai');

/* POST /api/openai/completions */
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
            res.json(await getCompletions(prompt, options));
        }
    } catch (error) {
        console.log(error);
        let message = error.message || 'There was an error generating completion.'
        res.status(400).send(message);
    }
});

module.exports = router;
