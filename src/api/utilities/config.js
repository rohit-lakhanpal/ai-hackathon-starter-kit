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
            repositoryOptional: process.env.APP_REPOSITORY_OPTIONAL || `https://github.com/rohit-lakhanpal/ai-hackathon-starter-kit`,
            logoOptional: process.env.APP_LOGO_OPTIONAL,
            faviconOptional: process.env.APP_FAVICON_OPTIONAL,
        },
        language: {
            key: process.env.LANGUAGE_KEY,
            region: process.env.LANGUAGE_REGION,
            endpointUrl: process.env.LANGUAGE_ENDPOINT_URL
        },
        speech: {
            key: process.env.SPEECH_KEY,
            region: process.env.SPEECH_REGION,
            endpointUrlOptional: process.env.SPEECH_ENDPOINT_URL_OPTIONAL // For custom endpoints. (optional)
        },
        openAI:{
            type: process.env.OPENAI_TYPE, // Must be 'openai' or 'azure'
            key: process.env.OPENAI_KEY,
            azure: {
                key: process.env.OPENAI_AZURE_KEY,
                baseUrl: process.env.OPENAI_AZURE_BASE_URL, // [eg. https://[your-deployment-name].openai.azure.com/]
                apiVersionOptional: process.env.OPENAI_AZURE_API_VERSION_OPTIONAL, // [eg. 2022-12-01 or 2023-03-15-preview]
                models: {
                    text: process.env.OPENAI_AZURE_MODELS_TEXT, // [eg. deployment name for text-davinci-3]                   
                    chat: process.env.OPENAI_AZURE_MODELS_CHAT, // [eg. deployment name for GPT-3.5 or GPT-4]
                }
            }
        }
    },
    validators: {
        validate: () => {
            let errors = [];
            
            config.validators.validateApp().forEach(error => errors.push(error));
            config.validators.validateLanguage().forEach(error => errors.push(error));
            config.validators.validateOpenAI().forEach(error => errors.push(error));
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
            
            if (config.values.app.logoOptional && !config.values.app.logoOptional.match(/^(http|https):\/\/[^ "]+$/)) {
                errors.push(errorGenerator('App logo', 'APP_LOGO_OPTIONAL', 'https://example.com/logo.png'));
            }

            if (config.values.app.faviconOptional && !config.values.app.faviconOptional.match(/^(http|https):\/\/[^ "]+$/)) {                
                errors.push(errorGenerator('App favicon', 'APP_FAVICON_OPTIONAL', 'https://example.com/favicon.ico'));
            }

            if (config.values.app.repositoryOptional && !config.values.app.repositoryOptional.match(/^(http|https):\/\/[^ "]+$/)) {
                errors.push(errorGenerator('App repository', 'APP_REPOSITORY_OPTIONAL', 'https://github.com/[USER]/[REPOSITORY]'));
            }

            return errors;
        },
        validateLanguage: () => {
            let errors = [];
    
            if (!config.values.language.key || config.values.language.key.length !== 32) {            
                errors.push(errorGenerator(`Language key`, `LANGUAGE_KEY`));
            }
            if (!config.values.language.region || config.values.language.region.length === 0) {            
                errors.push(errorGenerator(`Language region`, `LANGUAGE_REGION`));
            }
            if (!config.values.language.endpointUrl || config.values.language.endpointUrl.length === 0) {            
                errors.push(errorGenerator(`Language endpoint URL`, `LANGUAGE_ENDPOINT_URL`));
            }
    
            return errors;
        },
        validateOpenAI: () => {
            let errors = [];

            if(config.values.openAI.type === 'openai'){                
                if (!config.values.openAI.key) {
                    errors.push(errorGenerator(`OpenAI key`, `OPENAI_KEY`));
                }
            } else if (config.values.openAI.type === 'azure'){                
                if (!config.values.openAI.azure.key) {
                    errors.push(errorGenerator(`OpenAI Azure key`, `OPENAI_AZURE_KEY`));
                }
                
                if (!config.values.openAI.azure.baseUrl || !config.values.openAI.azure.baseUrl.match(/^(http|https):\/\/[^ "]+$/)) {
                    errors.push(errorGenerator(`OpenAI Azure base url`, `OPENAI_AZURE_BASE_URL`, 'https://[your-deployment-name].openai.azure.com/'));
                }

                if(!config.values.openAI.azure.baseUrl.endsWith('openai.azure.com/')){
                    errors.push(errorGenerator(`OpenAI Azure base url`, `OPENAI_AZURE_BASE_URL`, 'https://[your-deployment-name].openai.azure.com/'));
                }
                
                if (!config.values.openAI.azure.apiVersionOptional) {
                    config.values.openAI.azure.apiVersionOptional = "2023-03-15-preview";
                } else {                    
                    if (config.values.openAI.azure.apiVersionOptional !== "2022-12-01"
                         && config.values.openAI.azure.apiVersionOptional !== "2023-03-15-preview") {
                        errors.push(errorGenerator(`OpenAI Azure api version`, `OPENAI_AZURE_API_VERSION`, '2022-12-01 or 2023-03-15-preview'));
                    }
                }

                if (!config.values.openAI.azure.models.text) {
                    errors.push(errorGenerator(`OpenAI Azure text model`, `OPENAI_AZURE_MODELS_TEXT`, 'deployment name for text-davinci-3'));
                }

                if (!config.values.openAI.azure.models.chat) {
                    errors.push(errorGenerator(`OpenAI Azure chat model`, `OPENAI_AZURE_MODELS_CHAT`, 'deployment name for GPT-3.5 or GPT-4'));
                }
            } else {
                errors.push(errorGenerator(`OpenAI type`, `OPENAI_TYPE`, 'openai or azure'));
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