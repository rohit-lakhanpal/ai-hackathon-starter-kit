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
        let completion = await openai.completions.create({
            prompt,
            model: 'text-davinci-003',
            ...options
        });

        return completion;
    }
    catch (error) {
        throw new Error(error);
    }
};

const getChatCompletionsAsync = async (messages, options = {}) => {
    let openai = getClient();

    try {
        let completion = await openai.chat.completions.create({
            messages,
            model: 'gpt-3.5-turbo',
            ...options
        });

        return completion;
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