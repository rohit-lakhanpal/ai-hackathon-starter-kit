import axios from "axios";

export interface ModelResponse {
    id: string;
}

export interface StatusResponse {
    status: string;
    openAI: OpenAIStatus;
}

export interface OpenAIStatus {
    type: "openai" | "azure";
    availableModels: ModelResponse[];
    azure: OpenAIAzureStatus;
}

export interface OpenAIAzureStatus {
    baseUrl: string;
    models: {
        text: string;
        chat: string;
    },
    validateModels: {
        completionsModel: {
            id: string;
            isValid: boolean;
        },
        chatCompletionsModel: {
            id: string;
            isValid: boolean;
        }
    }
}

export interface CompletionResponse {
    request: {
        prompt: string;
        options: any;
    };
    response: {
        type: "openai" | "azure";
        model: string;
        completion: {
            id: string;
            choices: [{
                text: string;
                index: number;
                finish_reason: string;
            }];
        }
    }
}

export interface ChatCompletionResponse {
    request: {
        messages: CompletionMessage[];
        options: any;
    };
    response: {
        type: "openai" | "azure";
        model: string;
        completion: {
            id: string;
            choices: [{
                message: CompletionMessage;
                index: number;
                finish_reason: string;
            }];
        }
    }
}

export interface CompletionMessage {
    role: "system" | "user" | "assistant";
    content: string;
}


export interface TextCompletionRequestSettings {
    max_tokens: number;
    temperature: number;
    top_p: number;
    n: number;
}

export interface ChatCompletionRequestSettings {
    max_tokens: number;
    temperature: number;
    top_p: number;
    n: number;
}



export const openAIService = {
    getStatusAsync: async () => {
        const response = await axios.get("/api/status");
        return response.data as StatusResponse;
    },
    getModelsAsync: async () => {
        const response = await axios.get("/api/oai/models");
        return response.data as ModelResponse[];
    },
    getCompletionsAsync: async (prompt: string, options: TextCompletionRequestSettings) => {
        const response = await axios.post("/api/oai/completions", {
            prompt,
            options
        });
        return response.data as CompletionResponse;
    },
    getChatCompletionsAsync: async (messages: CompletionMessage[], options: ChatCompletionRequestSettings) => {
        const response = await axios.post("/api/oai/chat/completions", {
            messages,
            options
        });
        return response.data as ChatCompletionResponse;
    }
}