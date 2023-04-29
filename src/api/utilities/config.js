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
        }
    },
    validators: {
        validate: () => {
            let errors = [];
            
            config.validators.validateApp().forEach(error => errors.push(error));

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
    }    
};

module.exports = config;