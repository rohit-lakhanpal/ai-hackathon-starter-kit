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


const oaiUtilities={
    getModelsAsync: getModelsAsync,  
}

module.exports = oaiUtilities;