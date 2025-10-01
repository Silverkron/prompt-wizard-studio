
import { Message, OpenAIResponse, PromptConfig } from "@/types/openai";
import { getOpenAIToken } from "@/lib/storage";

const isGPT5Model = (model: string): boolean => {
  return model.startsWith('gpt-5');
};

export const sendPromptToOpenAI = async (config: PromptConfig): Promise<OpenAIResponse> => {
  const token = getOpenAIToken();
  
  if (!token) {
    throw new Error("OpenAI API token is required");
  }

  const isGPT5 = isGPT5Model(config.model);
  const endpoint = isGPT5 
    ? "https://api.openai.com/v1/responses"
    : "https://api.openai.com/v1/chat/completions";

  let requestBody: any;

  if (isGPT5) {
    // GPT-5 uses the new Responses API format
    const systemMessages = config.messages.filter(m => m.role === 'system');
    const userMessages = config.messages.filter(m => m.role === 'user' || m.role === 'assistant');
    
    const instructions = systemMessages.map(m => 
      typeof m.content === 'string' ? m.content : JSON.stringify(m.content)
    ).join('\n');

    requestBody = {
      model: config.model,
      instructions: instructions || undefined,
      input: userMessages,
      max_output_tokens: config.max_tokens,
      temperature: config.temperature,
    };
  } else {
    // Legacy models use the Chat Completions API
    requestBody = {
      model: config.model,
      messages: config.messages,
      max_tokens: config.max_tokens,
      temperature: config.temperature,
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.error?.message || `Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();

  if (isGPT5) {
    // Transform GPT-5 response to match the expected format
    return {
      id: data.id,
      object: data.object,
      created: data.created,
      model: data.model,
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: data.output_text || ''
        },
        finish_reason: data.status === 'completed' ? 'stop' : data.status
      }],
      usage: {
        prompt_tokens: data.usage?.input_tokens || 0,
        completion_tokens: data.usage?.output_tokens || 0,
        total_tokens: data.usage?.total_tokens || 0
      }
    };
  }

  return data;
};
