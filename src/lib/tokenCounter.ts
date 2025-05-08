
import { encoding_for_model } from 'tiktoken';
import { Message } from '@/types/openai';

// Import the actual TiktokenModel type from the package
import type { TiktokenModel as TiktokenPackageModel } from 'tiktoken';

// Define proper model types as a union of string literals matching what the package accepts
type TiktokenModel = 
  | 'gpt-4o-mini'
  | 'gpt-4o'
  | 'gpt-4.5-preview'
  | 'gpt-4'
  | 'gpt-3.5-turbo'
  | 'text-embedding-ada-002'
  | 'text-davinci-003'
  | 'text-davinci-002'
  | 'davinci'
  | 'curie'
  | 'babbage'
  | 'ada'
  | 'cl100k_base';

// Function to count tokens in a string for a specific model
export const countTokens = (text: string, model = 'gpt-3.5-turbo'): number => {
  try {
    // Use the model as a parameter directly without type casting
    const encoder = encoding_for_model(model as unknown as TiktokenPackageModel);
    const tokens = encoder.encode(text);
    encoder.free();
    return tokens.length;
  } catch (error) {
    console.error('Error counting tokens:', error);
    
    // If model-specific encoding fails, try with cl100k_base which works for most models
    try {
      const encoder = encoding_for_model('cl100k_base' as unknown as TiktokenPackageModel);
      const tokens = encoder.encode(text);
      encoder.free();
      return tokens.length;
    } catch (fallbackError) {
      console.error('Fallback encoding failed:', fallbackError);
      // Rough estimation: ~4 chars per token
      return Math.ceil(text.length / 4);
    }
  }
};

// Function to estimate tokens for a message
export const estimateMessageTokens = (message: Message, model: string): number => {
  if (!message.content) return 0;
  
  // Convert content to string if it's an array or object
  let contentStr = '';
  if (typeof message.content === 'string') {
    contentStr = message.content;
  } else if (Array.isArray(message.content)) {
    contentStr = message.content
      .map(item => typeof item === 'string' ? item : JSON.stringify(item))
      .join(' ');
  } else {
    contentStr = JSON.stringify(message.content);
  }
  
  // Count tokens in the message content
  const contentTokens = countTokens(contentStr, model);
  
  // Add 4 tokens for message formatting (role, content markers)
  return contentTokens + 4;
};

// Function to estimate the total tokens in a conversation
export const estimateTokensForConversation = (messages: Message[], model: string): {
  promptTokens: number;
  estimatedResponseTokens: number;
  totalTokens: number;
} => {
  // Calculate tokens for each message
  const tokensPerMessage = messages.map(msg => estimateMessageTokens(msg, model));
  
  // Sum all message tokens
  const promptTokens = tokensPerMessage.reduce((sum, tokens) => sum + tokens, 0);
  
  // Add 3 tokens for the overall conversation formatting
  const conversationOverhead = 3;
  
  // Estimate response tokens (this is a rough estimate)
  // Using about 1/3 of the prompt tokens as a conservative estimate
  const estimatedResponseTokens = Math.ceil(promptTokens / 3);
  
  return {
    promptTokens: promptTokens + conversationOverhead,
    estimatedResponseTokens,
    totalTokens: promptTokens + conversationOverhead + estimatedResponseTokens
  };
};
