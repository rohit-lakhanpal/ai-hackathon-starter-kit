var express = require('express');
var router = express.Router();
const axios = require('axios');
const config = require('../../utilities/config');

/* GET /api/speech/token */
router.get('/', async (req, res, next) => {
  // Call the speech service to get a token
  var url = `https://${config.values.speech.region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;
  
  // Override the url with the endpoint url if it is set (to support custom endpoints)
  if (config.values.speech.endpointUrlOptional) {
    url = config.values.speech.endpointUrlOptional;
  }

  try {
    const response = await axios.post(url, null, {
      headers: {
        'Ocp-Apim-Subscription-Key': config.values.speech.key,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    res.json({token: response.data, region: config.values.speech.region, endpointUrl: url});
  } catch (error) {
    res.status(401).send('There was an error authorizing your speech key.');
  }
});

module.exports = router;
