
import { Message, OpenAIResponse, PromptConfig } from "@/types/openai";
import { getOpenAIToken } from "@/lib/storage";

export const sendPromptToOpenAI = async (config: PromptConfig): Promise<OpenAIResponse> => {
  const token = getOpenAIToken();
  
  if (!token) {
    throw new Error("OpenAI API token is required");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      model: config.model,
      messages: config.messages,
      max_tokens: config.max_tokens,
      temperature: config.temperature,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.error?.message || `Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return response.json();
};
