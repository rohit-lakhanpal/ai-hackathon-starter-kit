// Desc: Azure OpenAI utilities
const { AzureOpenAI } = require("@azure/openai");
const { AzureKeyCredential } = require("@azure/core-auth");
const axios = require("axios");
const helper = require("./helper");
const config = require("./config");
const values = config.values;

const getClient = () => {
    return new AzureOpenAI({
        endpoint: values.openAI.azure.baseUrl,
        apiKey: values.openAI.azure.key,
        apiVersion: values.openAI.azure.apiVersionOptional || "2024-10-21",
    });
};

const getModelsAsync = async () => {
    try {
        let response = await axios({
            method: "get",
            maxBodyLength: Infinity,
            url: `${values.openAI.azure.baseUrl}/openai/models?api-version=${values.openAI.azure.apiVersionOptional || "2024-10-21"}`,
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
        // Options need to be converted to camelCase for new SDK
        const apiOptions = {
            prompt: [prompt],
            maxTokens: options.maxTokens || options.max_tokens,
            temperature: options.temperature,
            topP: options.topP || options.top_p,
            n: options.n,
            frequencyPenalty: options.frequencyPenalty || options.frequency_penalty,
            presencePenalty: options.presencePenalty || options.presence_penalty,
            stop: options.stop,
            ...options
        };

        let completion = await client.completions.create({
            model: values.openAI.azure.models.text,
            ...apiOptions
        });
        
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
        // Options converted to camelCase for new SDK
        const apiOptions = {
            messages,
            maxTokens: options.maxTokens || options.max_tokens,
            temperature: options.temperature,
            topP: options.topP || options.top_p,
            n: options.n,
            frequencyPenalty: options.frequencyPenalty || options.frequency_penalty,
            presencePenalty: options.presencePenalty || options.presence_penalty,
            stop: options.stop,
            ...options
        };
        
        let completion = await client.chat.completions.create({
            model: values.openAI.azure.models.chat,
            ...apiOptions
        });
        
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
