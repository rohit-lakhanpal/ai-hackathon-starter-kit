import axios from "axios";

export interface CompletionMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface CompletionRequestSettings
{
  model: string;  
  max_tokens: number;
  temperature: number;
  top_p: number;
  n: number;
  stop: string[];  
}

export interface TextCompletionRequestSettings extends CompletionRequestSettings {
  stream: boolean;
  logprobs: number;
  prompt: string;
}

export interface ChatCompletionRequestSettings extends CompletionRequestSettings {
  frequency_penalty: number;
  presence_penalty: number;  
  messages: CompletionMessage[];
}

export interface CompletionResponse {
  data: {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
      text: string;
      index: number;
      finish_reason: string;
      logprobs: null | unknown;
    }[];
    usage: {
      completion_tokens: number;
      prompt_tokens: number;
      total_tokens: number;
    };
  };
  settings: TextCompletionRequestSettings;
  type: string;
  error: {
    code: number;
    message: string;
  }
}

export interface ChatCompletionResponse {
  data: {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
      index: number;
      finish_reason: string;
      message: {
        role: string;
        content: string;
      };
    }[];
    usage: {
      completion_tokens: number;
      prompt_tokens: number;
      total_tokens: number;
    };
  };
  settings: ChatCompletionRequestSettings;
  type: string;
  error: {
    code: number;
    message: string;
  }
}

export interface OpenAIConfigType {
  type: string;
  settings: {
    text: TextCompletionRequestSettings,
    chat: ChatCompletionRequestSettings
  }
}

export const oaiService = {
  getInfoAsync: async () => {
    const response = await axios.get("/api/openai/models");
    return response.data as OpenAIConfigType;
  },
  getCompletionAsync: async (prompt: string, options: TextCompletionRequestSettings | null) => {
    // Check if the call returns errors. If so, throw an error using the status code and error message.
    try {
      const response = await axios.post("/api/openai/completions", {
        prompt: prompt,
        options
      });
      return response.data as CompletionResponse;
    }
    catch (error: any) {
      if (error.response) {
        throw new Error(`${error.response?.status} - ${error.response?.data}`);
      }
      
      throw new Error(error.message);
    }
  },
  getChatCompletionAsync: async (
    messages: CompletionMessage[],
    options: ChatCompletionRequestSettings | null
  ) => {
    try {
      const response = await axios.post("/api/openai/chat/completions", {
        messages: messages,
        options
      });
      return response.data as ChatCompletionResponse;
    }
    catch (error: any) {
      if (error.response) {
        throw new Error(`${error.response?.status} - ${error.response?.data}`);
      }
      
      throw new Error(error.message);
    }
    
  },
};
