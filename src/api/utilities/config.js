// Path: /utilities/config.js
require('dotenv').config();

const errorGenerator = (item, key, value) => {
    let message = `${item} is not set correctly. Please check [${key}] in the .env file.`;
    if (value) {
        message += ` (E.g. ${key}="${value}"))`;
    }
    return message;
};

const config = {
    values: {
        app: {
            name: process.env.APP_NAME,
            description: process.env.APP_DESCRIPTION,
            repositoryOptional: process.env.APP_REPOSITORY_OPTIONAL,
            logoOptional: process.env.APP_LOGO_OPTIONAL,
            faviconOptional: process.env.APP_FAVICON_OPTIONAL,
        },
        speech: {
            key: process.env.SPEECH_KEY,
            region: process.env.SPEECH_REGION,
            endpointUrlOptional: process.env.SPEECH_ENDPOINT_URL_OPTIONAL // For custom endpoints. (optional)
        }
    },
    validators: {
        validate: () => {
            let errors = [];
            
            config.validators.validateApp().forEach(error => errors.push(error));
            config.validators.validateSpeech().forEach(error => errors.push(error));

            if (errors.length > 0) {
                throw new Error(`The following environment variables were not set: \n- ${errors.join("\n- ")}`);
            }
        },
        validateApp: () => {
            let errors = [];

            if (!config.values.app.name) {
                errors.push(errorGenerator('App name', 'APP_NAME', 'My App'));
            }

            if (!config.values.app.description) {
                errors.push(errorGenerator('App description', 'APP_DESCRIPTION', 'My App description'));
            }

            // If logoOptional is specified, it must be a valid url
            if (config.values.app.logoOptional && !config.values.app.logoOptional.match(/^(http|https):\/\/[^ "]+$/)) {
                errors.push(errorGenerator('App logo', 'APP_LOGO_OPTIONAL', 'https://example.com/logo.png'));
            }

            // If faviconOptional is specified, it must be a valid url and must end with .ico            
            if (config.values.app.faviconOptional && !config.values.app.faviconOptional.match(/^(http|https):\/\/[^ "]+$/)) {                
                errors.push(errorGenerator('App favicon', 'APP_FAVICON_OPTIONAL', 'https://example.com/favicon.ico'));
            }

            // If repositoryOptional is specified, it must be a valid url
            if (config.values.app.repositoryOptional && !config.values.app.repositoryOptional.match(/^(http|https):\/\/[^ "]+$/)) {
                errors.push(errorGenerator('App repository', 'APP_REPOSITORY_OPTIONAL', 'https://github.com/[USER]/[REPOSITORY]'));
            }

            return errors;
        },
        validateSpeech: () => {
            let errors = [];
    
            // Check if speech config values are set correctly
            if (!config.values.speech.key || config.values.speech.key.length !== 32) {
                errors.push(errorGenerator(`Speech key`, `SPEECH_KEY`));
            }
            if (!config.values.speech.region || config.values.speech.region.length === 0) {            
                errors.push(errorGenerator(`Speech region`, `SPEECH_REGION`));
            }
    
            // Speech endpoint URL is optional. 
            // If its set, check is a valid url in the following format:
            // https://southcentralus.api.cognitive.microsoft.com/sts/v1.0/issuetoken
            if (config.values.speech.endpointUrlOptional && config.values.speech.endpointUrlOptional.length > 0) {
                let url = config.values.speech.endpointUrlOptional;
                if (url.indexOf("https://") !== 0 || url.indexOf("sts/v1.0/issuetoken") === -1) {                
                    errors.push(errorGenerator(`Speech endpoint URL`, `SPEECH_ENDPOINT_URL_OPTIONAL`));
                }
            }
            return errors;
        }
    }    
};

module.exports = config;