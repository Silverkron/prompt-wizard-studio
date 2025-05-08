import { HistoryItem, Message, PromptConfig } from "@/types/openai";

const STORAGE_KEYS = {
  OPENAI_TOKEN: "openai-token",
  MODEL: "openai-model",
  MAX_TOKENS: "openai-max-tokens",
  TEMPERATURE: "openai-temperature",
  HISTORY: "openai-history",
  CURRENT_MESSAGES: "openai-current-messages"
};

export const saveOpenAIToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.OPENAI_TOKEN, token);
};

export const getOpenAIToken = (): string => {
  return localStorage.getItem(STORAGE_KEYS.OPENAI_TOKEN) || "";
};

export const saveModel = (model: string): void => {
  localStorage.setItem(STORAGE_KEYS.MODEL, model);
};

export const getModel = (): string => {
  return localStorage.getItem(STORAGE_KEYS.MODEL) || "gpt-4o-mini";
};

export const saveMaxTokens = (maxTokens: number): void => {
  localStorage.setItem(STORAGE_KEYS.MAX_TOKENS, maxTokens.toString());
};

export const getMaxTokens = (): number => {
  return parseInt(localStorage.getItem(STORAGE_KEYS.MAX_TOKENS) || "800", 10);
};

export const saveTemperature = (temperature: number): void => {
  localStorage.setItem(STORAGE_KEYS.TEMPERATURE, temperature.toString());
};

export const getTemperature = (): number => {
  return parseFloat(localStorage.getItem(STORAGE_KEYS.TEMPERATURE) || "0.7");
};

// Updated to limit to 5 items
export const savePromptHistory = (history: HistoryItem[]): void => {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
};

export const getPromptHistory = (): HistoryItem[] => {
  const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
  return history ? JSON.parse(history) : [];
};

// Updated to keep only the 5 most recent items
export const addToHistory = (item: HistoryItem): void => {
  const history = getPromptHistory();
  history.unshift(item);
  savePromptHistory(history.slice(0, 5)); // Keep only the 5 most recent items
};

export const clearHistory = (): void => {
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
};

// New functions for session storage
export const saveCurrentMessages = (messages: Message[]): void => {
  sessionStorage.setItem(STORAGE_KEYS.CURRENT_MESSAGES, JSON.stringify(messages));
};

export const getCurrentMessages = (): Message[] => {
  const messages = sessionStorage.getItem(STORAGE_KEYS.CURRENT_MESSAGES);
  return messages ? JSON.parse(messages) : [{ role: "user", content: "" }];
};
