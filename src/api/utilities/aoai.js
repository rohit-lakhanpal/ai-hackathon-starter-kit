// Desc: Azure OpenAI utilities
const OpenAIClient = require("@azure/openai").OpenAIClient;
const AzureKeyCredential = require("@azure/openai").AzureKeyCredential;
const axios = require("axios");
const helper = require("./helper");
const config = require("./config");
const values = config.values;

const getClient = () => {
    return new OpenAIClient(
        values.openAI.azure.baseUrl,
        new AzureKeyCredential(values.openAI.azure.key)
    );
};

const getModelsAsync = async () => {
    try {
        let response = await axios({
            method: "get",
            maxBodyLength: Infinity,
            url: `${values.openAI.azure.baseUrl}/openai/models?api-version=${values.openAI.azure.apiVersionOptional}`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "api-key": `${values.openAI.azure.key}`,
            },
        });
        return helper.filterProperties(response.data.data, ["id"]);
    } catch (error) {
        throw new Error(error);
    }
};

const validateModelAsync = async () => {
    try {
        let models = await getModelsAsync();

        return {
            completionsModel: {
                id: values.openAI.azure.models.text,
                isValid: models.some(
                    (obj) => obj.id === values.openAI.azure.models.text
                ),
            },
            chatCompletionsModel: {
                id: values.openAI.azure.models.chat,
                isValid: models.some(
                    (obj) => obj.id === values.openAI.azure.models.chat
                ),
            },
        };
    } catch (error) {
        throw new Error(error);
    }
};

const getCompletionsAsync = async (prompt, options = {}) => {
    let client = getClient();

    try {
        let completion = await client.getCompletions(
            values.openAI.azure.models.text,
            prompt, { ...options }
        );
        return {
            request: {
                prompt,
                options,
            },
            response: {
                completion,
                type: values.openAI.type,                
                model: values.openAI.azure.models.text, 
            }
        };
    } catch (error) {
        throw new Error(error);
    }
};

const getChatCompletionsAsync = async (messages, options = {}) => {
    let client = getClient();

    try {
        let completion = await client.getChatCompletions(
            values.openAI.azure.models.chat,
            messages, { ...options }
        );
        return {
            request: {
                messages,
                options,
            },
            response: {
                completion,
                type: values.openAI.type,                
                model: values.openAI.azure.models.chat, 
            }
        };
    } catch (error) {
        throw new Error(error);
    }
};

const aoaiUtilities = {
    getModelsAsync: getModelsAsync,
    validateModelAsync: validateModelAsync,
    getCompletionsAsync: getCompletionsAsync,
    getChatCompletionsAsync: getChatCompletionsAsync,
};

module.exports = aoaiUtilities;
