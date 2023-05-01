import axios from "axios";

export interface CompletionMessage {
  role: string;
  content: string;
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
  settings: {
    model: string;
    prompt: string;
    max_tokens: number;
    temperature: number;
    top_p: number;
    n: number;
    stream: boolean;
  };
  type: string;
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
  settings: {
    model: string;
    messages: {
      role: string;
      content: string;
    }[];
    max_tokens: number;
    temperature: number;
    top_p: number;
    n: number;
    stop: string[];
    frequency_penalty: number;
    presence_penalty: number;
  };
  type: string;
}

export const oaiService = {
  getInfoAsync: async () => {
    const response = await axios.get("/api/openai/models");
    return response.data;
  },
  getCompletionAsync: async (prompt: string) => {
    const response = await axios.post("/api/openai/completions", {
      prompt: prompt
    });
    return response.data as CompletionResponse;
  },
  getChatCompletionAsync: async (
    messages: CompletionMessage[],
    model: string
  ) => {
    const response = await axios.post("/api/openai/chat/completions", {
      message: messages
    });
    return response.data as ChatCompletionResponse;
  },
};
