// Desc: OpenAI utilities
const OpenAI = require('openai');
const helper = require('./helper');
const config = require("./config");
const values = config.values;


const getClient = () => {
    return new OpenAI({
        apiKey: values.openAI.key
    });
};

const getModelsAsync = async () => {
    const openai = getClient();

    try {
        const response = await openai.models.list();
        return helper.sortByProperty(helper.filterProperties(response.data, ['id']), 'id');
    }
    catch (error) {
        throw new Error(error);
    }
};

const getCompletionsAsync = async (prompt, options = {}) => {
    let openai = getClient();

    try {
        let model = 'text-davinci-003';
        let completion = await openai.completions.create({
            prompt,
            model,
            ...options
        });

        return {
            request: {
                prompt,
                options,
            },
            response: {
                completion,
                type: values.openAI.type,                
                model, 
            }
        };
    }
    catch (error) {
        throw new Error(error);
    }
};

const getChatCompletionsAsync = async (messages, options = {}) => {
    let openai = getClient();

    try {
        // NOTE: 
        // This model will be replaced by "gpt-3.5-turbo-instruct" once it is available.
        // See: https://platform.openai.com/docs/deprecations/2023-07-06-gpt-and-embeddings 

        let model = 'gpt-3.5-turbo';
        let completion = await openai.chat.completions.create({
            messages,
            model,
            ...options
        });

        return  {
            request: {
                messages,
                options,
            },
            response: {
                completion,
                type: values.openAI.type,                
                model, 
            }
        };
    }
    catch (error) {
        throw new Error(error);
    }
};

const oaiUtilities = {
    getModelsAsync: getModelsAsync,
    getCompletionsAsync: getCompletionsAsync,
    getChatCompletionsAsync: getChatCompletionsAsync,
}

module.exports = oaiUtilities;