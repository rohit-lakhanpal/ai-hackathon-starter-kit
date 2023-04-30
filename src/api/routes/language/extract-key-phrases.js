var express = require('express');
var router = express.Router();
const { extractKeyPhrases } = require('../../utilities/language');

/* POST /api/language/extract-key-phrases */
router.post('/', async (req, res) => {
    // Get the transcript from the request body if it exists
    try {
        const transcript = req.body.transcript;

        // Throw an error if the transcript is not set
        if (!transcript) {
            res.status(400).send('Transcript was not set.');
        } else {
            res.json(await extractKeyPhrases(transcript));
        }
    } catch (error) {
        console.log(error);
        let message = error.message || 'There was an error extracting key phrases.'
        res.status(400).send(message);
    }
});

module.exports = router;
