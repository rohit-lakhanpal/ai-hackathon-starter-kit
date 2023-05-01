const config = require("./config");
const { Configuration, OpenAIApi } = require("openai");

const settings = {
  model: {
    text: {
      name: 'text-davinci-003',
      stop: '',
      stream: false,
      logprobs: null,
    },
    chat: {
      name: 'gpt-3.5-turbo-0301',
      stop: ['<|im_end|>'],
    }
  },
  params: {
    max_tokens: 2048,
    temperature: 0.5,
    top_p: 1,
    n: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ['\n', ' Human:', ' AI:', ''],
  },
};

const getOpenAi = (type) => {
    const oaiConfiguration = new Configuration({
        apiKey: config.values.openAI.key,
    });

    const aoaiConfiguration = new Configuration({
        apiKey: config.values.openAI.azure.key,
        basePath: `${config.values.openAI.azure.baseUrl}openai/deployments/${type && type === 'chat'? config.values.openAI.azure.models.chat: config.values.openAI.azure.models.text}`,
        baseOptions: {
            headers: { 'api-key': config.values.openAI.azure.key },
            params: {
            'api-version': config.values.openAI.azure.apiVersionOptional,
            },
        },
    });

    return config.values.openAI.type === 'azure'?
        new OpenAIApi(aoaiConfiguration):
        new OpenAIApi(oaiConfiguration);
}

const getBaseParams = (options) => {
    return {
        model: config.values.openAI.type === 'azure'? config.values.openAI.azure.models.text: settings.model.text.name,
        prompt: options?.prompt,
        messages: options?.messages,
        max_tokens: options?.max_tokens || settings.params.max_tokens,
        temperature: options?.temperature || settings.params.temperature,
        top_p: options?.top_p || settings.params.top_p,
        n: options?.n || settings.params.n,
        //stream: options?.stream || settings.model.text.stream,
        //logprobs: options?.logprobs || settings.model.text.logprobs,
    };
}

const getParamsByType = (type, options = {}) => {
    let params = getBaseParams(options);
    if (type === 'chat') {
        params.stop = settings.model.chat.stop;
        params.model = config.values.openAI.type === 'azure'? config.values.openAI.azure.models.chat: settings.model.chat.name;        
        params.frequency_penalty = options?.frequency_penalty || settings.params.frequency_penalty;
        params.presence_penalty = options?.presence_penalty || settings.params.presence_penalty;
    } else {        
        params.stream = settings.model.text.stream;
    }
    return params;
}

const getCompletions = async (prompt, options = {}) => {  
    let params = getParamsByType('text', {...options, prompt});
  
    try {
        const openai = getOpenAi();
        //const models = config.values.openAI.type !== 'azure'? await openai.listModels(): null;
        const response = await openai.createCompletion(params);

        return {
            data: response.data,
            settings: params,
            type: config.values.openAI.type,
            //models: models?.data?.data, // not needed. just for testing
        };
    } catch (error) {
        throw new Error(error);
    }
}

const getChatCompletions = async (messages, options = {}) => {
    let params = getParamsByType('chat', {...options, messages});
    try {
        const openai = getOpenAi('chat');
        
        const response = await openai.createChatCompletion(params);
    
        return {
          data: response.data,
          settings: params,
          type: config.values.openAI.type,
        };
      } catch (error) {
        throw new Error(error);
      }
}

// const getCompletionFromAzureOpenAI = async (prompt, options = {}) => {  
//   let params = getParamsByType('text', {...options, prompt});
//   try {
//     const openai = getOpenAi();
//     const response = await openai.createCompletion(params);

//     return {
//       data: response.data,
//       settings: params,
//       type: config.values.openAI.type,
//     };
//   } catch (error) {
//     throw new Error(error);
//   }
// };



const openaiUtilities = {
//   getCompletion: async (prompt, options = {}) => {
//     return config.values.openAI.type === 'azure'
//       ? getCompletionFromAzureOpenAI(prompt, options)
//       : getCompletionFromOpenAI(prompt, options);
//   },
//   getChatCompletion: async (messages, options = {}) => {
//     return config.values.openAI.type === 'azure'
//         ? getChatCompletionFromAzureOpenAI(messages, options)
//         : getChatCompletionFromOpenAI(messages, options);
//     },
    getCompletions,
    getChatCompletions,
    getInfo: async () => {
        return {
            type: config.values.openAI.type,
            settings: {
                text: getParamsByType('text'),
                chat: getParamsByType('chat')
            }
            
        }
    }
};

module.exports = openaiUtilities
