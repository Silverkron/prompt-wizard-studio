
export type MessageRole = "system" | "user" | "assistant";

export interface MessageContent {
  text: string;
  type: "text";
}

export interface ImageMessageContent {
  type: "image_url";
  image_url: {
    url: string;
  };
}

export type Content = MessageContent | ImageMessageContent | string;

export interface Message {
  role: MessageRole;
  content: Content | Content[];
}

export interface PromptConfig {
  model: string;
  engine: string;
  messages: Message[];
  max_tokens: number;
  temperature: number;
  reasoning?: {
    effort: "low" | "medium" | "high" | "minimal";
  };
  verbosity?: "low" | "medium" | "high";
}

export interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: TokenUsage;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  promptConfig: PromptConfig;
  response?: OpenAIResponse;
  error?: string;
}
