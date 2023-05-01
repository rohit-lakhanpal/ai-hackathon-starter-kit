var express = require('express');
var router = express.Router();
const { getChatCompletions } = require('../../../utilities/openai');

/* POST /api/openai/chat/completions */
router.post('/', async (req, res) => {
    /** Expected Params:
    {
        "messages": [{"role": "user", "content": "Hello!", "name": "John Smith"}]
        "options": {
            "max_tokens": 200,
            "temperature": 1,
            "top_p": 0.9,
            "n": 1,
            "stream": false,
            "presence_penalty": 0,
            "frequency_penalty": 0,
            "logprobs": null
        }
    }
    */
    try {

        const messages = req.body.messages;        
        const options = req.body.options;


        // Throw an error if the prompt is not set
        if (!messages) {
            res.status(400).send('Messages were not set.');
        } else {
            // Check if the messages are in the correct format
            if (!Array.isArray(messages)) {
                res.status(400).send('Messages were not in the correct format.');

            // Check if at least one message is present with role and content
            } else if (!messages.some(m => m.role && m.content)) {
                res.status(400).send('Messages were not in the correct format.');
            } else{
                res.json(await getChatCompletions(messages, options));
            }
        }
    } catch (error) {
        console.log(error);
        let message = error.message || 'There was an error generating completion.'
        res.status(400).send(message);
    }
});

module.exports = router;
